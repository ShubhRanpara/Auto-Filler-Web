import os
from dotenv import load_dotenv
import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS  # facebook AI similarity search
from langchain.chains.question_answering import load_qa_chain
from langchain import HuggingFaceHub

from pptxtopdf import convert
import comtypes.client
import docx
import json

# Sidebar contents
with st.sidebar:
    st.title('🤗💬 Automatic form filling App powered by Huggingface Transformers')
    st.markdown('''
    ## About
    This app is an Automatic form filling app built using:  
    - [Streamlit](https://streamlit.io/)
    - [Hugging Face Transformers](https://huggingface.co/google/flan-t5-large) for question answering

    Made by Developers of team J.A.R.V.I.S.,
    - Shubh Ranpara,
    - Priyanshu Savla,
    - Ronak Siddhpura,
    - Prem Jobanputra,
    - Pranav Tank.
    ''')

def convert_pptx_to_pdf(base_path, file, file_name):

    input_dir = os.path.join(base_path, file_name)
    output_dir = os.path.join(base_path)

    print(base_path, file_name)

    convert(input_dir, output_dir)

    output_file_name = base_path + "\\" + file_name[:-4] + "pdf"

    file = open(output_file_name, 'rb')
    return file

def convert_docx_to_pdf(base_path, file, file_name):

    word_path = base_path + "\\" + file_name
    pdf_path = base_path + "\\" + file_name[:-4] + "pdf"

    # Load the Word document
    doc = docx.Document(word_path)

    # Create a Word application object
    word = comtypes.client.CreateObject("Word.Application")

    # Get absolute paths for Word document and PDF file
    docx_path = os.path.abspath(word_path)
    pdf_path = os.path.abspath(pdf_path)

    # PDF format code
    pdf_format = 17

    # Make Word application invisible
    word.Visible = False

    try:
        # Open the Word document
        in_file = word.Documents.Open(docx_path)

        # Save the document as PDF
        in_file.SaveAs(pdf_path, FileFormat=pdf_format)

        print("Conversion successful. PDF saved at:", pdf_path)

    except Exception as e:
        print("Error:", e)

    finally:
        # Close the Word document and quit Word application
        if 'in_file' in locals():
            in_file.Close()
        word.Quit()

def main():
    load_dotenv()

    st.header("Ask Your PDF, DOCX, PPTX")

    file = st.file_uploader("Upload your file")

    file_name = ""

    if file:
        print(file.name)
        file_name = str(file.name)

    pdf = file

    # the path of directory where our pdf or documents is kept.
    base_path = "Enter the path of directory where your pdf or other files are kept."

    if (file_name.__contains__(".pptx")):
        pdf = convert_pptx_to_pdf(base_path, file, file_name)

    elif (file_name.__contains__(".docx")):
        convert_docx_to_pdf(base_path, file, file_name)
        output_file_name = base_path + "\\" + file_name[:-4] + "pdf"
        pdf = open(output_file_name, 'rb')

    if pdf is not None:
        pdf_reader = PdfReader(pdf)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        print(text)

        # split ito chuncks
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1024,
            chunk_overlap=0,
            length_function=len
        )
        chunks = text_splitter.split_text(text)

        # create embedding
        embeddings = HuggingFaceEmbeddings()

        knowledge_base = FAISS.from_texts(chunks, embeddings)

        # user_question = st.text_input("Ask Question about your PDF:")

        responses = []
        issue = 0

        # Tried out different models

        # llm = HuggingFaceHub(repo_id="google/gemma-7b-it", model_kwargs={"temperature":0.1, "max_length":64})
        # llm = HuggingFaceHub(repo_id="google/gemma-2b-it", model_kwargs={"temperature":0.1, 'max_new_tokens':100})
        llm = HuggingFaceHub(repo_id="google/flan-t5-large", model_kwargs={"temperature": 5, "max_length": 64})  # best for now
        # llm = HuggingFaceHub(repo_id="google/flan-t5-large", model_kwargs={"temperature":6, "max_length":1024})
        # llm = HuggingFaceHub(repo_id="meta-llama/Llama-2-7b", model_kwargs={"temperature":0.1, "max_length":250})

        chain = load_qa_chain(llm, chain_type="stuff")

        # General
        # . Please give accurate and short answers.
        Questions = ['What is patient Name?', 'What is patient Age?', "What is patient's Date of Birth?", 'What is Gender of patient?', 'What is blood group of patient?', 'What is height of patient?',
                     'What is weight of patient?', 'What is Diagnosis of patient?', 'What is Follow-up Date?', 'What is Operation Date?', "What is patient's medical history?", 'What are additional comments?']

        # General
        Questions += ['What is hospital name?', 'What is Hospital address?',
                      'What is Doctor name?', 'What is Doctor Specialization?']

        for user_question in Questions:
            docs = knowledge_base.similarity_search(user_question)
            response = chain.run(input_documents=docs, question=user_question)
            responses.append(response)
            st.write(user_question, " : ", response)

        if ('Breast' or 'breast') in responses[7]:
            issue = 1
            st.write("The Patient has Breast Cancer.")

            # Breast Cancer
            Questions += ['Is there any family history of breast cancer?',
                          'Is there any history of cancer?']
            
            Questions += ['Breast lump discovered?']

            # Breast Cancer
            Questions += ["What is medicine 1 name?", "What is medicine 1 dosage?", "What is medicine 1 frequency?"]
            Questions += ['What is medicine 1 start date?',
                          'What is medicine 1 end date?']
            Questions += ["What is medicine 2 name?", "What is medicine 2 dosage?", "What is medicine 2 frequency?"]
            Questions += ['What is medicine 2 start date?',
                          'What is medicine 2 end date?']
            Questions += ["What is medicine 3 name?", "What is medicine 3 dosage?", "What is medicine 3 frequency?"]
            Questions += ['What is medicine 3 start date?',
                          'What is medicine 3 end date?']

            # Breast Cancer
            Questions += ['What is Blood Pressure?', 'What is Heart Rate?',
                          'What is Respiratory Rate?', 'What is temperature?', 'What is Oxygen Saturation?']
            Questions += ['What is Tumor Marker (CA 15-3)?', 'What is Estrogen Receptor (ER) Status?',
                          'What is Progesterone Receptor (PR) Status?', 'What is HER2 Status?']

        elif ('Lung' or 'lung') in responses[7]:
            issue = 2
            st.write("The Patient has Lung Cancer.")

            # Lung Cancer
            Questions += ['Is there any family history of lung cancer?',
                          'Is there any previous history of emphysema?']

            # Lung Cancer
            Questions += ["What is medicine 1 name?", "What is medicine 1 dosage?", "What is medicine 1 frequency?"]
            Questions += ['What is medicine 1 start date?',
                          'What is medicine 1 end date?']
            Questions += ["What is medicine 2 name?", "What is medicine 2 dosage?", "What is medicine 2 frequency?"]
            Questions += ['What is medicine 2 start date?',
                          'What is medicine 2 end date?']

            # Lung Cancer
            Questions += ['What is Blood Pressure?', 'What is Heart Rate?',
                          'What is Respiratory Rate?', 'What is temperature?', 'What is Oxygen Saturation?']
            Questions += ['What is Tumor Marker (CEA)?', 'What is EGFR Mutation?',
                          'What is ALK Reaarangement?', 'What is KRAS Mutation?']

        else:
            issue = 3
            st.write("The Patient has Orthopedic issue.")

            # Orthopedic / Fracture
            Questions += ['Is there any history of fractures?',
                          'Is there any family history?']

            Questions += ["What is medicine 1 name?", "What is medicine 1 dosage?", "What is medicine 1 frequency?"]
            Questions += ['What is medicine 1 start date?',
                          'What is medicine 1 end date?']
            Questions += ["What is medicine 2 name?", "What is medicine 2 dosage?", "What is medicine 2 frequency?"]
            Questions += ['What is medicine 2 start date?',
                          'What is medicine 2 end date?']

            # Orthopedic / Fracture
            Questions += ['What is Session Frequency of Physical Therapy Plan?',
                          'What is Start date of Physical Therapy Plan?', 'What is end date of Physical Therapy Plan?']
            Questions += ['What is Imaging technique?']
            Questions += ['What is Fracture Type?',
                          'What is Fracture Location?', 'What is Stability?']
            Questions += ['What is Mobility?',
                          'What is Activities of Daily Living (ADLs)?']

        for user_question in Questions[16:]:
            docs = knowledge_base.similarity_search(user_question)
            response = chain.run(input_documents=docs, question=user_question)

            st.write(user_question, " : ", response)
            responses.append(response)

        print(Questions)
        print(responses)

        response_dict = {}
        keys = []
        i = 0

        # Defining keys for every question

        if(issue==1):
            keys = ['name', 'age', 'dob', 'gender', 'BG', 'height', 'weight', 'issue', 'fp_date', 'op_date', 'medical_history', 'comments', 'hosp_name', 'hosp_add', 'doct_name', 'doct_sp', 'family_history', 'cancer_history', 'lump', 'med1_name', 'med1_dose', 'med1_freq', 'med1_sd', 'med1_ed', 'med2_name', 'med2_dose', 'med2_freq', 'med2_sd', 'med2_ed', 'med3_name', 'med3_dose', 'med3_freq', 'med3_sd', 'med3_ed', 'BP', 'HR', 'RR', 'temp', 'OS', 'TM', 'ER', 'PR', 'HER2']
        elif(issue==2):
            keys = ['name', 'age', 'dob', 'gender', 'BG', 'height', 'weight', 'issue', 'fp_date', 'op_date', 'medical_history', 'comments', 'hosp_name', 'hosp_add', 'doct_name', 'doct_sp', 'family_history', 'emphysema_history', 'med1_name', 'med1_dose', 'med1_freq', 'med1_sd', 'med1_ed', 'med2_name', 'med2_dose', 'med2_freq', 'med2_sd', 'med2_ed', 'BP', 'HR', 'RR', 'temp', 'OS', 'TM', 'EGFR', 'ALK', 'KRAS']
        else:
            keys = ['name', 'age', 'dob', 'gender', 'BG', 'height', 'weight', 'issue', 'fp_date', 'op_date', 'medical_history', 'comments', 'hosp_name', 'hosp_add', 'doct_name', 'doct_sp', 'fracture_history', 'family_history', 'med1_name', 'med1_dose', 'med1_freq', 'med1_sd', 'med1_ed', 'med2_name', 'med2_dose', 'med2_freq', 'med2_sd', 'med2_ed', 'pt_freq', 'pt_sd', 'pt_ed', 'IT', 'FT', 'FL', 'stability', 'mobility', 'ADLs']

        for response in responses:
            response_dict[keys[i]] = response
            i = i+1

        if(issue==1):
            with open("Breast_cancer_Response.json", "w") as outputfile:
                json.dump(response_dict, outputfile)        
        elif(issue==2):
            with open("Lung_cancer_Response.json", "w") as outputfile:
                json.dump(response_dict, outputfile)        
        else:
            with open("Orthopedic_Response.json", "w") as outputfile:
                json.dump(response_dict, outputfile)

if __name__ == '__main__':
    main()
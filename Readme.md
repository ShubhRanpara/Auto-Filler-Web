# Auto Filler Web

This is a Python project that helps you to read out important details of patients from PDF, PPTx or DOCx file that you have uploaded and it generates the output which helps to fill the form automatically. The project is built using Python, HTML, CSS, JS, and Streamlit framework.

## Follow the below instructions to run the application

### Installation

1. First of all we have to create virtual environment to isolate our project dependencies from the system dependencies.

```shell
pip install virtualenv
```
2. After installing virtualenv library we will create virtual environment named "env".

```shell
python3 -m venv env
    or
virtualenv env
```
3. Activate "env" using following command.

```shell
.\env\Scripts\Activate.ps1
```
4. Install important dependencies required for our project using this command.

```shell
pip install -r requirements.txt
```

5. Add your HUGGINGFACEHUB_API_TOKEN in `.env` file and check the file name must be `.env` otherwise rename the file to `.env`. Also don't forget to update the file paths where it is mentioned.

6. Once you have installed the required dependencies, you can run the project using Streamlit. Streamlit provides an easy way to create interactive web applications in Python.

To start the application, run the following command:

```shell
python -m streamlit run app.py
    or
streamlit run app.py
```

7. After opening the Streamlit web app, you can upload your PDF file and the LLM will generate the answers based on our predefined question set. These answers will be stored in a JSON file.

8. Then you have to open the related form's HTML file in vs code and press go live on server.

9. Then press the autofill button. This will automatically fill the form by fetching the answers from a JSON file by JavaScript. Please check out for missing values in the form and try to fill it manually.

10. This was our automatic form filling web app that can help any medical organizatioin to fill the details of the patient in the form. I hope you like the efforts that we have put into this project.

11. Here are some screenshots of the result.

![Streamlit Dashboard](https://github.com/ShubhRanpara/Auto-Filler-Web/blob/master/Screenshots/Screenshot_1-8-2024_122838_localhost.jpeg?raw=true)

![Model Responses](https://github.com/ShubhRanpara/Auto-Filler-Web/blob/master/Screenshots/Screenshot_1-8-2024_12303_localhost.jpeg?raw=true)

![Breast Cancer Unfilled](https://github.com/ShubhRanpara/Auto-Filler-Web/blob/master/Screenshots/Screenshot_1-8-2024_123030_127.0.0.1.jpeg?raw=true)

![Breast Cancer Filled](https://github.com/ShubhRanpara/Auto-Filler-Web/blob/master/Screenshots/Screenshot_1-8-2024_12313_127.0.0.1.jpeg?raw=true)

# Key errors faced while installation and running of the project :

## If any dependency is not working properly than update it with it's latest verson.

### If any permission related error occurs than use powershall terminal as administrator and run the command :

```shell
Set-ExecutionPolicy unrestricted
```

### If you get AXIOS 403 error, run streamlit app with this command
```shell
streamlit run app.py --server.enableXsrfProtection false
```
function Autofill(){
    document.getElementById("Autofill_Button").value = "Filled automatically..!!";

    fetch('Orthopedic_Response.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").value = data.name;
            document.getElementById("age").value = data.age;
            document.getElementById("dob").value = data.dob;

            if(data.gender=="Male"){
                document.getElementById("male").checked = true;
            }else if(data.gender=="Female"){
                document.getElementById("female").checked = true;
            }else{
                document.getElementById("other").checked = true;
            }

            if(data.BG=='A+'){
                document.getElementById("bloodGroup").value = 1;
            }else if(data.BG=='A-'){
                document.getElementById("bloodGroup").value = 2;
            }else if(data.BG=='B+'){
                document.getElementById("bloodGroup").value = 3;
            }else if(data.BG=='B-'){
                document.getElementById("bloodGroup").value = 4;
            }else if(data.BG=='O+'){
                document.getElementById("bloodGroup").value = 5;
            }else if(data.BG=='O-'){
                document.getElementById("bloodGroup").value = 6;
            }else if(data.BG=='AB+'){
                document.getElementById("bloodGroup").value = 7;
            }else if(data.BG=='AB-'){
                document.getElementById("bloodGroup").value = 8;
            }

            document.getElementById("height").value = data.height;
            document.getElementById("weight").value = data.weight;
            document.getElementById("diagnosis").value = data.issue;
            document.getElementById("followUpDate").value = data.fp_date;
            document.getElementById("operationDate").value = data.op_date;


            if(data.fracture_history.includes("No") || data.fracture_history.includes("no")){
                document.getElementById("previousFractures").checked = false;
            }else{
                document.getElementById("previousFractures").checked = true;
            }

            if(data.family_history.includes("No") || data.family_history.includes("no")){
                document.getElementById("familyHistory").checked = false;
            }else{
                document.getElementById("familyHistory").checked = true;
            }

            document.getElementById("otherMedicalHistory").value = data.medical_history;
            document.getElementById("additionalComments").value = data.comments;
            
            document.getElementById("hospitalName").value = data.hosp_name;
            document.getElementById("hospitalAddress").value = data.hosp_add;
            document.getElementById("doctorName").value = data.doct_name;
            document.getElementById("doctorSpecialization").value = data.doct_sp;
            
            document.getElementById("medicationName1").value = data.med1_name;
            document.getElementById("dosage1").value = data.med1_dose;
            document.getElementById("frequency1").value = data.med1_freq;
            document.getElementById("startDate1").value = data.med1_sd;
            document.getElementById("endDate1").value = data.med1_ed;
            document.getElementById("medicationName2").value = data.med2_name;
            document.getElementById("dosage2").value = data.med2_dose;
            document.getElementById("frequency2").value = data.med2_freq;
            document.getElementById("startDate2").value = data.med2_sd;
            document.getElementById("endDate2").value = data.med2_ed;

            document.getElementById("sessionFrequency").value = data.pt_freq;
            document.getElementById("therapyStartDate").value = data.pt_sd;
            document.getElementById("therapyEndDate").value = data.pt_ed;
            document.getElementById("xray").value = data.IT;
            document.getElementById("fractureType").value = data.FT;
            document.getElementById("fractureLocation").value = data.FL;
            document.getElementById("stability").value = data.stability;
            document.getElementById("mobility").value = data.mobility;
            document.getElementById("adls").value = data.ADLs;

        }).catch(error => console.error("Error fetching JSON data:", error));
}
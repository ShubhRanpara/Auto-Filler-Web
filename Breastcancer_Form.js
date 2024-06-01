function Autofill(){
    document.getElementById("Autofill_Button").value = "Filled automatically..!!";

    fetch('Breast_cancer_Response.json')
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

            if(data.lump.includes("No") || data.lump.includes("no")){
                document.getElementById("breastLump").checked = false;
            }else{
                document.getElementById("breastLump").checked = true;
            }

            if(data.cancer_history.includes("No") || data.cancer_history.includes("no")){
                document.getElementById("previousHistory").checked = false;
            }else{
                document.getElementById("previousHistory").checked = true;
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
            document.getElementById("medicationName3").value = data.med3_name;
            document.getElementById("dosage3").value = data.med3_dose;
            document.getElementById("frequency3").value = data.med3_freq;
            document.getElementById("startDate3").value = data.med3_sd;
            document.getElementById("endDate3").value = data.med3_ed;
            
            document.getElementById("bloodPressure").value = data.BP;
            document.getElementById("heartRate").value = data.HR;
            document.getElementById("respiratoryRate").value = data.RR;
            document.getElementById("temperature").value = data.temp;
            document.getElementById("oxygenSaturation").value = data.OS;
            document.getElementById("tumorMarker").value = data.TM;
            
            if(data.ER=="Positive" || data.ER=="positive"){
                document.getElementById("epositive").checked = true;
            }else{
                document.getElementById("enegative").checked = true;
            }

            if(data.PR=="Positive" || data.PR=="positive"){
                document.getElementById("ppositive").checked = true;
            }else{
                document.getElementById("pnegative").checked = true;
            }

            if(data.HER2=="Positive" || data.HER2=="positive"){
                document.getElementById("hpositive").checked = true;
            }else{
                document.getElementById("hnegative").checked = true;
            }
        }).catch(error => console.error("Error fetching JSON data:", error));
}
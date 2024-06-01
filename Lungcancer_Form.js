function Autofill(){
    document.getElementById("Autofill_Button").value = "Filled automatically..!!";

    fetch('Lung_cancer_Response.json')
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

            if(data.medical_history.includes("No") || data.medical_history.includes("no")){
                document.getElementById("chronicsmoking").checked = false;
            }else{
                document.getElementById("chronicsmoking").checked = true;
            }

            if(data.emphysema_history.includes("No") || data.emphysema_history.includes("no")){
                document.getElementById("emphysemaHistory").checked = false;
            }else{
                document.getElementById("emphysemaHistory").checked = true;
            }

            if(data.family_history.includes("No") || data.family_history.includes("no")){
                document.getElementById("familyHistory").checked = false;
            }else{
                document.getElementById("familyHistory").checked = true;
            }

            // document.getElementById("otherMedicalHistory").value = data.medical_history;
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
            
            document.getElementById("bloodPressure").value = data.BP;
            document.getElementById("heartRate").value = data.HR;
            document.getElementById("respiratoryRate").value = data.RR;
            document.getElementById("temperature").value = data.temp;
            document.getElementById("oxygenSaturation").value = data.OS;
            document.getElementById("tumorMarker").value = data.TM;
            
            if(data.EGFR=="Positive" || data.EGFR=="positive"){
                document.getElementById("egpositive").checked = true;
            }else{
                document.getElementById("egnegative").checked = true;
            }

            if(data.ALK=="Positive" || data.ALK=="positive"){
                document.getElementById("apositive").checked = true;
            }else{
                document.getElementById("anegative").checked = true;
            }

            if(data.KRAS=="Positive" || data.KRAS=="positive"){
                document.getElementById("kpositive").checked = true;
            }else{
                document.getElementById("knegative").checked = true;
            }
        }).catch(error => console.error("Error fetching JSON data:", error));
}

console.log('I am connected to');

const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

const medicinesection=document.getElementById('medicine-section');
let doctorList=document.getElementById("doctor-list");
let medicineHTML="",medicine,frequency,dosage;
fetch("/prescriptionlist")
.then(res=>res.json())
.then(data=>{
    console.log(data);
    for(let i=0; i<data.length; i++) {
        medicine=data[i].medicine;
        frequency=data[i].frequency;
        dosage=data[i].dosage;
        medicineHTML=medicineHTML+`
        
        <div class='desc-div'>
        <div class="flex-dir-col background" id="doctor"> 
            <p><b>Student Name : ${data[i].studentname}</b></p> 
            <p><b>Student ID : ${data[i].studentid}</b></p>
            <p class="margin-zero"><b>Prescribed by : ${data[i].doctorname}</b></p>
            <hr>
            `
        for(let i=0; i<medicine.length; i++){
            medicineHTML=medicineHTML+`
                        <p>${medicine[i]}</p>
                        <p>${frequency[i]} (${dosage[i]} days)</p>
                        <hr>        
                
                `
        }
        medicineHTML=medicineHTML+`
        <button style="margin-top:.5rem" class="button-1" onclick="">Mark as given</button>
        </div>
        </div>
        `;
        doctorList.innerHTML=medicineHTML;
    }
          
})
let medicineHTML1="";
let applist=document.getElementById("app-list");
fetch('/medicinelist')
.then(res=>res.json())
.then(data1=>{
    console.log(data1);
    data1.forEach(element1 => {
        medicineHTML1=medicineHTML1+`
            <div class="background desc-div">
                <p><b>${element1.medicinename} ${element1.medicinestrength}</b></p>
                <p>${element1.dosage}</p>
                <p>Quantity : ${element1.quantity} pcs</p>
            </div>
        `;
        applist.innerHTML=medicineHTML1;
    });
})
function addsection(){
    location.href=`../medicineMenu/medicineMenu.html?email=${emailValue}`
}
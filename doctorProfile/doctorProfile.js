const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

const doctorName=document.getElementById('doctorName');
const desi = document.getElementById('designation');
const fullName=document.getElementById('full-name');
const email=document.getElementById('email');
const dob=document.getElementById('dob');
const overview=document.getElementById('overview');
const editProfile=document.getElementById('edit-profile');
const myProfile=document.getElementById('my-profile');

overview.style.cursor="pointer";
editProfile.style.cursor="pointer";
myProfile.style.cursor="pointer";

fetch(`/doctorlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    doctorName.innerText=data[0].name;
    desi.innerText=data[0].degree;
    fullName.innerText=data[0].name;
    email.innerText=data[0].email;
    dob.innerText=data[0].dob;
})
overview.addEventListener("click",()=>{
    location.href=`../doctorDashboard/doctorDashboard.html?email=${emailValue}`
})

editProfile.addEventListener("click",()=>{
    location.href=`../editDoctorProfile/editDoctorProfile.html?email=${emailValue}`;
});

myProfile.addEventListener("click",()=>{
    location.href=`../doctorProfile/doctorProfile.html?email=${emailValue}`;
});
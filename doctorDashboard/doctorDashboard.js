console.log("i am connected");
const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

const doctorName=document.getElementById('doctor-name');
const desi = document.getElementById('designation');
const myProfile=document.getElementById('my-profile');
const editProfile=document.getElementById('edit-profile');

fetch(`http://localhost:6204/doctorlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    doctorName.innerText=data[0].name;
    desi.innerText=data[0].degree;
})

myProfile.addEventListener("click", function(){
    location.href=`../doctorProfile/doctorProfile.html?email=${emailValue}`;
})

editProfile.addEventListener("click", function(){
    location.href=`../editDoctorProfile/editDoctorProfile.html?email=${emailValue}`;
})
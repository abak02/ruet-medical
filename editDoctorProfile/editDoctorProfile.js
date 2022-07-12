
console.log("i am connected");
const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);


const fullName=document.getElementById('full-name');
const designation = document.getElementById('designation');
const dob = document.getElementById('dob');
const contactNo= document.getElementById('contact-no');
const email = document.getElementById('email');
const password = document.getElementById('password');
const presentAddress = document.getElementById('presentaddress');
const permanentAddress = document.getElementById('permanentaddress');


fetch(`http://localhost:6204/doctorlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    fullName.value=data[0].name;
    designation.value=data[0].degree;
    dob.value=data[0].dob;
    contactNo.value=data[0].contact;
    email.value=data[0].email;
    password.value=data[0].password;
    presentAddress.value=data[0].presentaddress;
    permanentAddress.value=data[0].permanentaddress;
})
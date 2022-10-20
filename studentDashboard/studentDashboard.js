const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);


const name=document.getElementById('name');
const id=document.getElementById('id');
const session=document.getElementById('session');
const dept= document.getElementById('dept');

const e_mail=document.getElementById('e-mail');
const fullname=document.getElementById('full-name');
const dob= document.getElementById('dob');
const bg=   document.getElementById('bg');

const myprofile=document.getElementById('myprofile');
const editProfile=document.getElementById('editProfile');
const appoint= document.getElementById('app-btn');

editprofile.style.cursor="pointer";
myprofile.style.cursor="pointer"
appoint.style.cursor="pointer";

fetch(`/studentlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    name.innerText=data[0].firstname+" "+data[0].lastname;
    id.innerText="ID No : "+data[0].idno;
    session.innerText="Session : "+data[0].session;
    dept.innerText= "Department : "+data[0].department;

    e_mail.innerText=data[0].email;
    fullname.innerText=data[0].firstname+" "+data[0].lastname;
    dob.innerText=data[0].dob;
    bg.innerText=data[0].bloodgroup;

})

myprofile.addEventListener("click",()=>{
    location.href=`./studentDashboard.html?email=${emailValue}`;
})

editprofile.addEventListener("click",()=>{
    location.href=`../editProfile/editProfile.html?email=${emailValue}`;
});

appoint.addEventListener("click",()=>{
    location.href=`../doctorList/doctorLIst.html?email=${emailValue}`;
});
const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);


let doctorList=document.getElementById("doctor-list");
let list=document.getElementById('app-list');
let doctorHTML="",doctorname="";
let selectone,selecttwo,selectonetext,selecttwotext,mail;
fetch("http://localhost:6204/doctorlist")
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.forEach(user => {
        mail=user.email;
        doctorname=user.name;
        doctorHTML=doctorHTML+`
        <div class='desc-div'>
        <div class="flex-dir-col background" id="doctor">
            <h2>${user.name}</h2> 
            <p class="margin-zero">${user.degree}</p>
            <p class="margin-zero">${user.institute}</p>
            <button class="button-2" onclick="myFunction('${mail}')">Select</button>
        </div>
        </div>
        `
        
    });
    doctorList.innerHTML=doctorHTML;
})

function myFunction(mail) {
    console.log(mail);
   
    
    fetch(`http://localhost:6204/doctorlist/${mail}`)
    .then(res => res.json())
    .then(data=>{
        let doctorData="";
        doctorData=doctorData+`
        <div>
        <h2 class="blue-text">${data[0].name}</h2>
        <p class="justify-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi cupiditate sunt sit voluptas necessitatibus molestias quod quos maxime exercitationem magni.</p>
        <section class="booking-appointment">
            <h3>Schedule Date</h3>
            <input type="date" id="stime" name="schedule-date" id="" class="input-form">
            <h3>Appointment time</h3>
            <div class="button"><h3 onclick="select1()">${data[0].shift1}</h3></div>
            <div class="button"><h3 onclick="select2()">${data[0].shift2}</h3></div>
            <div class="button-1" onclick="makeAppointment()"><h3>Take an appointment</h3></div>

        </section>
        </div>

        `
        list.innerHTML=doctorData;
    })
}

function select1() {
    selectonetext=event.target.innerText;
    selecttwotext=null;
    selectone=event.target.parentNode;
    selectone.style.color="white";
    selectone.style.backgroundColor="#2b1664";
    selecttwo.style.color="#2b1664";
    selecttwo.style.backgroundColor="white";
    console.log(selectonetext,selecttwotext);
}
function select2() {
    selecttwotext=event.target.innerText;
    selectonetext=null;
    selecttwo=event.target.parentNode;
    selecttwo.style.color="white";
    selecttwo.style.backgroundColor="#2b1664";
    selectone.style.color="#2b1664";
    selectone.style.backgroundColor="white";
    console.log(selectonetext,selecttwotext);

}

function makeAppointment(){
    console.log("I am clicked");
    let selected;
    const stime=document.getElementById("stime");
    if(selectonetext===null){
        selected=selecttwotext;
    }
    else{
        selected=selectonetext;
    }
    console.log(selected);
    const appointment={
        studentmail:emailValue,
        doctorname:doctorname,
        doctormail:mail,
        date:stime,
        shift:selected
    }

}
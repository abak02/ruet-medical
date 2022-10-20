

const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today); 

let doctorList=document.getElementById("doctor-list");
let list=document.getElementById('app-list');
let doctorHTML="",doctorname="";
let selectone="",selecttwo="",selectonetext,selecttwotext,mail,mailid;
fetch("/doctorlist")
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.forEach(user => {
        mail=user.email;
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
    
    fetch(`/doctorlist/${mail}`)
    .then(res => res.json())
    .then(data=>{
        let doctorData="";
        console.log(data);
        mailid=data[0].email;
        doctorname=data[0].name;
        doctorData=doctorData+`
        <div>
        <h2 class="blue-text">${data[0].name}</h2>
        <p class="justify-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi cupiditate sunt sit voluptas necessitatibus molestias quod quos maxime exercitationem magni.</p>
        <section class="booking-appointment">
            <h3>Schedule Date</h3>
            <input type="date" id="stime" name="schedule-date" id="" class="input-form">
            <h3>Appointment time</h3>
            <div class="button" id="shift1"  onclick="func1()"><h3 id="s1" >${data[0].shift1}</h3></div>
            <div class="button" id="shift2" onclick="func2()"><h3 id="s2" >${data[0].shift2}</h3></div>
            <div class="button-1" onclick="makeAppointment()"><h3>Take an appointment</h3></div>
            <h4 class="para" id="yo"> Appointed Successfully</h4>
        </section>
        </div>

        `
        list.innerHTML=doctorData;
    })
    
    
}

const after={
    color:"white",
    backgroundColor:"2b1664"
}

const before={
    color:"2b1664",
    backgroundColor:"white"
}


function func1(){
    const s1=document.getElementById('s1');
    const shift1=document.getElementById('shift1');
    const shift2=document.getElementById('shift2');
    selectonetext=s1.innerText;
    selecttwotext=null;
    shift1.style.color="white";
    shift1.style.backgroundColor="#2b1664";
    shift2.style.backgroundColor="white";
    shift2.style.color="#2b1664";
    console.log(selectonetext,selecttwotext);
}

function func2() {  
    const s2=document.getElementById('s2');
    const shift1=document.getElementById('shift1');
    const shift2=document.getElementById('shift2');
    selecttwotext=s2.innerText;
    selectonetext=null;
    shift2.style.color="white";
    shift2.style.backgroundColor="#2b1664";
    shift1.style.backgroundColor="white";
    shift1.style.color="#2b1664";
    console.log(selectonetext,selecttwotext);
}



function makeAppointment(){
    console.log("I am clicked");
    let selected,appointarr,newarr;
    const stime=document.getElementById("stime").value;
    console.log(stime);
    if(selectonetext===null){
        selected=selecttwotext;
    }
    else{
        selected=selectonetext;
    }
    console.log(selected);
    fetch(`/appointmentlist/${mailid}`)
    .then(res=>res.json())
    .then(data=>{
    appointarr=data;
    newarr=appointarr.filter(app => app.date===today);
    console.log(newarr);
    console.log(appointarr);
    if(newarr.length>10){
        alert('Please select another doctor');
    }
    else{
        fetch(`/addappointment/${emailValue}&${doctorname}&${mailid}&${stime}&${selected}&false`,
        {method:'POST',
        })
        .then(res=>res.json())
        .then(result=>{
        console.log('inserted successfully');
        })
        document.getElementById("yo").style.display="inline-block";
        setTimeout(()=>{
            location.reload();
        },2000);
    }
    });
    
    

}
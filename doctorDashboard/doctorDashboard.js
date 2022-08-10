console.log("i am connected");
const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

const doctorName=document.getElementById('doctor-name');
const desi = document.getElementById('designation');
const myProfile=document.getElementById('my-profile');
const editProfile=document.getElementById('edit-profile');
const overview=document.getElementById('overview');
let studentmail;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today); 


myProfile.style.cursor="pointer";
editProfile.style.cursor="pointer";
overview.style.cursor="pointer";

fetch(`http://localhost:6204/doctorlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    doctorName.innerText=data[0].name;
    desi.innerText=data[0].degree;
})

myProfile.addEventListener("click", function(){
    location.href=`../doctorProfile/doctorProfile.html?email=${emailValue}`;
})

editProfile.addEventListener("click", function(){
    location.href=`../editDoctorProfile/editDoctorProfile.html?email=${emailValue}`;
})

overview.addEventListener("click", function(){
    location.href=`../doctorDashboard/doctorDashboard.html?email=${emailValue}`;
});
//appointment data

fetch(`http://localhost:6204/appointmentlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    let appointHTML="";
    let upcomingHTML="";
    const appointmentlist=document.getElementById('appointmentlist');
    const upcoming=document.getElementById('upcoming');
    data.forEach(user=>{
        fetch(`http://localhost:6204/studentlist/${user.studentmail}`)
        .then(res=>res.json())
        .then(studata=>{
            if(user.date===today&&user.status==='false'){
                appointHTML=appointHTML+`
                    <div class="flex-col-50">
                    <div class="bg-color-1">
                        <h4>${studata[0].firstname+" "+studata[0].lastname}</h4>
                        <p>ID : ${studata[0].idno}</p>
                        <p>Department : ${studata[0].department}</p>
                        <p>Date : ${user.date}</p>
                        <p>Time : ${user.shift}</p>
                        <div class="flex-div-1">
                            <div class="flex-col-50">
                                <a href="" class="red-font">View Details</a>
                            </div>
                            <div class="flex-col-50">
                                <a style="cursor:pointer;" id="prescription" onclick="prescription('${user.studentmail}','${user._id}')" class="red-font color-font">Prescribe</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            `
            }
            else if(user.status==='false'){
                upcomingHTML=upcomingHTML+`
                    <div class="flex-col-50">
                        <div class="bg-color-2">
                            <h4>${studata[0].firstname+" "+studata[0].lastname}</h4>
                            <p>ID : ${studata[0].idno}</p>
                            <p>Department : ${studata[0].department}</p>
                            <p>Date : ${user.date}</p>
                            <p>Time : ${user.shift}</p>
                            <a href="" class="red-font">View Details</a>
                        </div>
                    </div>
                `;
            }
            ;
    
        appointmentlist.innerHTML=appointHTML;
        upcoming.innerHTML=upcomingHTML;
    
        })
        
        
    })
    
    
})



function prescription(mailstu,id){
    location.href=`../makePrescription/makePrescription.html?email=${mailstu}&docmail=${emailValue}&id=${id}`;
}
console.log("i am connected");
const urlParams=new URLSearchParams(window.location.search);
const emailValue=urlParams.get('email');
console.log(emailValue);

const doctorName=document.getElementById('doctor-name');
const desi = document.getElementById('designation');
const myProfile=document.getElementById('my-profile');
const editProfile=document.getElementById('edit-profile');
const overview=document.getElementById('overview');

myProfile.style.cursor="pointer";
editProfile.style.cursor="pointer";
overview.style.cursor="pointer";

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

overview.addEventListener("click", function(){
    location.href=`../doctorDashboard/doctorDashboard.html?email=${emailValue}`;
});
//appointment data

fetch(`http://localhost:6204/appointmentlist/${emailValue}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    let appointHTML="";
    const appointmentlist=document.getElementById('appointmentlist');
    data.forEach(user=>{
        fetch(`http://localhost:6204/studentlist/${user.studentmail}`)
        .then(res=>res.json())
        .then(studata=>{
            console.log(studata);
            appointHTML=appointHTML+`
            <div class="flex-col-50">
            <div class="bg-color-1">
                <h4>${studata[0].firstname+" "+studata[0].lastname}</h4>
                <p>ID : ${studata[0].idno}</p>
                <p>Department : ${studata[0].department}</p>
                <p>Date : ${data[0].date}</p>
                <p>Time : ${data[0].shift}</p>
                <div class="flex-div-1">
                    <div class="flex-col-50">
                        <a href="" class="red-font">View Details</a>
                    </div>
                    <div class="flex-col-50">
                        <a href="../makePrescription/makePrescription.html" class="red-font color-font">Prescribe</a>
                    </div>
                </div>
                
            </div>
        </div>
    `;
    appointmentlist.innerHTML=appointHTML;
        })
        
        
    })
    
    
})
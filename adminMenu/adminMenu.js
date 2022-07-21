
let doctorLength=document.getElementById("doctor-length");
let staffLength=document.getElementById("staff-length");
let doctorList=document.getElementById("doctor-list");
let staffList=document.getElementById("staff-list");
let doctorHTML="";
let staffHTML="";


fetch("http://localhost:6204/doctorlist")
.then(res=>res.json())
.then(data=>{
    doctorLength.innerText=data.length+"+";
    data.forEach(user => {
        doctorHTML=doctorHTML+`
        <div class="flex-dir-col background">
            <h2>${user.name}</h2>
            <p class="margin-zero">${user.degree}</p>
            <p class="margin-zero">${user.institute}</p>
            <button class="red-button" onclick="deletedoctor('${user._id}')">Remove</button>
        </div>
        `
    });
    doctorList.innerHTML=doctorHTML;
})

function deletedoctor(id){
    fetch(`http://localhost:6204/deletedoctor/${id}`,
    {method:'DELETE'
    })
    .then(res=>res.json())
    .then(result=>{
        console.log('deleted successfully');
    })
    location.reload();
}

fetch('http://localhost:6204/stafflist')
.then(res=>res.json())
.then(data=>{
    staffLength.innerText = data.length+"+";
    data.forEach(user=>{
        staffHTML=staffHTML+`
        <div class="flex-dir-col background">
            <h2>${user.name}</h2>
            <p class="margin-zero">${user.designation}</p>
            <button class="red-button" onclick="deletestaff('${user._id}')">Remove</button>
        </div>
        `
    });
    staffList.innerHTML=staffHTML;
})

function deletestaff(id){
    fetch(`http://localhost:6204/deletestaff/${id}`,
    {method:'DELETE'
    })
    .then(res=>res.json())
    .then(result=>{
        console.log('deleted successfully');
    })

}
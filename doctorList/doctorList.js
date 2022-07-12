
let doctorList=document.getElementById("doctor-list");
let doctorHTML="";
fetch("http://localhost:6204/doctorlist")
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.forEach(user => {
        doctorHTML=doctorHTML+`
        <div class='desc-div'>
        <div class="flex-dir-col background">
            <h2>${user.name}</h2>
            <p class="margin-zero">${user.degree}</p>
            <p class="margin-zero">${user.institute}</p>
        </div>
        </div>
        `
    });
    doctorList.innerHTML=doctorHTML;
})
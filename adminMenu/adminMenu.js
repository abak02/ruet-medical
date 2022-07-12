
let doctorLength=document.getElementById("doctor-length");
let doctorList=document.getElementById("doctor-list");
let doctorHTML="";
fetch("http://localhost:6204/doctorlist")
.then(res=>res.json())
.then(data=>{
    doctorLength.innerText=data.length+"+";
    console.log(data);
    data.forEach(user => {
        doctorHTML=doctorHTML+`
        <div class="flex-dir-col background">
            <h2>${user.name}</h2>
            <p class="margin-zero">${user.degree}</p>
            <p class="margin-zero">${user.institute}</p>
            <button class="red-button">Remove</button>
        </div>
        `
    });
    doctorList.innerHTML=doctorHTML;
})
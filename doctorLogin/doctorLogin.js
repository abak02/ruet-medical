console.log("i am connected");
function checklogin(){
    let useremail=document.getElementById('email').value;
    let userpasswords=document.getElementById('password').value;
    fetch(`http://localhost:6204/doctorlist/${useremail}`)
    .then(res=>res.json())
    .then(data=>{
        const dbmail=data[0].email;
        const dbpass=data[0].password;
        if((dbmail===useremail)&&(dbpass===userpasswords)){
            location.href=`../doctorProfile/doctorProfile.html?email=${useremail}`;
        }
        else{
            const toolTip=document.getElementById('tooltip');
            const para=document.createElement('p');
            para.innerHTML=`Sorry, Try again with right credentials!`;
            toolTip.appendChild(para);
        }
    })
    console.log(userpasswords,useremail);
}
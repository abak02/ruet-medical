
console.log(" i am connected")

function checklogin(){
    const username=document.getElementById('username-given').value;
    const password=document.getElementById('password-given').value;
    fetch('http://localhost:6204/adminLoginInfo')
    .then(res=>res.json())
    .then(data=>{
        const dbusername=data[0].userName;
        const dbpassword=data[0].password;
        if((dbusername===username)&&(dbpassword===password)){
            location.href="../adminMenu/adminMenu.html"
        }
        else{
            
            const toolTip=document.getElementById('tooltip');
            const para=document.createElement('p');
            para.innerHTML=`Sorry, Try again with right credentials!`;
            toolTip.appendChild(para);
            setTimeout(()=>{
                toolTip.removeChild(para);
            },2000);
            
        }
    })
    console.log(username,password);
}


function checklogin(){
    const givenemail=document.getElementById('Email').value;
    const givenpassword=document.getElementById('Password').value;
    console.log(givenemail,givenpassword);
   fetch(`http://localhost:6204/stafflist/${givenemail}`)
   .then(res=>res.json())
   .then(data=>{
    
    const dbmail=data[0].email;
    const dbpass=data[0].password;
    console.log(dbmail,dbpass);

    if((givenemail===dbmail)&&(dbpass===givenpassword)){
        location.href=`../stafMenu/staffMenu.html?email=${dbmail}`;
    }
    else{
        const toolTip=document.getElementById('tooltip');
        const para=document.createElement('p');
        para.innerHTML=`Sorry, Try again with right credentials!`;
        toolTip.appendChild(para);
    }
   })
}
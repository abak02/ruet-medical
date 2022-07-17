console.log('I am connected');
let verificationHTML="";
const verify=document.getElementById('verify-button');
const code=document.getElementById('code');
verify.addEventListener('click',function(){
    verify.style.display="none";
    verificationHTML +=`
        <label for="verificaton">Verification</label>
        <input type='text' placeholder='Enter verification code' class="input-form" name='verfication'>
        <button type="button" class="button">Verify</button>
    `
    code.innerHTML=verificationHTML;
})

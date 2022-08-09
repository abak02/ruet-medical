console.log("i am connected");

const urlParams = new URLSearchParams(window.location.search);
const stumail = urlParams.get("email");
const docmail = urlParams.get("docmail");
const id = urlParams.get("id");
console.log(stumail, docmail);

let medicineHTML = "";
let totaldata = "";
let doctorname="",doctormail="",stuid="",stuname="";
const presdiv = document.getElementById("pres-div");
function plus() {
  medicineHTML =
    medicineHTML +
    `
        <div class="flex-div">
            <div class="flex-col-50">
                <label for="medicine" class="margin-zero">Medicine Name</label>
                    <input type="text" id="medicine" placeholder="Medicine Name" name="medicine" class="input-form">
                    
            </div>
            <div class="flex-col-25">
                <label for="frequency" class='margin-zero'>Frequency</label>
                    <input type="text" name="frequency" class="input-form" placeholder="1+0+1" />
            </div>
            <div class="flex-col-25">
                <label for="dosage" class='margin-zero'>Dosage(*days)</label>
                    <input type="number" name="dosage" class="input-form" placeholder="Ex-3 days" />
            </div>
        </div>
    `;
  presdiv.innerHTML = medicineHTML;
}

fetch(`http://localhost:6204/doctorlist/${docmail}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      doctorname = data[0].name;
      doctormail = data[0].email;
      console.log(doctorname,doctormail);
    });

  fetch(`http://localhost:6204/studentlist/${stumail}`)
    .then((res) => res.json())
    .then((studata) => {
      console.log(studata);
      stuid = studata[0].idno;
      stuname = studata[0].firstname + " " + studata[0].lastname;
      console.log(stuid,stuname);
    });

function func() {
    
  
  console.log(doctormail, stuid,stuname,doctorname);
  const presform = document.getElementById("presform");

  presform.action = `http://localhost:6204/addprescription/${doctorname}&${doctormail}&${stuid}&${stuname}`;
  presform.method = "POST";
  presform.target = "_blank";

  fetch(`http://localhost:6204/updateappointment/${id}`,{method:"PATCH"})
  .then(res=>res.json())
  .then(data=>{
    console.log('data inserted successfully');
  })

}

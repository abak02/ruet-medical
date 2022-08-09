console.log("i am connected");

function addmedicine(){
    const medicinename=document.getElementById('medicinename').value;
    const medicinestrength=document.getElementById('medicinestrength').value;
    const quantity=document.getElementById('quantity').value;
    const dosage=document.getElementById('dosage').value;

    fetch(`http://localhost:6204/addmedicine/${medicinename}&${medicinestrength}&${quantity}&${dosage}`,{method:'POST'})
    .then(res=>res.json())
    .then(result=>{
        console.log("data inserted");
        const toolTip=document.getElementById('tooltip');
            const para=document.createElement('p');
            para.innerHTML=`Medicine Added Successfully`;
            toolTip.appendChild(para);
            setTimeout(()=>{
                toolTip.removeChild(para);
            },2000);
    })
}

let medicineHTML1="";
let applist=document.getElementById("app-list");
fetch('http://localhost:6204/medicinelist')
.then(res=>res.json())
.then(data1=>{
    console.log(data1);
    data1.forEach(element1 => {
        medicineHTML1=medicineHTML1+`
            <div class="background desc-div">
                <p><b>${element1.medicinename} ${element1.medicinestrength}</b></p>
                <p>${element1.dosage}</p>
                <p>Quantity : ${element1.quantity} box</p>
                <button class="button-1" onclick="edit('${element1._id}')">Edit</button>
            </div>
        `;
        applist.innerHTML=medicineHTML1;
    });
})

function edit(id) {
    let medHTML="";
    const medlist=document.getElementById('med-list');
    fetch(`http://localhost:6204/medicinelist/${id}`)
    .then(res=>res.json())
    .then(data => {
        medHTML=medHTML+`
        <label for="medicinename">Edit Medicine Name</label>
        <input
          type="text"
          name="medicinename"
          id="mdname"
          class="input-form"
          value="${data[0].medicinename}"
        />
        <label for="medicinestrength">Edit Medicine Strength</label>
        <input
          type="text"
          name="medicinestrength"
          id="mdstrength"
          class="input-form"
          value="${data[0].medicinestrength}"
        />
        <label for="dosage">Edit dosage type</label>
        <input
          type="text"
          id="dos"
          name="dosage"
          value="${data[0].dosage}"
          class="input-form"
        />
        <label for="quantity"
          >Edit Medicine Quantity<small></small></label
        >
        <input
          type="text"
          name="quantity"
          id="quan"
          class="input-form"
          value="${data[0].quantity}"
        />
        <button style="margin-top:.5rem;" onclick="update('${data[0]._id}')"class='button'>Update</button>
        `;
        medlist.innerHTML=medHTML;

    })
}

function update(id){
    const mdname=document.getElementById('mdname').value;
    const mdstrength=document.getElementById('mdstrength').value;
    const quan=document.getElementById('quan').value;
    const dos=document.getElementById('dos').value;
    const notundata=`${id}&${mdname}&${mdstrength}&${quan}&${dos}`;
    fetch(`http://localhost:6204/updatemedicine/${notundata}`,{method:"PATCH"})
  .then(res=>res.json())
  .then(data=>{
    console.log('data inserted successfully');
  })
}
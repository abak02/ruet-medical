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
        
    })
        setTimeout(()=>{
          location.reload();
        },1000);
}

let medicineHTML1="",prevam;
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
                <p>Quantity : ${element1.quantity} pcs</p>
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
          >Enter new medicine quantity<small></small></label
        >
        <input
          type="text"
          name="quantity"
          id="quan"
          class="input-form"
          placeholder="New quantity added with prevoius quantity"
        />
        <button style="margin-top:.5rem;" onclick="update('${data[0]._id}','${data[0].quantity}')"class='button'>Update</button>
        `;
        medlist.innerHTML=medHTML;

    })
}

function update(id,quantity){
    const mdname=document.getElementById('mdname').value;
    const mdstrength=document.getElementById('mdstrength').value;
    const quan=document.getElementById('quan').value;
    const dos=document.getElementById('dos').value;
    const totalquan=parseInt(quan)+parseInt(quantity);
    const notundata=`${id}&${mdname}&${mdstrength}&${totalquan}&${dos}`;
    fetch(`http://localhost:6204/updatemedicine/${notundata}`,{method:"PATCH"})
  .then(res=>res.json())
  .then(data=>{
    console.log('data inserted successfully');
  })
  setTimeout(()=>{
    location.reload();
  },1000);
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://abak:abak1234@ruetmedical.tvgvtkg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//admin related functions
client.connect((err) => {
  const collection = client.db("adminlogin").collection("adminLogin");
  app.get("/adminLoginInfo", (req, res) => {
    collection.find({}).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });
});

//doctor related methods
client.connect((err) => {
  const doctorCollection = client.db("doctorinfo").collection("doctorInfo");
  app.post("/adddoctor", (req, res) => {
    const doctorInfo = req.body;
    doctorCollection.insertOne(doctorInfo).then((result) => {
      console.log("data inserted successfully");
    });
    res.send("Data inserted successfully");
  });

  app.get("/doctorlist", (req, res) => {
    doctorCollection.find({}).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });
  app.get("/doctorlist/:email", (req, res) => {
    const givemail = req.params.email;
    console.log(givemail);
    doctorCollection.find({ email: givemail }).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });

  app.delete("/deletedoctor/:id", (req, res) => {
    console.log(req.params.id);
    doctorCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        console.log(result);
      });
  });

  console.log("database connection established");
});

//staff related functions
client.connect((err) => {
  const staffCollection = client.db("staffinfo").collection("staffInfo");

  app.post("/addstaff", (req, res) => {
    const staffInfo = req.body;
    staffCollection.insertOne(staffInfo).then((result) => {
      console.log("data inserted successfully");
    });
    res.send("data inserted successfully");
  });

  app.get("/stafflist", (req, res) => {
    staffCollection.find({}).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });

  app.get("/stafflist/:email", (req, res) => {
    const givemail = req.params.email;
    console.log(givemail);
    staffCollection.find({ email: givemail }).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });

  app.delete("/deletestaff/:id", (req, res) => {
    console.log(req.params.id);
    staffCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        console.log(result);
      });
  });
});

//Student related functions
client.connect((err) => {
  const studentCollection = client.db("studentinfo").collection("studentInfo");
  app.post("/addstudent", (req, res) => {
    const studentInfo = req.body;
    studentCollection.insertOne(studentInfo).then((result) => {
      console.log("data inserted successfully");
    });
    res.send("Data inserted successfully");
  });

  // app.get('/doctorlist',(req, res) => {
  //   doctorCollection.find({})
  //   .toArray((err,data)=>{
  //       res.send(data);
  //       console.log(data);
  //   })
  // })
  app.get("/studentlist/:email", (req, res) => {
    const givemail = req.params.email;
    console.log(givemail);
    studentCollection.find({ email: givemail }).toArray((err, data) => {
      res.send(data);
      console.log(data);
    });
  });

  // app.delete('/deletedoctor/:id',(req,res)=>{
  //   console.log(req.params.id);
  //   doctorCollection.deleteOne({_id:ObjectId(req.params.id)})
  //   .then((result)=>{
  //     console.log(result);
  //   })
  // })

  console.log("database connection established");
});

//appointment post request
client.connect((err) => {
  const appointmentCollection = client.db("appointmentinfo").collection("appointmentInfo");
  app.post("/addappointment/:obj", (req, res) => {
    const appointmentInfo = req.params.obj;
    const arr=appointmentInfo.split("&");
    
    appointmentCollection.insertOne({
      studentmail: arr[0],
      doctorname:arr[1],
      doctormail:arr[2],
      date:arr[3],
      shift:arr[4],
      status:arr[5]
    }).then((result) => {
      console.log("data inserted successfully");
    });
   });



   app.get('/appointmentlist/:docmail', (req, res) => {
    const doctormail=req.params.docmail;
    console.log(doctormail);
    appointmentCollection.find({doctormail: doctormail})
    .toArray((err,result)=>{
      res.send(result);
    })
   })

});

app.get("/", (req, res) => {
  res.send("i am connected");
});

app.listen(6204);

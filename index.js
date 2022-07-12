const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abak:abak1234@ruetmedical.tvgvtkg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

client.connect(err => {
  const collection = client.db("adminlogin").collection("adminLogin");
  app.get('/adminLoginInfo',(req, res) => {
    collection.find({})
    .toArray((err,data)=>{
        res.send(data);
        console.log(data);
    })
  })
  
});

client.connect(err=>{
  const doctorCollection = client.db("doctorinfo").collection("doctorInfo");
  app.post('/adddoctor',(req, res) => {
    const doctorInfo=req.body;
    doctorCollection.insertOne(doctorInfo)
    .then(result=>{
      console.log("data inserted successfully");
    })
    res.send('Data inserted successfully');
  })


  app.get('/doctorlist',(req, res) => {
    doctorCollection.find({})
    .toArray((err,data)=>{
        res.send(data);
        console.log(data);
    })
  })
  app.get('/doctorlist/:email',(req, res) => {
    const givemail = req.params.email;
    console.log(givemail);
    doctorCollection.find({email:givemail})
    .toArray((err,data)=>{
        res.send(data);
        console.log(data);
    })
  })



  console.log('database connection established');
})


app.get('/',(req,res)=>{
    res.send('I am listening');
})

app.listen(6204);
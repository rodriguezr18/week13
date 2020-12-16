var express = require("express")

var app = express()

var data = require("./public/database.json")

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.get("/workers", (req,res) => {
    if(!data) {
        res.status(404).send("Could not find information")
    }
    res.send(data)
})


app.get("/workers/:id", (req, res) => {

    const findEmployee = data.workers.find(function (employee) {
  
      return parseInt(req.params.id) === employee.id
  
    })
  
    if (!findEmployee) {
      res.status(404).send("Could not find the information")
    }
    res.send(findEmployee)
  
  });



// HARD CHALLENGE STARTS HERE

app.post("/workers", (req,res) => {

  const findEmployee = {
    id:data.workers.length +1,
    name: req.body.name,
    salary: req.body.salary,
    department: req.body.department
  }

  if(!findEmployee) {
    res.status(404).send("Could not find information")
  }

  data.workers.push(findEmployee)

  res.send(findEmployee)

  return
})

app.listen(3000)
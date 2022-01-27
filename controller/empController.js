const empModel=require('../db/empSchema')

 async function getEmp() {
     return empModel.find({})
}

async function postEmp(data) {
    let ins = new empModel({name:data.name,email:data.email,age:data.age,phone:data.phone,salary:data.salary})
    ins.save((err) => {
        if (err) {
           console.log(err.message)
        }
    })
}
async function login(email,password) {
    let ins = new empModel({email:email,password:password})
    ins.save((err) => {
        if (err) {
           console.log(err.message)
        }
    })
}
async function delEmp(id) {
   await empModel.deleteOne({_id:id},(err,docs)=>{
       if(err){
        console.log(err.message)
       }
   })
}
async function updateEmp(id,data) {
   await empModel.updateOne({_id:id},{name:data.name,email:data.email,age:data.age,phone:data.phone,salary:data.salary},(err,docs)=>{
       if(err){
        console.log(err.message)
       }
   })
}

module.exports={
    getEmp,postEmp,delEmp,updateEmp,login
}
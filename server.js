const express=require('express');
const port=8899;
const mongoose=require('mongoose')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
const empRoutes=require('./routes/empRoutes');

app.use('/api/users',empRoutes);

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`working on ${port}`)
})

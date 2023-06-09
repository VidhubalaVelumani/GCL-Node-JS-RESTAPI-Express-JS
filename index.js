const Joi = require('joi');
const express = require('express');
const { validate } = require('joi');
const app = express();

app.use(express.json());

const courses = [
 {id:1,name : 'courses1'},
 {id:2,name : 'courses2'},
 {id:3,name : 'courses3'},
];

app.get('/',(req,res)=>{
res.send('Hello world');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    };
     const result=Joi.validate(req.body, schema);
     if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
   }
    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Not existing , return 404 
   const course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given ID was not found');

  
const { error } = validateCourse(req.body);//result error
if(error){
    res.status(400).send(error.details[0].message);
    return;
}

//update course
course.name = req.body.name;
//return the updated course
res.send(course);

});


app.delete('/api/courses/:id',(req, res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given ID was not found');

   //delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);
   res.send(course);

    
});

function validateCourse(course){
    const schema ={
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
    

}

//api/courses/1



app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c=>c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given ID was not found');
   res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));

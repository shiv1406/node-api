const express= require('express')
const { json } = require('express/lib/response')
const app=express()
app.use(express.json())
const Joi=require('joi')

const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port ${port} ...`))


const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema)
}

app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify(courses))
})
app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        return res.status(404).send('Course with the given id was not found')
    }
    res.send(JSON.stringify(course))
   
})

app.post('/api/courses/',(req,res)=>{

    const {error}=validateCourse(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course)
    res.send(JSON.stringify(course))
})

app.put('/api/courses/:id',(req,res)=>{
    const {error}=validateCourse(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        return res.status(404).send('Course with the given id was not found')
    }
    course.name=req.body.name
    res.send(JSON.stringify(course))
})

app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        return res.status(404).send('Course with the given id was not found')
    }
    const index=courses.indexOf(course)
    courses.splice(index,1)
    res.send(JSON.stringify(course))
})

const router = require('express').Router()
const Students = require('../students/student-model.js')
const validateUserById = require('../custom-middleware/validateUserById.js')

router.use('/:id', validateUserById)

router.get('/:id/students', (req,res) => {
    const { id } = req.params

    Students.findStudents(id)
        .then(students => {
            console.log(students)
            res.status(200).json({
                data: {
                    students
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

router.post('/:id/students', (req, res) => {
    const info = {...req.body, profId: req.params.id}

    if(!info.firstName || !info.lastName){
        res.status(401).json({message: 'First and Last name information is required'})
    }
    
    Students.addStudent(info)
        .then(saved => {
            console.log(saved)
            res.status(201).json({
                data: {
                    message: 'New Student Successfully Created', 
                    student: {
                        id: saved.id,
                        "First Name": saved.firstName,
                        "Last Name": saved.lastName
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

module.exports = router
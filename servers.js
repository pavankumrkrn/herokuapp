const express = require('express');
var cors = require('cors')
// const bodyParser = require("body-parser");
const app = express();
app.use(cors())
app.use(express.json());
// app.use(bodyParser.json())

let port = process.env.PORT || 3000;
let students = [{
    name: 'student-1',
    id: 0,
    availability: true,
    mentorId: ''
}]
let mentors = [{
    name: 'mentor-1',
    id: 0,
    students: []
}]


app.get('/mentors', (req, res) => {
    res.json(mentors)
})

app.get('/students', (req, res) => {
    res.json(students)
})

app.get("/student/:id", (req, res) => {
    let stud = students.filter((i) => i.id === +req.params.id)[0]

    if (stud) {
        res.json(stud)
    } else {
        res.json({
            message: "no record available"
        })
    }
})


app.post("/student", (req, res) => {
    try {
        let studentData = {
            name: req.body.name,
            id: students.length + 1,
            availability: true,
            mentorId: ''
        }
        students.push(studentData);
        res.json({
            message: 'student created successfully',
            status: 'primary'
        })

    } catch (error) {
        res.json({
            message: 'student creation failed',
            status: 'danger'
        })

    }
})

app.post("/mentor", (req, res) => {
    try {
        let mentorData = {
            name: req.body.name,
            id: mentors.length + 1,
            students: []
        }
        mentors.push(mentorData);
        res.json({
            message: 'mentor created successfully',
            status: 'primary'
        })

    } catch (error) {
        res.json({
            message: 'mentor creation failed',
            status: 'danger'
        })

    }

})

app.put('/student/:sid/:mid', (req, res) => {
    try {
        let stud;
        students = [...students].map((i) => {
            if (i.id === +req.params.sid) {
                i.availability = false;
                i.mentorId = +req.params.mid
                stud = i;
            }
            return i
        });
        mentors = [...mentors].map((i) => {
            if (i.id === +req.params.mid) {
                i.students.push(stud)
            }
            return i
        })
        res.json({
            message: 'record updated successfully',
            status: 'primary'
        })

    } catch (error) {
        res.json({
            message: 'mapping failed',
            status: 'danger'
        })
    }



});

app.get("/mentor/:id", (req, res) => {
    let men = mentors.filter((i) => i.id === +req.params.id)[0]
    if (men) {
        res.json(men)
    } else {
        res.json({
            message: "no record available"
        })
    }
})


app.listen(port, () => {
    console.log(`port open ${port}`)
})



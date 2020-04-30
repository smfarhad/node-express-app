const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const posts = [{
        id: 1,
        name: "Posts 1"
    },
    {
        id: 2,
        name: "Posts 2"
    },
    {
        id: 3,
        name: "Posts 3"
    }
];
const courses = [{
        id: 1,
        name: "Courses 1"
    },
    {
        id: 2,
        name: "Courses 2"
    },
    {
        id: 3,
        name: "Courses 3"
    }
];
app.get('/', (req, res) => {
    res.send('Hi Farhad!!!!');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/course/:id', (req, res) => {
    res.send(req.params.id);
});
app.get('/api/course/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});
app.get('/api/course/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) return res.status(404).send("The course with the given Id was not found");
    res.send(post);

});


app.post('/api/courses', (req, res) => {

    const result = validateCourse(req.body);
    const {
        error
    } = validateCourse(req.body.name);

    if (error) {
        res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res) => {
    // exist or not
    const course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given Id was not found");



    //validate error
    // bad request 400
    const {
        error
    } = validateCourse(req.body.name);
    if (error) return res.status(400).send(error.details[0].message)
    // update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/course/:id', (req, res) => {
    // check exist or not
    // 404
    const course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given Id was not found");

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the same course 
    res.send(course);
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`)
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate({
        name: course
    });
}
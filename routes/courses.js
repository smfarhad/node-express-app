const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', {
        title: 'My Expert App',
        message: "My Message"
    });
});
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

router.get('/', (req, res) => {
    res.send(courses);
});
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});
router.get('/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});
router.get('/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});
router.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) return res.status(404).send("The courses with the given Id was not found");
    res.send(post);

});


router.post('/', (req, res) => {
    const {
        error
    } = validatecourses(req.body.name);

    if (error) {
        res.status(400).send(error.details[0].message)
    }

    const courses = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(courses);
});

router.put('/:id', (req, res) => {
    // exist or not
    const courses = courses.find(p => p.id === parseInt(req.params.id));
    if (!courses) return res.status(404).send("The courses with the given Id was not found");
    //validate error
    // bad request 400
    const {
        error
    } = validatecourses(req.body.name);
    if (error) return res.status(400).send(error.details[0].message)
    // update courses
    courses.name = req.body.name;
    res.send(courses);
});

router.delete('/:id', (req, res) => {
    // check exist or not
    // 404
    const courses = courses.find(p => p.id === parseInt(req.params.id));
    if (!courses) return res.status(404).send("The courses with the given Id was not found");

    //Delete
    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    // return the same courses 
    res.send(courses);
});

module.exports = router;
const statrupDebugger = require('debug')('app:statrup')
const dbDebugger = require('debug')('app:db')
const config = require('config');
const Joi = require('@hapi/joi');
const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
const helmet = require('helmet')
const morgan = require('morgan')
const courses = require('./routes/courses');



const app = express();

//const pug = require('pug');

// console.log(` NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(logger);
app.use(authenticate);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(helmet());
app.use(morgan('combined'))


app.set('view engine', 'pug');

app.set('views', './views');
app.use('/api/courses', courses);



// Configuration 
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('name'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    statrupDebugger("Morgan enabled .....")
}

dbDebugger('Connected to the database...');




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
const path = require('path'); // use to modify the file path
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
// define path for express cofig
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// template engine set up names matter!!
// set up tempate engine and the location (default views)
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// this will connect to the html pages, if this runs and get the correct page, app.get('') will not run
// set up static directory to serve
app.use(express.static(publicDir));

// send req to templet engine, home
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Benson'
    });
})

// send req to templet engine, about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Benson'
    });
})

// send req to templet engine, help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Benson',
        message: 'Here are some help'
    });
})

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // server cant send more than 1 response so return will not run another send 
        return res.send({
            err: 'You must provide a address'
        })
    }

    geocode(req.query.address, (err, {latitude, longtitude, location} = {}) => {
        if (err) {
            return res.send({err});
        }

        forcast(latitude, longtitude, (err, forcastData) => {
            if (err) {
                return res.send({err});
            }
            
            res.send({
                forcast: forcastData,
                location: location,
                address: req.query.address
            })

        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        // server cant send more than 1 response so return will not run another send 
        return res.send({
            err: 'You must provide a search term'
        })
    } 

    res.send({
        product: []
    });
})

// we can specify the patern
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Benson',
        message: 'Help artical not found!'
    });
})

// * is wildcare for any side that is not on above
// must be at the end
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Benson',
        message: 'Page not found!'
    });
})


// port, what to do when the server is up
app.listen(3000, () => {
    console.log('Server is up on port 3000!')
});
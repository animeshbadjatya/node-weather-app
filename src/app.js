const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/weather')
const app = express()

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirPath))

// app.com
//app.com/help or app.com/about

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsPath)


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Animesh badjatya'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name: 'Animesh Badjatya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Animesh Badjatya'
    })
})
 
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log(latitude + " ******* " + longitude)
        if (error) {
            return res.send({
                error: 'Please provide an address'
            })
        }
        // console.log(response);
        getWeather.getWeather(latitude, longitude, (error, { temperature } = {}) => {
            if (error) {
                return res.send({
                    error: 'Please provide an address'
                })
            }
            res.send({
                forecast : temperature,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('pagenotfound', {
        title: '404',
        name: 'Animesh Badjatya',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req,res)=> {
    res.render('pagenotfound', {
        title: '404',
        name: 'Animesh Badjatya',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, ()=> {
    console.log("Server up on 3000")
})
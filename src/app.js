const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'francesco franciosi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'francesco franciosi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'francesco franciosi',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if(error){
           return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData)=>{
           if(error){
              return res.send({error})
           }
        res.send({
          forecast: forecastData,
          location: location
         })
        })
     })

    })

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'francesco franciosi',
        errorMessage: 'Help article not found'})
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'francesco franciosi',
        errorMessage: 'Page not found'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})


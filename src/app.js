const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')

const forecast = require('./utils/02forecast')
const geocode = require('./utils/02geocode')

const port = process.env.PORT | 3000

//define paths for express config
const public_dir_path = path.join(__dirname,'../public')   
const viewpath = path.join(__dirname,'../template/views') 
const partialspath= path.join(__dirname,'../template/partials')


//setup handlebars and view loc ) 
app.set('view engine', 'hbs')
app.set('views', viewpath)  //this wont be required if you have folder "views" in root
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(public_dir_path))


app.get('', (req,res)=>{
    res.render('index', {title: 'dynamic weather', name:'charith RC'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'about' ,name: 'charith RC'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title : 'help' ,name : 'charith RC'})
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
       return res.render('404',{title:"please provide address string",name : 'charith RC'})
    }
        //getting geocode for given address
        geocode.geocode(req.query.address,(e,{latti , longi , place_searched}={})=>{
                if(e){
                        return res.send({e})          
                }
                //getting forecast from obtained latti and longi
                forecast.forecast(latti,longi,(error, forecastData) => {
                if(error){
                         return res.send({e})
                }
                res.send({place_searched,forecastData})
                })
        })
})

//ERROR HANDLERS
app.get('/help/*',(rew,res)=>{            //SPECIFIC 404 PAGES
    res.render('404',{title : 'article help not found',name : 'charith RC'})
 })
 app.get('*',(rew,res)=>{            //THIS HAS TO BE AT LAST 
     res.render('404',{title: '404 not found',name : 'charith RC'})
 })

 //SERVER HOSTING
app.listen(port, ()=>{
    console.log('server is up and running on the port '+port)
})


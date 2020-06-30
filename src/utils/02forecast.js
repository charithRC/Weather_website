const request = require('request')

const forecast = (latti,longi,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latti+'&lon='+longi+'&APPID=880eb3c7903d340feaca67e5765a7b3d&units=metric'

    request({url , json:true},(e,{body})=>{
        if(e){
            callback("unable to connect")
        }
        else if(body.message){
            callback(body.message,undefined)
        }
        else{
            callback(e,{
                temp :body.main.temp,
                windspeed :body.wind.speed,
                feels_like:body.main.feels_like,
                humidity:body.main.humidity,
                

                
                

            })
        }
    })
}
module.exports ={
    forecast:forecast
}
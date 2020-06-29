const request = require('request')


const geocode = (address,callback)=>{
    const url = ('https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW94b2JlIiwiYSI6ImNrYmowZjY4YTA0N3IycWxjYnhqajNybzcifQ.hBPJeh4g2iBm4Y1IEweo0w')

    request({url,json:true},(e,{body})=>{
        if(e){
            callback('unable to connect',undefined)
        }
        else if(body.message == 'Forbidden' || body.features[0]== null){
            
           callback('unable to find entered loc')
        }
        else{
        callback(e,{
            latti :body.features[0].center[1],
            longi :body.features[0].center[0],
            place_searched:body.features[0].place_name
        })
        }
    })
}
module.exports = {
    geocode:geocode
}




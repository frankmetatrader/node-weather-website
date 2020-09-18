const request = require('request')

const forecast = (lat, long, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=e57f40458cf33b647dfa6d6690478380&query='+ lat +','+ long + '&units='
    
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find forecast', undefined)
        }else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' °C ' + '\n'
            + 'It feels like ' + body.current.feelslike + ' °C '+ '\n' +
             body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast
const request=require('request')

const forecast= (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=7f46dde8e80c9f5f64d1bfc717cd738f&query="+latitude+','+longitude+'&units=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect",undefined)
        }
        else if(response.body.error){
            callback("error incorrect latituide and longtitude",undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions+ " It is currently  "+response.body.current.temperature+' degrees out. There is '+ response.body.current.percip+" % chance of rain")
        }
    })
}

module.exports=forecast
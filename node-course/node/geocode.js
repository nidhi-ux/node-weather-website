
const request=require('request')

const geocode=(address,callback)=>{
    const url="https://api.maptiler.com/geocoding/"+address+".json?key=aVKiezrPJk1lasaB2YQS&limit=1"

    request({url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to internet",undefined)
        }
        else if(response.body.features.length===0){
            callback("incorrect value",undefined)
        }
        else{
            const latitude=response.body.features[0].center[1]
            const longitude=response.body.features[0].center[0]
            const location=response.body.features[0].place_name
            callback(undefined,{latitude,longitude,location})
        }
})

}

module.exports=geocode
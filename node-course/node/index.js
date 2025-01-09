// const add = (a,b,callback) =>{
//     setTimeout(()=>{
//         callback(a+b)
//     },2000)
// }


// add(1,4,(sum)=>{
//     console.log(sum)
// })


// const request=require('request')
// const forecast=require('./forecast')


// forecast(22.5744,88.3629, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })


const path = require('path') 
const express=require('express')
const { title } = require('process')
const hbs =require('hbs')
const forecast=require('./forecast')
const geocode=require('./geocode')

const app=express()

//paths for express config
const viewpath=path.join(__dirname,'/template/view')
const publicdirectory= path.join(__dirname,'/public')
const partialpath= path.join(__dirname,'/template/partials')

//setup hbs and views locations
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicdirectory))

const port= process.env.PORT || 3000
console.log(port)
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'nidhi agarwal'
    })
})


// app.get('',(req,res)=>{     this is individual pages
//     res.send('<h1>Weather</h1>')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'nidhi agarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'this is the help message',
        title:'weather',
        name:'nidhi agarwal'
    })
})

// app.get('/weather',(req,res)=>{
//     res.send({
//         location:'India',
//         time:"12.26pm"
//     })
// })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"enter an adress"
        })
    }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            console.log(req.query.address)
            console.log({longitude})
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastdata,
                    location:location[0].name,
                    address:req.query.address
                })
            })
        })
        // res.send({
        //     location:'India',
        //     time:"12.26pm",
        //     address:req.query.address
        // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:"help article not found",
        name:"nidhi agarwal"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:"404 ERROR PAGE!! Page not found",
        name:"nidhi agarwal"
    })
})

app.listen(port,()=>{
    console.log('server is up on port ' +  port)
})

// geocode('Boston',(error,data)=>{
//     console.log("error",error)
//     console.log("data",data)
// })
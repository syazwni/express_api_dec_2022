///import express library
let express = require("express")
let mongoose = require("mongoose")
let song = require ('./song')
let cors = require("cors")


//create express app
let app = express()
//make express app use cors()
app.use(cors())
//enable api to receive req body/payload in JSON Format
app.use(express.json())

let PORT = 8000

//connect to mongodb database
//1.set up connection string
let connectionString = "mongodb+srv://mongouser:mongopassword@cluster0.iycqa4v.mongodb.net/youtube"
//2. connect to mongodb server usign connection string
mongoose.connect(connectionString)
let db = mongoose.connection

//3.check if mongodb server->database is connected
db.once("open",()=>{
    console.log("Connected to mongodb database in cloud!");
})

//setup api for root (/) endpoint
//http://localhost:PORTNUMBER
//http://localhost:8000/
//app.get("/end/point", (incoming_request, outgoing_response)=>{})
//define the code for accepting and processing the req
//and send back the response. The requests is of type GET ans coming from
//root (/) endpoint
//app.get("endpoint to which this get request must response", "callback function which deals with incoming req and outgoing response ")
//http://localhost:8000/
app.get("/", (requests, response) => {
    console.log("Request received for / endpoint")
    response.json({
        "message": "HELLO from root -> /",
        "request_type": "GET"

    })

})
//http://localhost:8000/welcome
app.get("/welcome", (requests, response) => {
    console.log("Request received for /welcome endpoint")
    response.json({
        "message": "HELLO from welcome -> /welcome",
        "request_type": "GET"
    })

})

//API -> http://localhost:8000/get/song/all
app.get("/get/song/all", (request, response)=>{
    //connect to mongodb database and get the 
    //list of all documents from youtube db->song collection
    console.log("Connecting to mongodb database")
    song.find({}, (error , data)=>{
        if (error) {
            response.json(error)
        }else{
            //console.log(data)
            response.json(data)
        }
    })

    //send the document list as response to the client
})


    //send the document list as response to the client

    //API -> http://localhost:8000/add/song
    app.post("/add/song" , (request , response)=>{
        //console.log(request)
        console.log(request.body)
        //extract req body/payload from the incoming request
        let receivedVideoid = request.body.videoid
        let receivedLikes = request.body.likes
        let receivedDislikes = request.body.dislikes
        let receivedViews = request.body.views
        //create a new song
        let newSong = new song()
        //update newSong with values received in req body/payload
        newSong.videoid = receivedVideoid
        newSong.likes = receivedLikes
        newSong.dislikes = receivedDislikes
        newSong.views = receivedViews

        //save the newSong model in mongo database
        newSong.save((error, data)=>{
        if (error) {
            response.json(error)
            }else {
                console.log(data)
                response.json(data)
            }

        //connect to mongodb database using model (song.js)

    })
})


app.listen(PORT, () => {
    console.log("Listening on port:" + PORT)
})
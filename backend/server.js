const express = require("express")

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const SpotifyWebApi = require("spotify-web-api-node")

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req,res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "ed5c4e0fc5de4288bcbfdf0c3b9ac723",
        clientSecret: "74123d6bad9e49efb0ce4e03b0b5adf6"
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(e => {
        res.sendStatus(400)
    })
})

app.post('/refresh', (req,res) => {
    console.log('refresh')
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "ed5c4e0fc5de4288bcbfdf0c3b9ac723",
        clientSecret: "74123d6bad9e49efb0ce4e03b0b5adf6",
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
       res.json({
           accessToken: data.body.access_token,
           expiresIn: data.body.expires_in
       })
       
        
    }).catch(() => {
        res.sendStatus(400)
    })


})

app.listen(3001)
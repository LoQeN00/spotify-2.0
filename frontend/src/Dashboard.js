import React,{useState,useEffect} from 'react'
import {useAuth} from './useAuth'
import {Container,Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackResult from './TrackResult'
import Player from './Player'
import UserPlaylists from './UserPlaylists'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PlaylistOverview from './PlaylistOverview'

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: "ed5c4e0fc5de4288bcbfdf0c3b9ac723",
    clientSecret: "74123d6bad9e49efb0ce4e03b0b5adf6",
})


// Notatka dla przyszłego mnie , zrob tak ze pobierasz tylko nazwy playlist ,zdjeica i ich id i potem do komponentu bedzie przesyłane id playlisty i dopiero wtedy będą pobierane te piosenki wszystkie 


const Dashboard = ({code,logout}) => {
    const {accessToken,refreshToken,expiresIn} = useAuth(code)

    const [search,setSearch] = useState("")
    const [username,setUsername] = useState()
    const [searchResults,setSearchResulsts] = useState([])
    const [playlists,setPlaylists] = useState([])
    const [playingTrack,setPlayingTrack] = useState()
    const [lyrics,setLyrics] = useState("")

    const chooseTrack = (uri) => {
        setPlayingTrack(uri)
        setSearch("")
        setLyrics("")
    }

    useEffect(() => {
        if (!accessToken) return

        spotifyApi.setAccessToken(accessToken)

    },[accessToken])


    useEffect(() => {
        if (!search) return setSearchResulsts([])
        if (!accessToken) return

        let cancel = false

        
        spotifyApi.searchTracks(search)
        .then(res => {
            if (cancel) return

            setSearchResulsts(res.body.tracks.items.map(track => {

                const smallestAlbumImage = track.album.images.reduce((smallest,image)=> {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => {
            cancel = true
        }

    },[search,accessToken])


    useEffect(() => {

        if (!accessToken) return
        spotifyApi.getMe()
        .then(res => {
        setUsername(res.body.id)
        }).catch(e => {
            console.log(e)
        })
        
       
    },[accessToken])

    useEffect(() => {
        if (!accessToken) return
        if (!username) return

        spotifyApi.getUserPlaylists(username)
        .then(res => {
            console.log(res.body.items)
            setPlaylists(res.body.items.map(item => {

                const smallestAlbumImage = item.images.reduce((smallest,image)=> {
                    if (image.height < smallest.height) return image
                    return smallest
                }, item.images[0])


                return {
                    playlistName: item.name,
                    playlistId: item.id,
                    playlistPicture: smallestAlbumImage
                }
            }))
        })

    },[accessToken,username])

   
  

    const searchElements = searchResults.map(track => <TrackResult chooseTrack={chooseTrack} key={track.uri} track={track} />)


    return (
        <>
           
            <div className="wrapper">
                
                <UserPlaylists playlists={playlists} />
                
                <Container className=" d-flex flex-column result-container" style={{height: '100vh'}}>
                    
                            <Switch>
                                <Route exact path="/" render={() => (
                                    <>
                                        <Form.Control type="serach" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
                                        <button onClick={logout}>Wyloguj sie</button>
                                        <div className="flex-grow-1 my-2 results" style={{overflowY:"auto"}}>
                                            {searchElements}
                                            {searchResults.length === 0 && (
                                                <div className="text-center" style={{whiteSpace: "pre"}}>
                                                    <h2>Brak wyników</h2>
                                                </div>
                                            )}
                                        </div>
                                    </>

                                )} />
                                <Route path="/:playlistId" render={() => <PlaylistOverview chooseTrack={chooseTrack} accessToken={accessToken} />} />
                            </Switch> 

                <div>
                    <Player accessToken={accessToken} trackUri={playingTrack}/>
                </div>
                </Container>
            </div>
        </>
    )
}

export default Dashboard

import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import Song from './Song'

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: "ed5c4e0fc5de4288bcbfdf0c3b9ac723",
    clientSecret: "74123d6bad9e49efb0ce4e03b0b5adf6",
})




const PlaylistOverview = ({accessToken,chooseTrack}) => {

    const [playlistTracks,setPlaylistTracks] = useState([])

    const {playlistId} = useParams()

    useEffect(() => {
        if(!accessToken) return
        

        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
        if (!accessToken) return

        spotifyApi.getPlaylist(playlistId)
        .then(res => {
            console.log(res.body)
            setPlaylistTracks(res.body.tracks.items.map(track => {

                const smallestAlbumImage = track.track.album.images.reduce((smallest,image)=> {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.track.album.images[0])
                console.log(track)

                return {
                    songTitle: track.track.name,
                    songUri: track.track.uri,
                    songImage: smallestAlbumImage
                }
            }))
        })
    },[playlistId,accessToken])

    const songElements = playlistTracks.map(song =>  <Song chooseTrack={chooseTrack} key={song.songUri} song={song} />)

    

    return (
        
        <>
            <div className="flex-grow-1 my-2 results" style={{overflowY:"auto"}}>
                {console.log(playlistTracks)}
                {songElements}
            </div>
            
        </>
    )
}

export default PlaylistOverview

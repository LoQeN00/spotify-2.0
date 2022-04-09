import React from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'


const Playlist = ({playlist}) => {

    const history = useHistory()
    
   

    return (
        <button onClick={() => history.push(`/${playlist.playlistId}`)}>{playlist.playlistName}</button>
    )
}

export default Playlist

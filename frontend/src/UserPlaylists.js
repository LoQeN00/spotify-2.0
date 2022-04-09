import React from 'react'
import Playlist from './Playlist'
import {useParams,Link,Route} from 'react-router-dom'


const UserPlaylists = ({playlists}) => {

   

    const path = window.location.pathname

    console.log(path)

    const playlistElements = playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)

    return (
        <>
            <Route path="/" exact render={() => (
                  <div className="user-playlists">
                  <h1>Playlisty</h1>
                  {path.toString().length > 1 && <Link to="/">Wróć do wyszukiwarki</Link>}
                  <ul className="d-flex flex-column align-items-center">
                      {playlistElements}
                  </ul>
              </div>
            )} />
            <Route path="/:playlistId" render={()=>(
                <div className="user-playlists">
                    <h1>Playlisty</h1>
                    <Link to="/">Wróć do wyszukiwarki</Link>
                    {path.toString().length > 1 && <Link to="/">Wróć do wyszukiwarki</Link>}
                    <ul className="d-flex flex-column align-items-center">
                        {playlistElements}
                    </ul>
                </div>
            )} />

          

        </>

        
      
    )
}

export default UserPlaylists

import React from 'react'

const Song = ({song:{songImage,songUri,songTitle},chooseTrack}) => {

    const handlePlay = () => {
        chooseTrack(songUri)
    }

    return (
        <div>
             <div className="d-flex m-2 align-items-center track" style={{cursor: 'pointer'}} onClick={handlePlay}>
                 <img src={songImage.url} alt="icon" style={{height: '64px', width: '64px' }} />
                 <div className="ml-3">
                     <div>{songTitle}</div>
                    <div className="text-muted"></div>
                 </div>
             </div>            
        </div>
    )
}

export default Song

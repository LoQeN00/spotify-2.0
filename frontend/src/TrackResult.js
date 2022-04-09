import React from 'react'

const TrackResult = ({track:{artist,title,uri,albumUrl},chooseTrack}) => {


    const handlePlay = () => {
        chooseTrack(uri)
    }

    return (
        <div className="d-flex m-2 align-items-center track" style={{cursor: 'pointer'}} onClick={handlePlay}>
            <img src={albumUrl} alt="icon" style={{height: '64px', width: '64px' }} />
            <div className="ml-3">
                <div>{title}</div>
                <div className="text-muted">{artist}</div>
            </div>
        </div>
    )
}

export default TrackResult

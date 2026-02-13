import { useState, useEffect } from 'react';

const DevSpacePlayer = ({ searchQuery }) => {
    const [track, setTrack] = useState(null);

    useEffect(() => {
        if (!searchQuery || searchQuery.trim() === "") return; // Don't fetch if empty
        // itunes search api endpoint
        const fetchTrack = async () => {
            try {
                const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&limit=1&media=music`);
                const data = await response.json();

                if (data.results.length > 0) {
                    setTrack(data.results[0]);
                }
            } catch (err) {
                console.error('iTunes API Error:', err);
            }
        };

        if (searchQuery) fetchTrack();
    }, [searchQuery]);

if (!track) return <div className="player-loading">Loading your song...</div>;
if (!track && searchQuery) return <div className="player-loading">Searching for "{searchQuery}"...</div>;
// Don't show anything if no song is set
if (!searchQuery) return null; 

    return (
        <div className="devspace-player-container shadow-sm rounded border overflow-hidden">
            <div className='player-header bg-primary text-white px-2 py-1 small fw-bold'>
               Music Player
            </div>
            <div className="player-body p-2 bg-light">
                <div className='row g-0 align-items-center'>
                    {/*ARTIST INFO*/}
                    <div className="col-7 d-flex align-items-center">
                        <img 
                            src={track.artworkUrl100} 
                            alt="Album Artwork" 
                            className='album-artwork rounded border' 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div className="player-info ms-2 overflow-hidden">
                            <div className="artist-name text-muted text-truncate" style={{ fontSize: '0.8 rem' }}>
                                {track.artistName}
                            </div>
                            <div className="track-name fw-bold text-truncate" style={{ fontSize: '0.9rem' }}>
                                <marquee scrollamount="4">{track.trackName}</marquee>
                            </div>
                            
                        </div>  
                    </div>
                    <div className="audio-player-container col-5">
                        <audio 
                            controls 
                            src={track.previewUrl} 
                            className='custom-audio-element w-100'
                            style={{ height: '30px' }}
                            >
                                Your browser does not support audio.
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevSpacePlayer;
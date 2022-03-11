import React from 'react';
import { useState } from 'react';

export default function GifPlayer(props) {
    const [pause, setPause] = useState(props.pause || false);

    const playerStyles = {
        background: `url(${pause ? props.preview : props.image}) 0 0 no-repeat`,
        pause: pause ? 'animation-play-state' : '',
        minHeight: '200px',
        animationPlayState: pause ? 'paused' : ''
    };
    return (
        <div style={playerStyles} className="gify-container">
            <img className='play-pause-img' alt="Loading" onClick={(e) => setPause(!pause)} src={`images/${pause ? 'play' : 'pause'}.svg`} />
        </div>
    )
}

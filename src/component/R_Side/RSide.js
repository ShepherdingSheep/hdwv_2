import React from 'react';
import './RSide.css';
import RInfo from './Rinfo';

const RSide = () => {
    return(
        <footer className='side_right'>
            <div className='side_right_clock'>
                
            </div>
            <div className='side_right_information'>
                <RInfo />
            </div>
            <div className='side_right_cam'>
                
            </div>
        </footer>
    );
}

export default RSide;
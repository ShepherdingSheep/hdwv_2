import React, { useContext } from 'react';
import { ListContext } from '../Core';
import dicedata from './dicearray.json';
import './DiceShow.css'

const DiceShow = () => {
    const list = useContext(ListContext);

    return(
        <div className='diceshow'>
            <div className='diceshow_img'>
                <img src = {dicedata.dice[list.state.id] ? dicedata.dice[list.state.id].preview : './the_dice/multi_dice/dice_image/none_dice.png'} alt={dicedata.dice[list.state.id] ? dicedata.dice[list.state.id].kr_name : '?'}></img>
            </div>
            <div className='diceshow_desc'>
                <div className='diceshow_name'>{dicedata.dice[list.state.id] ? '행성: '+dicedata.dice[list.state.id].kr_name.substring(0,dicedata.dice[list.state.id].kr_name.length-3) : '행성: 선택하세요...'}</div>
                <div className='diceshow_number'>{dicedata.dice[list.state.id] ? 
                dicedata.dice[list.state.id].number_files.map((number, index) => (
                    <img key={'numberimg_'+index} className = 'dicenumber_number' src={number} alt='Number_here'></img>
                )) :
                dicedata.dice[8].number_files.map((number, index) => (
                    <img key={'numberimg_'+index} className = 'dicenumber_number' src={number} alt='Number_here'></img>
                ))}</div>
            </div>
        </div>
    );
}

export default DiceShow;
import React, { useContext } from 'react';
import { ModeContext } from '../../../App';
import { ListContext } from '../Core';
import dicedata from './dicearray.json';
import * as math from 'mathjs';
import './DiceList.css'

const DiceList = () => {
    const context = useContext(ModeContext);
    const list = useContext(ListContext);

    const diceSelect = (id) => {
        if(id === 8){
            id = math.randomInt(0, 7);
        }
        context.actions.setVarious(dicedata.dice[id].name);
    }

    return(
        <div className='dicelist'>
            {dicedata.dice.map((dice) => (
                <div key={dice.id} className='dice_item' onMouseEnter={() => {list.actions.setId(dice.id);}} onMouseLeave={() => {list.actions.setId(-1);}} onClick={() => diceSelect(dice.id)}>
                    <img src={dice.preview} alt={dice.kr_name}></img>
                </div>
            ))}
        </div>
    );
}

export default DiceList;
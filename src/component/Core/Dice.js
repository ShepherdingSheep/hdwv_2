import React, { useContext } from 'react';
import { ModeContext } from '../../App';
import dicedata from './Various/dicearray.json';
import './Dice.css';
import './Various/multi dice select style.css';

const Dice = (props) => {
    const context = useContext(ModeContext);

    const v_id = () => {switch(context.state.various){
            case 'golden':
                return 0;
            case 'slow':
                return 1;
            case 'fast':
                return 2;
            case 'back':
                return 3;
            case 'joker':
                return 4;
            case 'edge':
                return 5;
            case 'shield':
                return 6;
            case 'dual':
                return 7;
            case 'molu':
                return 8;
            default:
                return 0;
        }
    }

    const dice_div = () => {
        const dice_lego = [];
        const vv_id = v_id();
        for (let i = 0; i < 6; i++){
            var j = i%3;
            dice_lego.push(
                <div key={i} id={'dice_'+i} className='dice_face'>
                    {context.state.various === false ? <img key={'dice_'+i} src={'./the_dice/num_'+j+'.png'} alt="Dice"></img> : <img key={'dice_'+i} src={dicedata.dice[vv_id].files[i]} alt="Dice"></img>}
                </div>
            )
        }
        return dice_lego;
    }

    return (
        <div id="dice" className={[props.rolling ? 'reroll' : context.state.start ? 'start' : 'ready', context.state.various, 'result_'+props.result].join(' ')}>
            {dice_div()}
        </div>
    );
}

export default Dice;
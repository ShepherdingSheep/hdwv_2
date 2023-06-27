import React, { useContext } from 'react';
import { ModeContext } from '../../App';
import './Dice.css';
import './DoubleDice.css';

const NewDoubleDice = (props) => {
    const dice_div = () => {
        const dice_lego = [];
        for (let i = 0; i < 6; i++){
            var j = i%3 === 0 ? 'zero' : i%3;
            dice_lego.push(
                <div key={i} id={'dice_'+i} className='dice_face'>
                    <img src={'./the_dice/num_'+j+'.png'} alt="Dice"></img>
                </div>
            )
        }
        return dice_lego;
    }

    const context = useContext(ModeContext);

    return (
        <>
        <div id="dice_d1" className={[props.rolling ? 'reroll' : context.state.start ? 'start' : 'ready', 'dice_d', 'result_' + props.result_one].join(' ')}>
            {dice_div()}
        </div>
        <div id="dice_d2" className={[props.rolling ? 'reroll' : context.state.start ? 'start' : 'ready', 'dice_d', 'result_' + props.result_two].join(' ')}>
            {dice_div()}
        </div>
        </>
    );
}

export default NewDoubleDice;
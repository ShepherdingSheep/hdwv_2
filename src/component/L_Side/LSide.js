import React, { useContext, useRef, useEffect } from 'react';
import './LSide.css';
import Dicestat from './Dicestat';
import DiceMeter from './DiceMeter';
import { ModeContext } from '../../App';

const LSide = () => {
    const context = useContext(ModeContext);
    const ResultBack = useRef(0);
    const ResultOne = useRef(0);
    const ResultTwo = useRef(0);
    const ResultThree = useRef(0);
    const ResultFour = useRef(0);
    const ResultNugul = useRef(0);

    useEffect(()=>{
        switch(context.state.result){
            case 0:
                ResultBack.current += 1;
                break;
            case 1:
                ResultOne.current += 1;
                break;
            case 2:
                ResultTwo.current += 1;
                break;
            case 3:
                ResultThree.current += 1;
                break;
            case 4:
                ResultFour.current += 1;
                break;
            case 5:
                ResultNugul.current += 1;
                break;
            default:
                break;
        }
    }, [context.state.result]);

    return(
        <header className='side_left'>
            <div className='side_left_chat'>
                
            </div>
            <div className='side_left_dicestat'>
                <Dicestat ResultArray={[ResultBack.current, ResultNugul.current, ResultOne.current, ResultTwo.current, ResultThree.current, ResultFour.current]}/>
                <DiceMeter ResultArray={[ResultBack.current, ResultNugul.current, ResultOne.current, ResultTwo.current, ResultThree.current, ResultFour.current]}/>
            </div>
            <div className='side_left_logo'>
                <img src="./img/logo.png" alt="리듬마블" />
            </div>
        </header>
    );
}

export default LSide;
import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import './Core.css';
import DiceNoon from './Dicenoon'
import Dice from './Dice'
import DoubleDice from './DoubleDice'
import Menu from './Menu'
import DiceList from './Various/DiceList'
import DiceShow from './Various/DiceShow'
import RInfo from './Rinfo';
import * as math from 'mathjs';
import { ModeContext } from '../../App';
import DiceMeter from './DiceMeter';
import DiceStat from './Dicestat';

export const ListContext = createContext({
    state : {
        id: 0
    },
    actions : {
        setId : () => {}
    }
})

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing, audio]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, [audio]);
  
    return [playing, toggle];
};  

const ListManager = ({children}) => {
    const [id, setId] = useState(false);
  
    const value = {
      state: { id },
      actions: { setId }
    }
  
    return(
      <ListContext.Provider value={value}>
        {children}
      </ListContext.Provider>
    );
  }

const Core = () => {
    const [isRoll, setRoll] = useState(false);
    const [diceResult, setResult] = useState(null);
    const [doubleResult, setDoubleResult] = useState('?');
    const [variousResult, setVResult] = useState('?');
    const [diceLog, setLog] = useState([]);
    const [m1confirm, setConfirm] = useState(true);
    const [playing_a, toggle_a] = useAudio('./audio/rolling.wav');
    const [playing_b, toggle_b] = useAudio('./audio/rolling_done.wav');
    const [playing_c, toggle_c] = useAudio('./audio/bonk.mp3');
    const [meter, setMeter] = useState(2.0);
    const context = useContext(ModeContext);

    const ResultBack = useRef(0);
    const ResultOne = useRef(0);
    const ResultTwo = useRef(0);
    const ResultThree = useRef(0);
    const ResultFour = useRef(0);
    const ResultNugul = useRef(0);

    const meterUpdateHandler = (newMeter) => {
        setMeter(newMeter);
    }

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


    const roll = (e) => {
        toggle_a();
        let lotto;
        const nugul = math.pickRandom([true, false]);
        e.preventDefault();
        setRoll(true);
        setConfirm(false);
        do{lotto = math.randomInt(0, 5);}while(lotto === diceLog[diceLog.length-1]);
        if(lotto === 0 && nugul === true){lotto = 5};
        if(context.state.start){
            context.actions.setStart(false);
            lotto = math.randomInt(1, 5);
            setResult(lotto);
        }
        if(context.state.double){
            lotto = math.randomInt(0, 5);
            setDoubleResult(lotto);
            lotto = math.randomInt(0, 5);
            setResult(lotto);
        }
        if(context.state.various === 'golden' || context.state.various === 'magic' || context.state.various === 'dual'){
            lotto = math.randomInt(0, 4);
            setVResult(lotto);
        }else if(context.state.various !== false){
            lotto = math.randomInt(0, 5);
            setVResult(lotto);
        }
        if(context.state.various === 'shield'){
            lotto = math.randomInt(0, 4);
            setVResult(lotto);
        }
        if(context.state.double === false && context.state.various === false){
            setResult(lotto);
            setLog([...diceLog, lotto]);
            context.actions.setResult(lotto);
        }
    }

    useEffect(() => {
        if(isRoll === true){
            setTimeout(() => {if(context.state.result !== 5){context.actions.setResult(-1);setConfirm(true);}setRoll(false);toggle_b();}, 2000);
            if(context.state.result === 5){
                setTimeout(() => {context.actions.setResult(-1); toggle_c(); setConfirm(true);}, 3000);
            }
        }
    }, [isRoll, context.actions, toggle_b, toggle_c, context.state]);

    if(context.state.visible === true){
        return(
            <article className='core'>
                <div className='core_messagebox'>
                    <RInfo />
                </div>
                <div className='core_meter'>
                <DiceStat ResultArray={[ResultBack.current, ResultNugul.current, ResultOne.current, ResultTwo.current, ResultThree.current, ResultFour.current]} />
                <DiceMeter ResultArray={[ResultBack.current, ResultNugul.current, ResultOne.current, ResultTwo.current, ResultThree.current, ResultFour.current]} upMeter={meterUpdateHandler} />
                </div>
                <div className='core_button'>
                    <Menu />
                </div>
            </article>
        );
    }else if(context.state.various !== true){
        return(
            <article className='core'>
                <div className='core_messagebox'>
                    <RInfo />
                </div>
                <div className={['core_dice', meter > 2.3 ? 'blue_dice' : meter < 1.9 ? 'red_dice' : 'yellow_dice'].join(' ')} onClick={isRoll ? undefined : roll}>
                    {context.state.start ? <Dice rolling={isRoll} result={diceResult} meter={meter}/> : context.state.double ? <DoubleDice rolling={isRoll} result_one={diceResult} result_two={doubleResult}/> : context.state.various !== false ? <Dice rolling={isRoll} various={context.state.various} result={variousResult} meter={meter} /> : <Dice rolling={isRoll} result={diceResult} meter={meter} />}
                </div>
                <div className='core_status'>
                    {context.state.various !== false ? <DiceNoon result={variousResult} doubleresult={doubleResult} delayed={isRoll} m1delayed={m1confirm} various={context.state.various} double={context.state.double} meter={meter} /> : <DiceNoon result={diceResult} doubleresult={doubleResult} delayed={isRoll} m1delayed={m1confirm} various={context.state.various} double={context.state.double} meter={meter} />}
                </div>
                <div className='core_status'>
                    {context.state.various !== false ? <DiceNoon result={variousResult} doubleresult={doubleResult} delayed={isRoll} m1delayed={m1confirm} various={context.state.various} double={context.state.double} meter={meter} /> : <DiceNoon result={diceResult} doubleresult={doubleResult} delayed={isRoll} m1delayed={m1confirm} various={context.state.various} double={context.state.double} meter={meter} />}
                </div>
                <div className='core_button'>
                    <Menu />
                </div>
                <div className='hidden_meter'>
                    <DiceMeter ResultArray={[ResultBack.current, ResultNugul.current, ResultOne.current, ResultTwo.current, ResultThree.current, ResultFour.current]} upMeter={meterUpdateHandler} />
                </div>
            </article>
        );
    } else {
        return(
            <ListManager>
                <article className='core'>
                    <div className='core_messagebox'>
                        <RInfo />
                    </div>
                    <div className='core_status'>
                        <DiceShow />
                    </div>
                    <div className='core_dicelist'>
                        <DiceList />
                    </div>
                    <div className='core_button'>
                        <Menu />
                    </div>
                </article>
            </ListManager>
        );
    }
}

export default Core;
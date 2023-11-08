import React, { useState, useEffect } from 'react';
import dicedata from './Various/dicearray.json';
import './Dicenoon.css';

const DiceNoon = (props) => {
    const [sign_number, setSign] = useState('?')
    const [sign_text, setText] = useState('?')
    const [id, setId] = useState(0)
    const [double_number, setDNumber] = useState('?')

    useEffect(() => {
        setSign(props.delayed ? '?' : props.result === 0 ? -1 : props.result === 5 && props.m1delayed === false ? '-1' : props.result === 5 && props.m1delayed === true ? '+1' : props.result);
        if(props.various !== false){
            switch(props.various){
                case 'odd':
                    setId(0);
                    break;
                case 'even':
                    setId(1);
                    break;
                case 'golden':
                    setId(2);
                    break;
                case 'magic':
                    setId(3);
                    break;
                case 'slow':
                    setId(4);
                    break;
                case 'fast':
                    setId(5);
                    break;
                case 'back':
                    setId(6);
                    break;
                case 'joker':
                    setId(7);
                    break;
                case 'edge':
                    setId(8);
                    break;
                case 'shield':
                    setId(9);
                    break;
                case 'dual':
                    setId(10);
                    break;
                default:
                    setId(0);
                    break;
            }
            setSign(props.delayed ? '?' : props.result);
            setText(props.delayed ? '?' : dicedata.dice[id].number[props.result]);
        }
        if(props.double){
            setDNumber(props.delayed ? '?' : props.doubleresult === props.result ? '더블' : props.doubleresult === 0 ? -1 : props.doubleresult)
        };
    }, [props.delayed, props.result, props.double, props.doubleresult, props.various, sign_number, id, sign_text, props.m1delayed])

    if(props.double){
        return (
            <div className={['status_bar', props.meter > 2.2 ? 'blue_status' : props.meter < 2.0 ? 'red_status' : 'yellow_status'].join(' ')}>
                {sign_number || '?'}
                &nbsp;&nbsp;
                {double_number || '?'}
            </div>
        );
    } else if(props.various !== false) {
        return (
            <div className={['status_bar', props.meter > 2.2 ? 'blue_status' : props.meter < 2.0 ? 'red_status' : 'yellow_status'].join(' ')}>
                {sign_text || '??'}
            </div>
        );
    } else {
        return (
            <div className={['status_bar', props.meter > 2.2 ? 'blue_status' : props.meter < 2.0 ? 'red_status' : 'yellow_status'].join(' ')}>
                {sign_number || '?'}
            </div>
        );
    }
}

export default DiceNoon;
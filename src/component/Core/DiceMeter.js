import React, { useEffect } from 'react';
import './DiceMeter.css';

const DiceMeter = (props) => {    
    const result_m1 = props.ResultArray[0];
    const result_1 = props.ResultArray[2];
    const result_2 = props.ResultArray[3];
    const result_3 = props.ResultArray[4];
    const result_4 = props.ResultArray[5];
    const dicemeter = Math.round((1*result_1+2*result_2+3*result_3+4*result_4-1*result_m1)/(result_m1+result_1+result_2+result_3+result_4)*100)/100;

    const directionposition = dicemeter*25+25 <= 50 ? Math.floor((dicemeter*25)/2)-37.5 : Math.floor(dicemeter*25)-50;
    let directioncss = {
        left: directionposition+'%'
    }

    useEffect(()=>{props.upMeter(dicemeter); console.log(props.ResultArray);}, [dicemeter, props]);

    return(
        <div>
            <div className='dicestat_meter'>
                <div className='meter_float'>
                    <div className='float_title'>현재 주사위 평균</div>
                    <div className='float_desc'>{dicemeter ? dicemeter : 0.00}</div>
                </div>
                <div className='meter_graph'>
                    <div className='graph_img'></div>
                    <div className='graph_rail'>
                        <span className='graph_direction' style={directioncss}>▲</span>
                    </div>
                </div>
            </div>
            <div className='meter_result'>
                <div className='result_title'>현재 주사위는</div>
                <div className='result_desc'>{dicemeter < 2.0 ? <span className='red_desc'>억까</span> : dicemeter > 2.2 ? <span className='blue_desc'>억빠</span> : <span>정속 주행</span>} 중...</div>
            </div>
        </div>
    );
}

export default DiceMeter;
import React from 'react';
import './Dicestat.css';

const Dicestat = (props) => {

    const stat_index = [-1, '편굴', 1, 2, 3, 4];
    const index_render = () => {
        const index_div = [];
        for (var i = 0; i < stat_index.length; i++){
            index_div.push(<th id={"dice_index"+i} key={i}>{stat_index[i]}</th>)
        }
        return index_div;
    }

    const stat_result = [props.ResultArray[0], props.ResultArray[1], props.ResultArray[2], props.ResultArray[3], props.ResultArray[4], props.ResultArray[5]];
    const stat_render = () => {
        const stat_div = [];
        for (var i = 0; i < stat_result.length; i++){
            stat_div.push(<td id={"dice_stat"+i} key={i}>{stat_result[i]}</td>)
        }
        return stat_div;
    }
    
    return(
        <article>
            <div className='dicestat_hollow'>
            </div>
            <div className='dicestat_title'>
                오늘의 주사위는 누구 편이었는가?
            </div>
            <table className='dicestat_table'>
                <tbody>
                    <tr>{index_render()}</tr>
                    <tr>{stat_render()}</tr>
                </tbody>
            </table>
        </article>
    );
}

export default Dicestat;
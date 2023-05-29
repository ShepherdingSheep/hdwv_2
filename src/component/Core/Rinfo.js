import React from 'react';
import './Rinfo.css';

const RInfo = () => {
    const msg_titles = [
        '선곡 방법', '주의 사항', '황금열쇠 룰렛', '골 브레이크 제도', '전진 주사위 룰', '별명 선곡 주의!'
    ]

    const msg_messages = [
        '!픽 [숫자] [제목] (ex. !픽 1 마치오브피어)', '다음 선곡 까지 쿨타임은 30초, 최대 3곡 선곡 가능', ['황금열쇠 칸을 밟을 때 수행할 미션을', <br key='break_1'/>, '투네이션 후원으로 추가가 가능합니다.'], '한 바퀴가 끝나면 방장 재량으로 휴식시간을 가집니다.', ['첫바퀴 출발 이후 4시간 초과 시,', <br key='break_2'/>, '일반 주사위 대신 전진 주사위를 사용합니다.'], ['별명으로 선곡 시 방장이 납득해야 합니다.', <br key='break_3'/>, '그렇지 못한 경우 방장이 자의적으로 선곡합니다.', <br key='break_4'></br>, '(ex. 느낌 있는 노래 -> 느낌, Feel, The Feeling)']
    ]

    const rinfo_style = 'calc(100%*'+msg_titles.length+')'
    const rinfo_msg_style = 'calc(100%/'+msg_titles.length+')'

    const msg_render = () => {
        const msg_div = [];
        for (let i = 0; i < msg_titles.length; i++){
            msg_div.push(<div className='messagebox_msg' id={i} key={'message_'+i} style={{width: rinfo_msg_style}}>
                <p key={'title_'+i} className='msg_title'>{msg_titles[i]}</p>
                <div key={'descript_'+i} className='msg_desc'>{msg_messages[i]}</div>
            </div>);
        }

        return msg_div
    }

    return(
        <div className='right_information_messagebox'>
            <div className='messagebox_trailer' style={{width: rinfo_style}}>
                {msg_render()}
            </div>
        </div>
    );
}

export default RInfo;
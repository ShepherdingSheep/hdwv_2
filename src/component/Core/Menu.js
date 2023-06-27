import React, { useContext } from 'react';
import { ModeContext } from '../../App';
import './Menu.css';

const ButtonDouble = () => {
    const context = useContext(ModeContext);
    const isDouble = context.state.double;

    const action = () => {
        context.actions.setDouble(isDouble ? false : true);
        context.actions.setStart(false);
        context.actions.setVarious(false);
        context.actions.setVisible(false);
    }

    return(
        <button className='buttoncol' onClick={() => action()}>
            <img src={context.state.double ? './button/single_dice.png' : './button/double_dice.png'} alt='무인도'></img>
            {context.state.double ? '일반' : '더블'} 주사위
        </button>
    );
}

const ButtonNewDouble = () => {
    const context = useContext(ModeContext);
    const isDouble = context.state.double;

    const action = () => {
        context.actions.setDouble(isDouble ? false : true);
        context.actions.setStart(false);
        context.actions.setVarious(context.state.various === 'newtype' ? false : 'newtype');
        context.actions.setVisible(false);
    }

    return(
        <button className='buttoncol' onClick={() => action()}>
            <img src={context.state.double ? './button/single_dice.png' : './button/double_dice.png'} alt='뉴타입'></img>
            {context.state.double ? '일반' : '더블(New)'} 주사위
        </button>
    );
}

const ButtonRefresh = () => {
    const context = useContext(ModeContext);

    const action = () => {
        context.actions.setResult('?');
        context.actions.setDouble(false);
        context.actions.setStart(true);
        context.actions.setVarious(false);
        context.actions.setVisible(false);
    }

    return(
            <button className='buttoncol' onClick={() => action()}>
                <img src='./button/reload.png' alt='초기화'></img>
                주사위 초기화
            </button>
    );
}

const ButtonVarious = () => {
    const context = useContext(ModeContext);

    const action = () => {
        context.actions.setDouble(false);
        context.actions.setStart(false);
        context.actions.setVarious(context.state.various === true ? false : true);
        context.actions.setVisible(false);
    }

    return(
        <button className='buttoncol' onClick={() => action()}>
            <img src='./button/browse_dice.png' alt='황금열쇠'></img>
            특수 주사위
        </button>
    );
}

const ButtonFold = () => {
    const context = useContext(ModeContext);

    const action = () => {
        context.actions.setVisible(context.state.visible === true ? false : true);
    }

    return(
        <button className='buttoncol' onClick={() => action()}>
            <img src='./button/probablity.png' alt='현황'></img>
            주사위 현황
        </button>
    );
}

// const ButtonFold = () => {
//     const context = useContext(ModeContext);

//     return(
//         <button className='buttoncol' onClick={() => context.actions.setVisible(false)}>
//             접기
//         </button>
//     );
// }

const Menu = () => {
    return(
        <div className='button_menubar'>
            <div className='menubar_title'>MENU</div>
            <div className='menubar_buttonrow'>
                <ButtonDouble/>
                <ButtonNewDouble/>
                <ButtonRefresh />
                <ButtonVarious />
                <ButtonFold />
            </div>
        </div>
    );
}

export default Menu;
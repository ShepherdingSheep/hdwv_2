import './App.css';
import LSide from './component/L_Side/LSide';
import Core from './component/Core/Core';
import RSide from './component/R_Side/RSide';
import { createContext, useState } from 'react';

export const ModeContext = createContext({
  state : {double: false, start: true, various: false, visible: true, result: '?'},
  actions : {
    setDouble: () => {},
    setStart: () => {},
    setVarious: () => {},
    setVisible: () => {},
    setResult: () => {}
  }
});

const ModeManager = ({children}) => {
  const [double, setDouble] = useState(false);
  const [start, setStart] = useState(true);
  const [various, setVarious] = useState(false);
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState(-1);

  const value = {
    state: { double, start, various, visible, result },
    actions: { setDouble, setStart, setVarious, setVisible, setResult }
  }

  return(
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

const App = () => {

  return (
    <ModeManager>
      <div className="App">
        <LSide />
        <Core />
        <RSide />
      </div>
    </ModeManager>
  );
}

const { Consumer: ModeConsumer } = ModeContext;
export { ModeManager, ModeConsumer };
export default App;

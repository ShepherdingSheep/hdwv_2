import './App.css';
import Core from './component/Core/Core';
import { createContext, useState } from 'react';

export const ModeContext = createContext({
  state : {double: false, start: true, various: false, visible: false, result: '?'},
  actions : {
    setDouble: () => {},
    setStart: () => {},
    setVarious: () => {},
    setVisible: () => {},
    setResult: () => {}
  }
});

const ModeManager = ({children}) => {
  const [double, setDouble] = useState(true);
  const [start, setStart] = useState(true);
  const [various, setVarious] = useState("newtype");
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
        <Core />
      </div>
    </ModeManager>
  );
}

const { Consumer: ModeConsumer } = ModeContext;
export { ModeManager, ModeConsumer };
export default App;

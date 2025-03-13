// import LogoutCheck from './LogoutCheck'
import { useEffect } from 'react';
import './App.css';
import SessionOut from './SessionOut';

function App() {

  // const preventRefresh = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "data will get lost";
  //   return "data will get lost";
  // };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      sessionStorage.setItem('isClosing', 'true');
      setTimeout(() => {
        sessionStorage.removeItem('isClosing');
      }, 100);
      e.preventDefault();
      e.returnValue = "data will get lost";
      return "Are you sure you want to leave this page..........?";
    };

    const handleUnload = () => {
      if (sessionStorage.getItem('isClosing') === 'true') {
        debugger

      }
    };

    // window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      // window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  return (
    <div className="App">
     <SessionOut />
    </div>
  );
}

export default App;

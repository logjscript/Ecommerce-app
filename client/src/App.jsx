import { useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { ImageProvider } from './components/ImageContext'
import ImageScroller from './components/ImageScroller';
import ProductSection from './components/ProductSection';
import SignIn from './components/SignIn'


export default function App() {
  const [type, setType] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  //Hook up with server, have sign in button show name, connect bag to account
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: ''
  })
  const [canceled, setCanceled] = useState(true);

  function handleClickDashboard(e) {
    setType(e.target.value);
    window.scrollTo(0,0);
  }

  function handleClickScrollBar(id) {
    switch(true) {
      case id < 4: {
        setType('hats');
        break;
      }
      case id >= 4 && id < 8: {
        setType('sweatshirts');
        break;
      }
      case id >= 8 && id < 12: {
        setType('tShirts');
        break;
      }
      case id >= 12 && id < 16: {
        setType('pants');
        break;
      }
      case id >= 16 && id < 20: {
        setType('shoes');
        break;
      }
      default: {
        throw Error('Unknown');
      }
    }
    window.scrollTo(0, 0);
  }

  // let compToDisplay;

  // if()

  return (
    <ImageProvider>
        <Dashboard handleClickDashboard={handleClickDashboard} canceledFunc={() => setCanceled(false)} signedIn={signedIn} username={userInfo.userName} />
        {(!type) ? <HomePage func={handleClickScrollBar} /> : <ProductSection clothingType={type}/>}
        {(signedIn || canceled) ? null : <SignIn signedInFunc={() => setSignedIn(true)} canceledFunc={() => setCanceled(true)} setUserInfo={setUserInfo} userInfo={userInfo} />}
    </ImageProvider>
  )
}


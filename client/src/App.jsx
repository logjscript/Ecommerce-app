import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { ImageProvider } from './components/ImageContext';
import ProductSection from './components/ProductSection';
import SignIn from './components/SignIn';
import Bag from './components/Bag';


export default function App() {
  const [type, setType] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    items: [],
    total: 0,
  })
  const [canceled, setCanceled] = useState(true);

  useEffect(() => {
    if (signedIn) {
      itemToBag();
    }
}, [userInfo.items])

const itemToBag = async () => {
    try {
        const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userInfo})
        });

        if (!response.ok) {
            throw new Error('Data cannot be sent');
        }
    } catch (error) {
        console.error(error);
    }
  }

  let compToDisplay;
    if (!type) {
      compToDisplay = <HomePage setType={setType} />;
    } else if (type === 'bag') {
      compToDisplay = <Bag userInfo={userInfo} setUserInfo={setUserInfo} />;
    } else {
      compToDisplay = <ProductSection clothingType={type} userInfo={userInfo} setUserInfo={setUserInfo} signedIn={signedIn} setCanceled={setCanceled} />;
    }

  return (
    <ImageProvider>
        <Dashboard signedIn={signedIn} userInfo={userInfo} setUserInfo={setUserInfo} setSignedIn={setSignedIn} setCanceled={setCanceled} setType={setType}/>
        {compToDisplay}
        {(signedIn || canceled) ? null : <SignIn signedInFunc={() => setSignedIn(true)} canceledFunc={() => setCanceled(true)} setUserInfo={setUserInfo} userInfo={userInfo} />}
    </ImageProvider>
  )
}


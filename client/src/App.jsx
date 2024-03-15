import { useEffect, useContext } from 'react';
import { ImageProvider } from './components/ImageContext';
import { UserContext } from "./components/UserContext";
import { itemToBag } from './utils';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import ProductSection from './components/ProductSection';
import SignIn from './components/SignIn';
import Bag from './components/Bag';


export default function App() {
    const { itemType, userSignedIn, cancelSignIn, signedInUserInfo } = useContext(UserContext);

    useEffect(() => {
        if (userSignedIn) {
            itemToBag(signedInUserInfo);
        }
    }, [signedInUserInfo?.items, userSignedIn]);

    let compToDisplay;
        if (!itemType) {
            compToDisplay = <HomePage />
        } else if (itemType === 'bag') {
            compToDisplay = <Bag />;
        } else {
            compToDisplay = <ProductSection />;
        }

    return (
        <div data-testid='div' className='flex flex-col justify-center min-h-screen bg-gradient-to-l from-[#A5A5A5] to-gray-100'>
          <ImageProvider>
            <Dashboard />
              {compToDisplay}
              {(userSignedIn || cancelSignIn) ? null : (
                  <SignIn />
              )}
          </ImageProvider>
        </div>
    )
}


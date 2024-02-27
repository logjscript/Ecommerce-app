import { useEffect, useContext } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { ImageProvider } from './components/ImageContext';
import ProductSection from './components/ProductSection';
import SignIn from './components/SignIn';
import Bag from './components/Bag';
import { itemToBag } from './utils';
import { UserContext } from "./components/UserContext";


export default function App() {
    const { type, signedIn, canceled, userInfo } = useContext(UserContext);

    useEffect(() => {
        if (signedIn) {
            itemToBag(userInfo);
        }
    }, [userInfo?.items, signedIn]);

    let compToDisplay;
        if (!type) {
            compToDisplay = <HomePage />
        } else if (type === 'bag') {
            compToDisplay = <Bag />;
        } else {
            compToDisplay = <ProductSection />;
        }

    return (
        <div data-testid='div' className='flex flex-col justify-center min-h-dvh bg-gray-200'>
          <ImageProvider>
            <Dashboard />
              {compToDisplay}
              {(signedIn || canceled) ? null : (
                  <SignIn />
              )}
          </ImageProvider>
        </div>
    )
}


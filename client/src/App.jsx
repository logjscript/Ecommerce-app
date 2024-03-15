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
        <div data-testid='div' className='flex flex-col justify-center min-h-screen bg-gradient-to-l from-[#A5A5A5] to-gray-100'>
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


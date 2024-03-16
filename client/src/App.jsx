import { useEffect, useContext } from 'react';
import { ItemProvider } from './components/ItemContext';
import { UserContext } from "./components/UserContext";
import { addItemsToBag } from './utils';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import ProductSection from './components/ProductSection';
import SignIn from './components/ShowLogIn';
import Bag from './components/Bag';


const App = () => {
    const { itemType, userSignedIn, cancelSignIn, signedInUserInfo } = useContext(UserContext);
    let componentToDisplay;

    useEffect(() => {
        if (userSignedIn) {
            addItemsToBag(signedInUserInfo);
        }
    }, [signedInUserInfo?.items, userSignedIn]);

    if (!itemType) {
        componentToDisplay = <HomePage />
    } else if (itemType === 'bag') {
        componentToDisplay = <Bag />;
    } else {
        componentToDisplay = <ProductSection />;
    }

    return (
        <div data-testid='div' className='flex flex-col justify-center min-h-screen bg-gradient-to-l from-[#A5A5A5] to-gray-100'>
          <ItemProvider>
            <Dashboard />
              {componentToDisplay}
              
              {(userSignedIn || cancelSignIn) ? null : (
                  <SignIn />
              )}
          </ItemProvider>
        </div>
    )
}

export default App;


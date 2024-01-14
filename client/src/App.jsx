import { useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { ImageProvider } from './components/ImageContext'
import ImageScroller from './components/ImageScroller';
import ProductSection from './components/ProductSection';


export default function App() {
  const [type, setType] = useState(null)

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

  return (
    <ImageProvider>
        <Dashboard />
        {(!type) ? <HomePage func={handleClickScrollBar} /> : <ProductSection clothingType={type}/>}
    </ImageProvider>
  )
}


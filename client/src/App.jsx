import { useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { ImageProvider } from './components/ImageContext'
import ImageScroller from './components/ImageScroller';


export default function App() {
  
  return (
    <ImageProvider>
        <Dashboard />
        <HomePage />
        <ImageScroller />
    </ImageProvider>
  )
}


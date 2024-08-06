import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoreProvider,Store } from './context/Store';
import ShowList from './components/Showlist';
import PodcastDetails from './components/Podcast';
import NowPlayingBar from './components/Nowplaying';
const App = () => {
  
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/podcast/:slug" element={<PodcastDetails />} />
          </Routes>
          
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
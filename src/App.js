import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './context/Store';
import ShowList from './components/Showlist';
import PodcastDetails from './components/Podcast';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
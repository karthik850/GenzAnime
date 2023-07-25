import logo from './logo.svg';
import './App.css';
import MyNavbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import SearchAnime from './components/SearchAnime';
import Animecard from './components/AnimeCard';
import CharacterCard from './components/CharacterCard';
import Pictures from './components/Pictures';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path="/" element={<Home url='https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true' value='home' />} />
          <Route path="/page/:id" element={<Home url='https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true' value='home'/>} />
          <Route path="/popular/page/:id" element={<Home url='https://api.jikan.moe/v4/top/anime' value='popular'/>} />
          <Route path="/upcomming/page/:id" element={<Home url='https://api.jikan.moe/v4/seasons/upcoming' value='upcomming'/>} />
          <Route path="/season/page/:id" element={<Home url='https://api.jikan.moe/v4/seasons/now' value='season'/>} />
          <Route path="/search/:name/page/:id" element={<SearchAnime url='https://api.jikan.moe/v4/anime?q=' value='search'/>} />
          <Route path="/anime/:id" element={<Animecard url='https://api.jikan.moe/v4/anime/' />} />
          <Route path="/character/:id" element={<CharacterCard url='https://api.jikan.moe/v4/characters/' />} />
          <Route path="/character/:id/pictures" element={<Pictures url='https://api.jikan.moe/v4/characters/' />} />
          <Route path="/anime/:id/pictures" element={<Pictures url='https://api.jikan.moe/v4/anime/' />} />
          <Route path="/nsfw/page/:id"element={<Home url='https://api.jikan.moe/v4/top/anime?filter=airing&rating=Rx' value='nsfw'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

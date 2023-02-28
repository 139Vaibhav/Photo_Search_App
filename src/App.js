import React, { useState } from 'react';
import './App.css';
import Mountain from "./images/mountain.jpg";

import SearchPhotos from "./SearchPhotos";

function App() {

  return (
    <div className='App'>
      <div className='container'>
        <img src={Mountain} className="header-img" />
        <h1 className='title'>Download High Quality Images by creators</h1>
        <SearchPhotos />
      </div>
    </div>
  );
}

export default App;

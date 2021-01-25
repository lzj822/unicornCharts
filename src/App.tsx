import React from 'react';
import './App.css';
import Pie from './Pie/Pie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pie series={[50, 50, 50, 70, 564]} chart={{}} radius={100}></Pie>
      </header>
    </div>
  );
}

export default App;
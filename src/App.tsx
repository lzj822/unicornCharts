import React from 'react';
import './App.css';
import Pie from './Pie/Pie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pie series={[60, 100, 54, 180, 564]} chart={{ width: 120, height: 120 }} radius={50}></Pie>
      </header>
    </div>
  );
}

export default App;
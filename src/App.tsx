import React from 'react';
import './App.css';
import Pie from './Pie/Pie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pie series={[10, 50, 80, 30]} chart={{}}></Pie>
      </header>
    </div>
  );
}

export default App;
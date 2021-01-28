import React from 'react';
import './App.css';
import { Dount } from './Donut/Donut';
import Pie from './Pie/Pie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dount series={[60, 100, 54, 180, 564]} chart={{ width: 150, height: 150 }} outerRadius={50} innerRadius={30}></Dount>
        <Pie series={[60, 100, 54, 180, 564]} chart={{ width: 150, height: 150 }} radius={50}></Pie>
      </header>
    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import CrudOperation from './crud/crudOperation';
import Component1 from './Component/yourComponent';
import { Component } from 'react';
import Team from './assignment/team';
import Teams from './assignment/teams';
import CTeam from './assignment/chatgpt';

function App() {
  return (
    <div className="App">
    {/* <CrudOperation/> */}
     {/* <Team/>*/}
     {/*
   <CTeam/> */}
   <Teams/>
    </div>
  );
} 

export default App;

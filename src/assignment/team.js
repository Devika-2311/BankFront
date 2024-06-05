import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling.css';
function Team() {
    const [team, setTeam] = useState([]);
    const [name, setName] = useState('');
    const [captain, setcaptain] = useState('');
    const [exChampion, setexChampion] = useState('');
    const [coach, setCoach] = useState('');
    const [editingTeam, setEditingTeam] = useState(null);

    
      useEffect(()=>{
        fetch("http://localhost:8888/team/read").then(data=>data.json())
        .then(data=>setTeam(data));
        console.log(team);
        
    },[]);

      // Create a new post
    const createTeam = () => {
        axios.post('http://localhost:8888/team/add', {
          name,
          captain,
          exChampion,
          coach
        })
        .then(response => {
          setTeam([...team, response.data]);
          setName('');
          setcaptain('');
          setexChampion('');
          setCoach('');
        })
        .catch(error => {
          console.error('There was an error creating the team!', error);
        });
      };
    

       // Update a post
    const updateTeam = (team) => {
        axios.put(`http://localhost:8888/team/update${team.id}`, team)
          .then(response => {
            setTeam(team.map(p => (p.id === team.id ? response.data : p)));
            setEditingTeam(null);
            setName('');
          setcaptain('');
          setexChampion('');
          setCoach('');
          })
          .catch(error => {
            console.error('There was an error updating the team!', error);
          });
      };
    
    
// Delete a post
const deleteTeam = (id) => {
    axios.delete(`http://localhost:8888/team/delete${id}`)
      .then(() => {
        setTeam(team.filter(team => team.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the team!', error);
      });
  };

  const handleEditClick = (team) => {
    setEditingTeam(team);
    setName(team.name);
    setcaptain(team.captain);
    setexChampion(team.exChampion);
    setCoach(team.coach);
  };

  const handleSaveClick = () => {
    if (editingTeam) {
      updateTeam({ ...editingTeam, name, captain, exChampion, coach });
    } else {
      createTeam();
    }
  };
    
return (
    <div className="App" >
      <h1>React Axios CRUD  Team Example</h1>
      <div class="container">
      <div class="inputs">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/>
        <br/>
        <input
          type="text"
          placeholder="captain"
          value={captain}
          onChange={(e) => setcaptain(e.target.value)}
        />
        <br/>
        <br/>
         <input
          type="text"
          placeholder="exChampion"
          value={exChampion}
          onChange={(e) => setexChampion(e.target.value)}
        /><br/>
        <br/>
         <input
          type="text"
          placeholder="coach"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
        /><br/>
        <br/>
        <button onClick={handleSaveClick}>
          {editingTeam ? 'Update Team' : 'Add Team'}
        </button>
      </div>
      <div class="data">
      <ul>
        {team.map(t => (
          <li key={t.id}>
            <h2>{t.name}</h2>
            <h2>{t.captain}</h2>
            <h2>{t.exChampion}</h2>
            <h2>{t.coach}</h2>
            <button onClick={() => handleEditClick(t)}>Edit</button>
            <button onClick={() => deleteTeam(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
}

export default Team;
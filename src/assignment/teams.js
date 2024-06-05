import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling.css';

function Teams() {
    const [teams, setTeam] = useState([]);
    const [name, setName] = useState('');
    const [captain, setcaptain] = useState('');
    const [exChampion, setexChampion] = useState('');
    const [coach, setCoach] = useState('');
    const [editingTeam, setEditingTeam] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8888/team/read")
          .then(response => {
            setTeam(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the posts!', error);
          });
      }, []);

    const createTeam = () => {
        axios.post('http://localhost:8888/team/add', {
            name,
            captain,
            exChampion,
            coach
        })
        .then(response => {
            setTeam([...teams, response.data]);
           
        })
        .catch(error => {
            console.error('There was an error creating the team!', error);
        });
    };

    const updateTeam = (team) => {
        axios.put(`http://localhost:8888/team/update/${team.id}`, team)
            .then(response => {
                setTeam(teams.map(t => (t.id === team.id ? response.data : t)));
               
            })
            .catch(error => {
                console.error('There was an error updating the team!', error);
            });
    };

    const deleteTeam = (id) => {
        axios.delete(`http://localhost:8888/team/delete/${id}`)
            .then(() => {
                setTeam(teams.filter(team => team.id !== id));
                
            })
            .catch(error => {
                console.error('There was an error deleting the team!', error);
            });
    };

    const handleEditClick = (team) => {
        // setEditMode(true); // Enable edit mode
        setEditingTeam(team);
        setName(team.name);
        setcaptain(team.captain);
        setexChampion(team.exChampion);
        setCoach(team.coach);
        setSelectedTeam(null); // Deselect team
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team); // Set the selected team
        setName(team.name);
        setcaptain(team.captain);
        setexChampion(team.exChampion);
        setCoach(team.coach);
        setEditingTeam(null); // Disable editing
        // setEditMode(false); // Disable edit mode
    };

    const handleSaveClick = () => {
        if (editingTeam) {
          
            updateTeam({ ...editingTeam, name, captain, exChampion, coach });
        } else {
           
            createTeam();
        }
    };

    // const resetForm = () => {
    //     setName('');
    //     setcaptain('');
    //     setexChampion('');
    //     setCoach('');
    //     setEditingTeam(null);
    //     setEditMode(false); // Disable edit mode when form is reset
    // };
    const [nameError, setNameError] = useState('');
    const [captainError, setCaptainError] = useState('');
    const [exChampionError, setExChampionError] = useState('');
    const [coachError, setCoachError] = useState('');

    // Function to handle input change and validation
    const handleInputChange = (e, setter, setError) => {
        const value = e.target.value;
        setter(value);

        // Perform validation
        if (value.trim() === '') {
            setError('This field is required');
        } else {
            setError('');
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform additional validation if needed before submitting the form
        // For example, checking if all fields are filled correctly

        // If any validation error exists, prevent form submission
        if (nameError || captainError || exChampionError || coachError) {
            return;
        }

        // Proceed with saving the team data
        handleSaveClick();
    };
    
    return (
        <div className="App">
            <h1>React Axios CRUD Team Example</h1>
            <div className="container">
                <div className="inputs">
                    <h2>{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => handleInputChange(e, setName, setNameError)}
                        required
                    />
                    {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Captain"
                        value={captain}
                        onChange={(e) => handleInputChange(e, setcaptain, setCaptainError)}
                        required
                    />
                    {captainError && <span style={{ color: 'red' }}>{captainError}</span>}
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Ex Champion"
                        value={exChampion}
                        onChange={(e) => handleInputChange(e, setexChampion, setExChampionError)}
                        required
                    />
                    {exChampionError && <span style={{ color: 'red' }}>{exChampionError}</span>}
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Coach"
                        value={coach}
                        onChange={(e) => handleInputChange(e, setCoach, setCoachError)}
                        required
                    />
                    {coachError && <span style={{ color: 'red' }}>{coachError}</span>}
                    <br /><br />
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        {editingTeam ? 'Update Post' : 'Add Post'}
                    </button>
                </div>
                <div className="teams-list">
                    <h2>Teams List</h2>
                    <ul>
                        {teams.map(t => (
                            <li key={t.id} onClick={() => handleTeamClick(t)}>
                                <p>{t.name}</p>
                                <div className="button-group">
                                    <button type="button" className="btn btn-primary" onClick={() => handleEditClick(t)}>Edit</button>
                                    <button type="button" className="btn btn-primary" onClick={() => deleteTeam(t.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Teams;

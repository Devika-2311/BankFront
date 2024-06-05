import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const CTeam = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    captain: '',
    exChampion: '',
    coach: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:8888/team/read');
      setTeams(response.data.teams);
      console.log({teams});
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const addTeam = async () => {
    try {
      await axios.post('http://localhost:8888/team/add', formData);
      fetchTeams();
      setFormData({ name: '', captain: '', exChampion: '', coach: '' });
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const updateTeam = async () => {
    try {
      await axios.put(`http://localhost:8888/team/update/${editId}`, formData);
      fetchTeams();
      setFormData({ name: '', captain: '', exChampion: '', coach: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/team/delete/${id}`);
      fetchTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (team) => {
    setFormData({ ...team });
    setEditId(team.id);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Add Team</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Captain"
        name="captain"
        value={formData.captain}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Ex Champion"
        name="exChampion"
        value={formData.exChampion}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Coach"
        name="coach"
        value={formData.coach}
        onChange={handleInputChange}
      />
      {editId ? (
        <button onClick={updateTeam}>Update</button>
      ) : (
        <button onClick={addTeam}>Save</button>
      )}

      <h2>Teams</h2>
      <ul>
  {teams && teams.length > 0 && teams.map((team) => (
    <li key={team.id}>
      {team.name}
      <button onClick={() => handleEdit(team)}>Edit</button>
      <button onClick={() => deleteTeam(team.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default CTeam;

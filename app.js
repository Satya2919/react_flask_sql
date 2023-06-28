import React, { useState } from 'react';

function App() {
  const [addUserName, setAddUserName] = useState('');
  const [addUserPhoneNumber, setAddUserPhoneNumber] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleAddUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/add_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: addUserName, phone_number: addUserPhoneNumber }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok){
      alert('User added successfully');

      setAddUserName('');
      setAddUserPhoneNumber('');
    }
  };

  const handleSearchUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/search_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: searchUserName }),
    });
    const data = await response.json();
    setSearchResult(data.phone_number || 'User not found');
  };

  return (
    <div>
      <h1>User Management</h1>

      <h2>Add User</h2>
      <label htmlFor="add_user_name">Name:</label>
      <input
        type="text"
        id="add_user_name"
        value={addUserName}
        onChange={(e) => setAddUserName(e.target.value)}
      />
      <br />
      <label htmlFor="add_user_phone_number">Phone Number:</label>
      <input
        type="text"
        id="add_user_phone_number"
        value={addUserPhoneNumber}
        onChange={(e) => setAddUserPhoneNumber(e.target.value)}
      />
      <br />
      <button onClick={handleAddUser}>Add User</button>

      <h2>Search User</h2>
      <label htmlFor="search_user_name">Name:</label>
      <input
        type="text"
        id="search_user_name"
        value={searchUserName}
        onChange={(e) => setSearchUserName(e.target.value)}
      />
      <br />
      <button onClick={handleSearchUser}>Search User</button>

      <h3>Search Result: {searchResult}</h3>
    </div>
  );
}

export default App;

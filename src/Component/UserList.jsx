import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; 
const UsersList = ({ updateUser }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch users from API
  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

 
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));  
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Users List</h2>

      
      <div className="flex flex-wrap justify-center gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 w-72"
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <p className="text-lg font-semibold mb-2">
              {user.first_name} {user.last_name}
            </p>
            <div className="flex space-x-4">
              <Link to={`/edit/${user.id}`}>
                <Button variant="contained" color="primary" size="small">
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => deleteUser(user.id)} 
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-center mt-8 gap-3">
        <Button
          variant="contained"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="mr-4"
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersList;

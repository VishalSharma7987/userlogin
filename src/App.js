import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { useState } from 'react'; 
import Login from './Component/Loginpage';
import UsersList from './Component/UserList';
import EditUser from './Component/Edituser';

function App() {

  const [users, setUsers] = useState([]); 

  
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
    });
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/users" element={<UsersList/>} />
        <Route path="/edit/:id" element={<EditUser updateUser={updateUser}/>} />
      
      </Routes>
    </Router>
  );
}

export default App;

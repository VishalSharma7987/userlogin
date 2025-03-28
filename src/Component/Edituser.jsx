import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditUser = ({ updateUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(`https://reqres.in/api/users/${id}`, user);
      
     
      updateUser(response.data); 
      setLoading(false);
      setSnackbarMessage('User updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true); 
      navigate('/users'); 
    } catch (error) {
      setSnackbarMessage('Error updating user');
      setSnackbarSeverity('error');
      setOpenSnackbar(true); 
      setLoading(false);
      navigate('/users'); 
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle closing of Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Edit User</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </div>
        </form>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose} 
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditUser;

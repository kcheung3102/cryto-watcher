import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import { Login } from '../components/Login/Login';
import { SignUp } from '../components/Login/SignUp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#000',
  color: 'wheat',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};

export const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         
        <Box sx={style}>
        <Tabs value={value} onChange={handleChange} variant='fullWidth' style={{borderRadius: 10}}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {value === 0 && <Login />}
        {value === 1 && <SignUp />}
        </Box>
      </Modal>
    </div>
  );
}


import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export const GoogleButton = () => {
  return <Button variant='contained' startIcon={<GoogleIcon />}>Sign In With Google</Button>
};

import { Box, Button, Container, CssBaseline, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Welcome = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 12, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You are successfully signed in.
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;

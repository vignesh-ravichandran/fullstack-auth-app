import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sorry, the page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

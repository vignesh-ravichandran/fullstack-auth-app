import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/welcome' : '/sign-in'} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

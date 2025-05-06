import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="spinner">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#1976d2"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.75s"
                from="0 25 25"
                to="360 25 25"
              />
            </circle>
          </svg>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }

  return children;
};

export default PrivateRoute;

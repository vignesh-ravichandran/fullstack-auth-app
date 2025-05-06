import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { AUTH_FORM_TYPE } from '../constants/authFormTypes';
import { ROUTES } from '../constants/routes';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) navigate(ROUTES.WELCOME);
  }, [loading, isAuthenticated]);

  return (
    <div className="auth-page">
      <AuthForm type={AUTH_FORM_TYPE.SIGN_UP} />
    </div>
  );
};

export default Signup;

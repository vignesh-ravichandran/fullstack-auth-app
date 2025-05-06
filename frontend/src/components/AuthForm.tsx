import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import PrimaryButton from './PrimaryButton';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const isValidEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      return setError('Invalid email format.');
    }

    if (!isValidPassword(password)) {
      return setError(
        'Password must contain at least 8 characters, including a number, an uppercase letter, and a special character.',
      );
    }

    try {
      setLoading(true);
      if (type === 'sign-in') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err: any) {
      console.error(err);
      const rawError =
        err?.response?.data?.message || err?.response?.data?.error || 'Something went wrong.';
      const parsedError = Array.isArray(rawError) ? rawError.join(', ') : String(rawError);
      setError(parsedError);
      toast.error(parsedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h2>

        {type === 'sign-up' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {typeof error === 'string' && error && <p style={{ color: 'red' }}>{error}</p>}
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'Please wait...' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </PrimaryButton>
        <p>
          {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Link to={type === 'sign-in' ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}>
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </form>
    </>
  );
};

export default AuthForm;

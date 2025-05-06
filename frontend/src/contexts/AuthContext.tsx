import { createContext, useContext, useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/constants/endpoints';
import api from '@/utils/axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import toast from 'react-hot-toast';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get(API_ENDPOINTS.USER);
      const userData = res.data.user || res.data;
      if (!userData?.email) throw new Error('Invalid user data');
      setUser(userData);
    } catch (err) {
      console.error('Fetch user failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await api.post(API_ENDPOINTS.SIGN_IN, { email, password });
      await fetchUser();
      navigate(ROUTES.WELCOME);
    } catch (err: any) {
      console.error('Login failed:', err);
      toast.error(err.response?.data?.message || 'Login failed.');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await api.post(API_ENDPOINTS.SIGN_UP, { name, email, password });
      await fetchUser();
      navigate(ROUTES.WELCOME);
    } catch (err: any) {
      console.error('Signup failed:', err);
      toast.error(err.response?.data?.message || 'Signup failed.');
    }
  };

  const logout = async () => {
    try {
      await api.post(API_ENDPOINTS.SIGN_OUT);
      setUser(null);
      navigate(ROUTES.SIGN_IN);
    } catch (err: any) {
      console.error('Logout failed:', err);
      toast.error(err.response?.data?.message || 'Logout failed.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

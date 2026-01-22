import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const SignIn = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login, API_URL } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/signin`, formData);
      const { token, user } = response.data;

      if (user.role !== role) {
        setError(`Please sign in as a ${role}`);
        setLoading(false);
        return;
      }

      login(token, user);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.error || 'Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={`auth-page ${theme}`}>
      <Header />
      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="auth-button"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <p className="auth-link">
            Don't have an account? <Link to={`/signup/${role}`}>Sign Up</Link>
          </p>

          <p className="auth-link">
            <Link to="/join">← Back to Role Selection</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;

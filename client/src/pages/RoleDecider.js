import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStore, FaHandHoldingHeart, FaUserShield } from 'react-icons/fa';
import Header from '../components/Header';
import './RoleDecider.css';

const RoleDecider = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'donor',
      title: 'Donor',
      icon: <FaStore />,
      description: 'Restaurants, cafes, and individuals who want to donate surplus food',
      color: 'var(--primary-color)'
    },
    {
      id: 'receiver',
      title: 'Receiver',
      icon: <FaHandHoldingHeart />,
      description: 'Individuals, organizations, or communities in need of food',
      color: '#4ECDC4'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: <FaUserShield />,
      description: 'Platform administrators managing the system',
      color: '#6BCB77'
    }
  ];

  const handleRoleClick = (roleId) => {
    navigate(`/signin/${roleId}`);
  };

  return (
    <div className="role-decider-page">
      <Header />
      <div className="role-decider-container">
        <motion.div
          className="role-decider-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Choose Your Role</h1>
          <p>Select the option that best describes you to get started</p>
        </motion.div>

        <div className="role-cards-container">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              className="role-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => handleRoleClick(role.id)}
            >
              <div className="role-icon" style={{ color: role.color }}>
                {role.icon}
              </div>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
              <motion.button
                className="role-button"
                style={{ background: role.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue as {role.title}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleDecider;

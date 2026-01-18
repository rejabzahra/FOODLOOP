import React from 'react';
import { FaPizzaSlice, FaIceCream, FaHamburger, FaCoffee } from 'react-icons/fa';
import { GiHotMeal, GiKnifeFork } from 'react-icons/gi';
import './LoadingScreen.css';

// replace apple with a hot-meal (soup) icon; center will show static fork+knife
const icons = [FaPizzaSlice, FaHamburger, FaIceCream, GiHotMeal, FaCoffee];

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-wrap" aria-hidden="true">
          <div className="logo-orbit" aria-hidden="true">
            {icons.map((Icon, i) => (
              <div
                className="orbit-item"
                key={i}
                style={{ '--i': i, '--count': icons.length }}
                aria-hidden="true"
              >
                <Icon />
              </div>
            ))}
          </div>
          <div className="logo-center" aria-hidden="true">
            <GiKnifeFork className="center-utensil" />
          </div>
        </div>

        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text">FOODLOOP</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaUsers, FaCity, FaStar } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const heroControls = useAnimation();

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
  }, [heroInView, heroControls]);

  const handleJoinClick = () => {
    navigate('/join');
  };

  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content"
          initial="hidden"
          animate={heroControls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1 }
            },
            hidden: {
              opacity: 0,
              y: 50
            }
          }}
        >
          <h1 className="hero-title">
            {/* Base layer (accessible) plus animated slice layers on top. */}
            <span className="title-base">FOOD LOOP</span>
            <span className="title-slice slice-1" aria-hidden="true">FOOD LOOP</span>
            <span className="title-slice slice-2" aria-hidden="true">FOOD LOOP</span>
            <span className="title-slice slice-3" aria-hidden="true">FOOD LOOP</span>
          </h1>
          <p className="hero-subtitle">Turning Extra Food into Shared Hope</p>
          <p className="hero-description">
            Because your extra food can become someone’s next meal
          </p>
          <motion.button
            className="join-button"
            onClick={handleJoinClick}
            // Updated boxShadow to match blue/azure palette
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(238,210,27,0.895)" }}
            whileTap={{ scale: 0.95 }}
          >
            Join LOOP ➔
          </motion.button>
        </motion.div>
      </section>

      {/* What Food Loop Does */}
      <Section title="What Our Platform Does">
        <div className="platform-grid">
          <FeatureCard
            icon={<FaHandHoldingHeart />}
            title="Food Donation"
            description="Restaurants and individuals can easily post surplus food donations"
            image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop"
          />
          <FeatureCard
            icon={<FaUsers />}
            title="Community Support"
            description="Volunteers and organizations work together to distribute food"
            image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop"
          />
          <FeatureCard
            icon={<FaHeart />}
            title="Zero Waste"
            description="Every meal finds its way to someone who needs it"
            image="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
          />
        </div>
      </Section>

      {/* How Food Loop Works */}
      <Section title="How Food Loop Works" bgColor="var(--light-bg)">
        <div className="how-it-works">
          <Step
            number="1"
            title="Donor Posts Food"
            description="Donors post available surplus food with details"
            delay={0}
          />
          <Step
            number="2"
            title="Receiver Requests"
            description="Receivers browse and request food donations"
            delay={0.2}
          />
          <Step
            number="3"
            title="Food is Shared"
            description="Donor accepts request and shares contact for pickup"
            delay={0.4}
          />
        </div>
      </Section>

      {/* Impact Counters */}
      <ImpactCounters />

      {/* Message & Rating */}
      <MessageRatingSection />

      <Footer />
    </div>
  );
};

const Section = ({ title, children, bgColor = 'white' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <section ref={ref} className="content-section" style={{ backgroundColor: bgColor }}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
          },
          hidden: {
            opacity: 0,
            y: 50
          }
        }}
      >
        <h2 className="section-title">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, image }) => {
  return (
    <motion.div
      className="feature-card"
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="feature-image">
        <img src={image} alt={title} />
        <div className="feature-icon">{icon}</div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const Step = ({ number, title, description, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="step-card"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const ImpactCounters = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  const [counts, setCounts] = useState({
    meals: 0,
    donors: 0,
    receivers: 0,
    cities: 0
  });

  useEffect(() => {
    if (inView) {
      const targets = { meals: 1250, donors: 156, receivers: 89, cities: 12 };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          meals: Math.floor(targets.meals * progress),
          donors: Math.floor(targets.donors * progress),
          receivers: Math.floor(targets.receivers * progress),
          cities: Math.floor(targets.cities * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, increment);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="impact-section">
      <h2 className="section-title">Our Impact</h2>
      <div className="counters-grid">
        <CounterCard number={counts.meals} label="Meals Served" icon={<FaHeart />} />
        <CounterCard number={counts.donors} label="Donors Joined" icon={<FaHandHoldingHeart />} />
        <CounterCard number={counts.receivers} label="Receivers Helped" icon={<FaUsers />} />
        <CounterCard number={counts.cities} label="Cities Covered" icon={<FaCity />} />
      </div>
    </section>
  );
};

const CounterCard = ({ number, label, icon }) => {
  return (
    <motion.div
      className="counter-card"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="counter-icon">{icon}</div>
      <div className="counter-number">{number.toLocaleString()}+</div>
      <div className="counter-label">{label}</div>
    </motion.div>
  );
};

const MessageRatingSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <section className="message-section">
      <h2 className="section-title">Send a Message to the Creator</h2>
      <div className="message-container">
        <div className="rating-display">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 4 ? 'star filled' : 'star'} />
            ))}
          </div>
          <div className="rating-value">⭐ 4.5</div>
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {submitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default LandingPage;

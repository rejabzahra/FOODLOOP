import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutUs.css';

const AboutUs = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const foundersRef = useRef(null);
  
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const foundersInView = useInView(foundersRef, { once: true, margin: "-100px" });

  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <motion.section
          className="creators-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="creators-title">Creators</h3>
          <div className="creators-row">
            <div className="creator-card">
              <div className="creator-avatar">
                <img src="E:\Semester 3\SE\project\SEProject\images\founder1.png" alt="Rejab Zahra" />
              </div>
              <div className="creator-name">REJAB ZAHRA</div>
              <div className="creator-role">Frontend Developer</div>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">
                <img src="E:\Semester 3\SE\project\SEProject\images\founder2.png" alt="Umme Habiba" />
              </div>
              <div className="creator-name">UMME HABIBA</div>
              <div className="creator-role">Backend Developer</div>
            </div>
    
          </div>
        </motion.section>
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About FOODLOOP</h1>
          <p className="hero-description">
            We are on a mission to eliminate food waste while feeding those in need,
            creating a sustainable circular economy that benefits everyone.
          </p>
        </motion.div>

        <motion.section
          ref={missionRef}
          className="about-section mission"
          initial={{ opacity: 0, x: -50 }}
          animate={missionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Mission</h2>
          <p>
            FOOD LOOP is dedicated to connecting surplus food with people who need it most.
            We believe that no food should go to waste when there are communities in need.
            Our platform makes it easy for restaurants, cafes, and individuals to donate
            excess food while ensuring it reaches those who can benefit from it.
          </p>
          <p>
            Through technology and community collaboration, we're building a zero-waste
            food economy where every meal matters and every donation creates a positive
            impact on both the environment and society.
          </p>
        </motion.section>

        <motion.section
          ref={visionRef}
          className="about-section vision"
          initial={{ opacity: 0, x: 50 }}
          animate={visionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Vision</h2>
          <p>
            We envision a world where food waste is eliminated, hunger is eradicated,
            and communities come together to support one another. FOOD LOOP aims to be
            the leading platform that facilitates this transformation, creating a network
            of donors, receivers, and volunteers working together for a common cause.
          </p>
          <p>
            Our goal is to expand to every city, connecting local food businesses with
            local communities, fostering relationships, and building a more sustainable
            and caring society.
          </p>
        </motion.section>

        <section className="how-it-works-detailed">
          <h2>How It Works</h2>
          <div className="steps-detailed">
            <div className="step-detailed">
              <div className="step-number-large">1</div>
              <h3>Donors Post Surplus Food</h3>
              <p>
                Restaurants, cafes, bakeries, and individuals can easily post their
                surplus food donations through our platform. They provide details about
                the food type, quantity, pickup location, and expiry date.
              </p>
            </div>
            <div className="step-detailed">
              <div className="step-number-large">2</div>
              <h3>Receivers Browse & Request</h3>
              <p>
                People in need or organizations can browse available donations, search
                by location and category, and send requests for the food they need.
                The platform is free and accessible to everyone.
              </p>
            </div>
            <div className="step-detailed">
              <div className="step-number-large">3</div>
              <h3>Connection & Distribution</h3>
              <p>
                Donors review requests and accept those they can fulfill. Once accepted,
                contact information is shared, and the receiver can arrange pickup.
                After completion, donations are marked as served.
              </p>
            </div>
          </div>
        </section>

        <motion.section
          ref={foundersRef}
          className="founders-section"
          initial={{ opacity: 0, y: 50 }}
          animate={foundersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Meet the Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-image">
                <img
                  src="E:\Semester 3\SE\project\SEProject\images\founder1.png"
                  alt="Founder 1"
                />
              </div>
              <h3>REJAB ZAHRA</h3>
              <p className="founder-role">Frontend Developer</p>
              <p className="founder-bio">
                Rejab Zahra is a Frontend Developer skilled in designing 
                and building user interfaces that are responsive, intuitive, 
                and visually appealing. She focuses on creating seamless user 
                experiences and translating design concepts into interactive, 
                functional web applications.
              </p>
            </div>
            <div className="founder-card">
              <div className="founder-image">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                  alt="Founder 2"
                />
              </div>
              <h3>UMME HABIBA</h3>
              <p className="founder-role">Backend Developer</p>
              <p className="founder-bio">
                Umme Habiba is a Backend Developer experienced in developing 
                server-side logic and managing databases. She specializes in 
                building secure and efficient APIs, ensuring smooth communication 
                between servers and clients, and maintaining reliable application 
                performance.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

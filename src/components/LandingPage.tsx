import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Mirror Hours</h1>
          <p className="hero-tagline">
            The intelligent way to schedule across time zones
          </p>
          <p className="hero-description">
            Stop the timezone guessing game. Mirror Hours finds perfect meeting times 
            that respect everyone's schedule and work preferences automatically.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="cta-primary"
              onClick={() => navigate('/scheduler')}
            >
              🚀 Start Scheduling Smartly
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="mockup-container">
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="mockup-content">
                <div className="timezone-visual">
                  <div className="timezone-line ny">New York 🗽 9:00 AM</div>
                  <div className="timezone-line london">London 🏰 2:00 PM</div>
                  <div className="timezone-line tokyo">Tokyo 🗼 11:00 PM</div>
                  <div className="overlap-highlight">✨ Perfect Overlap: 10:00 AM EST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Teams Love Mirror Hours</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Smart Overlap Detection</h3>
            <p>Automatically finds the best meeting times across any number of time zones</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Fairness Engine</h3>
            <p>Rotates inconvenient time slots so no one person bears the burden</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Calendar Integration</h3>
            <p>One-click sync with Google Calendar, Outlook, and Apple Calendar</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Empathy</h3>
            <p>Respects individual work styles and preferences</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Add your team members and their time zones</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>Set work preferences (early bird, night owl, etc.)</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>Get intelligent overlap suggestions</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <p>Sync to calendar with one click</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Ready to End Time Zone Chaos?</h2>
        <button 
          className="cta-primary large"
          onClick={() => navigate('/scheduler')}
        >
          Start Your First Smart Schedule
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
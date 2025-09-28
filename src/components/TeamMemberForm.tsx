import React, { useState } from 'react';
import { TeamMember } from '../types';
import { getTimezoneOptions } from '../utils/timezones';
import './TeamMemberForm.css';

interface TeamMemberFormProps {
  onAddMember: (member: TeamMember) => void;
}

const workStyleOptions = [
  { 
    value: 'standard', 
    label: 'Standard', 
    desc: '9AM - 5PM', 
    icon: '🕘'
  },
  { 
    value: 'early_bird', 
    label: 'Early Bird', 
    desc: '7AM - 3PM', 
    icon: '🌅'
  },
  { 
    value: 'night_owl', 
    label: 'Night Owl', 
    desc: '11AM - 7PM', 
    icon: '🌙'
  },
  { 
    value: 'extended', 
    label: 'Extended', 
    desc: '8AM - 6PM', 
    icon: '⏳'
  },
  { 
    value: 'flexible', 
    label: 'Flexible', 
    desc: '6AM - 8PM', 
    icon: '🔄'
  },
  { 
    value: 'custom', 
    label: 'Custom Hours', 
    desc: 'Set your own', 
    icon: '⚙️'
  }
];

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ onAddMember }) => {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [workStyle, setWorkStyle] = useState<'standard' | 'early_bird' | 'night_owl' | 'extended' | 'flexible' | 'custom'>('standard');
  const [customStart, setCustomStart] = useState(9);
  const [customEnd, setCustomEnd] = useState(17);
  const [showCustomHours, setShowCustomHours] = useState(false);
  
  const timezoneOptions = getTimezoneOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && timezone) {
      const memberData: TeamMember = {
        id: Date.now().toString(),
        name,
        timezone,
        workStyle
      };
      
      if (workStyle === 'custom') {
        memberData.customHours = {
          start: customStart,
          end: customEnd
        };
      }
      
      onAddMember(memberData);
      setName('');
      setTimezone('');
      setWorkStyle('standard');
      setShowCustomHours(false);
    }
  };

  return (
    <div className="enhanced-form">
      <div className="form-header">
        <div className="form-icon">👥</div>
        <div>
          <h4>Add Team Member</h4>
          <p>Enter details to include in scheduling</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-group">
          <label className="input-label">
            <span className="label-icon">👤</span>
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g., Alex Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            <span className="label-icon">🌍</span>
            Time Zone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select a time zone</option>
            {timezoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">
            <span className="label-icon">💼</span>
            Work Style
          </label>
          <div className="workstyle-grid">
            {workStyleOptions.map((style) => (
              <div
                key={style.value}
                className={`workstyle-card ${workStyle === style.value ? 'active' : ''}`}
                onClick={() => {
                  setWorkStyle(style.value as any);
                  setShowCustomHours(style.value === 'custom');
                  if (style.value === 'custom') {
                    setCustomStart(9);
                    setCustomEnd(17);
                  }
                }}
              >
                <div className="workstyle-icon">{style.icon}</div>
                <div className="workstyle-info">
                  <div className="workstyle-label">{style.label}</div>
                  <div className="workstyle-desc">{style.desc}</div>
                </div>
                <div className="workstyle-check">✓</div>
              </div>
            ))}
          </div>
        </div>

        {showCustomHours && (
          <div className="custom-hours">
            <div className="custom-hours-header">
              <span className="label-icon">🕒</span>
              Set Custom Working Hours
            </div>
            <div className="time-range">
              <div className="time-input">
                <label>Start Time</label>
                <select 
                  value={customStart} 
                  onChange={(e) => setCustomStart(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 6).map(hour => (
                    <option key={hour} value={hour}>
                      {hour}:00 AM
                    </option>
                  ))}
                </select>
              </div>
              <div className="time-separator">to</div>
              <div className="time-input">
                <label>End Time</label>
                <select 
                  value={customEnd} 
                  onChange={(e) => setCustomEnd(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 12).map(hour => (
                    <option key={hour} value={hour}>
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 PM`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">
          <span className="btn-icon">➕</span>
          Add Team Member
          <span className="btn-shimmer"></span>
        </button>
      </form>
    </div>
  );
};

export default TeamMemberForm;
import React from 'react';
import { TeamMember } from '../types';
import './TeamList.css';

interface Props {
  members: TeamMember[];
}

const TeamList: React.FC<Props> = ({ members }) => {
  const getWorkStyleIcon = (style: string) => {
    switch(style) {
      case 'early_bird': return '🌅';
      case 'night_owl': return '🌙';
      default: return '🕘';
    }
  };

  const getWorkStyleLabel = (style: string) => {
    switch(style) {
      case 'early_bird': return 'Early Bird';
      case 'night_owl': return 'Night Owl';
      default: return 'Standard';
    }
  };

  if (members.length === 0) {
    return (
      <div className="team-list empty">
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>No team members added yet</p>
          <small>Add your first team member above</small>
        </div>
      </div>
    );
  }

  return (
    <div className="team-list">
      <div className="team-header">
        <span className="team-count">Team ({members.length})</span>
      </div>
      
      <div className="members-grid">
        {members.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-header">
              <span className="member-avatar">👤</span>
              <div className="member-info">
                <span className="member-name">{member.name}</span>
                <span className="member-timezone">{member.timezone.split('/').pop()}</span>
              </div>
            </div>
            
            <div className="member-details">
              <div className="workstyle-badge">
                <span className="workstyle-icon">{getWorkStyleIcon(member.workStyle)}</span>
                <span>{getWorkStyleLabel(member.workStyle)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
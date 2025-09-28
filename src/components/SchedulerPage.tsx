import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TeamMemberForm from './TeamMemberForm';
import TeamList from './TeamList';
import OverlapResults from './OverlapResults';
import ScheduleVisualization from './ScheduleVisualization';
import FairnessRecommendation from './FairnessRecomendation';
import CalendarIntegration from './CalendarIntegration';
import { TeamMember } from '../types';
import { calculateOverlap } from '../utils/overlapCalculator';
import './SchedulerPage.css';

const SchedulerPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleAddMember = (member: TeamMember) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const overlaps = useMemo(() => calculateOverlap(teamMembers), [teamMembers]);

  return (
    <div className="scheduler-page">
      {/* Header */}
      <header className="scheduler-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>📅 Mirror Hours Scheduler</h1>
        <p>Find the perfect meeting times for your distributed team</p>
      </header>

      <div className="scheduler-container">
        {/* Left Sidebar - Team Management */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>👥 Add Team Members</h3>
            <TeamMemberForm onAddMember={handleAddMember} />
          </div>
          
          <div className="sidebar-section">
            <h3>Your Team ({teamMembers.length})</h3>
            <TeamList members={teamMembers} />
          </div>
        </div>

        {/* Main Content - Scheduling */}
        <div className="main-content">
          {teamMembers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>Add your team members to get started</h3>
              <p>Start by adding your first team member above to see available meeting times.</p>
            </div>
          ) : (
            <>
              {/* Overlap Results */}
              <div className="content-section">
                <OverlapResults overlaps={overlaps} members={teamMembers} />
              </div>

              {/* Visualization */}
              <div className="content-section">
                <ScheduleVisualization members={teamMembers} overlaps={overlaps} />
              </div>

              {/* Fairness Recommendations */}
              <div className="content-section">
                <FairnessRecommendation 
                  slots={overlaps} 
                  members={teamMembers} 
                  onSlotSelect={setSelectedSlot}
                />
              </div>

              {/* Calendar Integration */}
              {selectedSlot && (
                <div className="content-section">
                  <CalendarIntegration slot={selectedSlot} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulerPage;
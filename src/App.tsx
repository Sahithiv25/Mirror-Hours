import React, { useState, useMemo } from 'react';
import TeamMemberForm from './components/TeamMemberForm';
import TeamList from './components/TeamList';
import OverlapResults from './components/OverlapResults';
import ScheduleVisualization from './components/ScheduleVisualization';
import FairnessRecommendation from './components/FairnessRecomendation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SchedulerPage from './components/SchedulerPage';
import { TeamMember } from './types';
import { calculateOverlap } from './utils/overlapCalculator';
import './App.css';

const App: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleAddMember = (member: TeamMember) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const overlaps = useMemo(() => calculateOverlap(teamMembers), [teamMembers]);

  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scheduler" element={<SchedulerPage />} />
        </Routes>
      </div>
    </Router>
      {/* <h1>Mirror Hours</h1>
      <TeamMemberForm onAddMember={handleAddMember} />
      <TeamList members={teamMembers} />
      
      <OverlapResults overlaps={overlaps} members={teamMembers} />
      <ScheduleVisualization members={teamMembers} overlaps={overlaps} />
      
      <FairnessRecommendation 
        slots={overlaps} 
        members={teamMembers} 
        onSlotSelect={setSelectedSlot}
      />

      {selectedSlot && (
  <div className="selected-slot" style={{
    background: '#d4edda',
    padding: '1.5rem',
    borderRadius: '8px',
    margin: '1rem 0',
    borderLeft: '4px solid #28a745'
  }}>
    <h3>✅ Empathetic Slot Selected!</h3>
    <p><strong>Time:</strong> {selectedSlot.start.getUTCHours()}:00 UTC</p>
    <p><strong>Empathy Assignment:</strong> {selectedSlot.assignedTo}</p>
    <p><strong>Reason:</strong> {selectedSlot.empathyReason}</p>
    <p><strong>Participants:</strong> {selectedSlot.participants.join(', ')}</p>
    <p><strong>Inconvenience Score:</strong> {selectedSlot.inconvenienceScore}/10</p>
    <small>Fairness balance has been updated above</small>
  </div>
)}
       */}
      {/* Debug JSON output */}
      {/* <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        <h3>Team Data (JSON):</h3>
        <pre>{JSON.stringify(teamMembers, null, 2)}</pre>
        
        <h3>Overlaps (JSON):</h3>
        <pre>{JSON.stringify(overlaps, null, 2)}</pre>
      </div> */}
    </div>

    
  );
};

export default App;
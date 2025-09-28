import React, { useState } from 'react';
import { fairnessEngine } from '../utils/fairnessEngine';

interface Props {
  slots: any[];
  members: any[];
  onSlotSelect: (slot: any) => void;
}

const FairnessRecommendation: React.FC<Props> = ({ slots, members, onSlotSelect }) => {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  
  if (slots.length === 0 || members.length < 2) return null;

  // Score all slots and sort by inconvenience
  const scoredSlots = slots.map(slot => ({
    ...slot,
    inconvenienceScore: fairnessEngine.calculateInconvenienceScore(slot, members)
  })).sort((a, b) => a.inconvenienceScore - b.inconvenienceScore);

  const report = fairnessEngine.getFairnessReport();

  const handleSlotSelect = (index: number) => {
    setSelectedSlotIndex(index);
  };

  const handleUseSlot = () => {
    const selectedSlot = scoredSlots[selectedSlotIndex];
    
    // Find who would be most empathetic to take this slot
    const empathyAssignment = fairnessEngine.getEmpatheticAssignment(selectedSlot, members);
    
    fairnessEngine.recordMeeting(selectedSlot, empathyAssignment.assignedTo);
    onSlotSelect({
      ...selectedSlot,
      assignedTo: empathyAssignment.assignedTo,
      empathyReason: empathyAssignment.reason
    });
  };

  const getEmpathyImpact = (slot: any) => {
    return fairnessEngine.getEmpathyImpact(slot, members, report);
  };

  return (
    <div className="fairness-recommendation">
      <h2>🏆 Choose Your Meeting Time</h2>
      <p>Select a slot to see its empathy impact on the team</p>
      
      <div className="slot-options">
        {scoredSlots.slice(0, 5).map((slot, index) => (
          <div 
            key={index}
            className={`slot-option ${selectedSlotIndex === index ? 'selected' : ''}`}
            onClick={() => handleSlotSelect(index)}
          >
            <div className="slot-time">
              <strong>{slot.start.getUTCHours()}:00 - {slot.end.getUTCHours()}:00 UTC</strong>
            </div>
            <div className="slot-details">
              <span className="participants">{slot.participants.join(', ')}</span>
              <span className="score">Inconvenience: {slot.inconvenienceScore}/10</span>
            </div>
            {selectedSlotIndex === index && (
              <div className="empathy-impact">
                {getEmpathyImpact(slot).map((impact, i) => (
                  <div key={i} className={`impact ${impact.type}`}>
                    {impact.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="selected-slot-actions">
        <button onClick={handleUseSlot} className="use-slot-btn">
          ✅ Use Selected Slot & Update Fairness Balance
        </button>
      </div>

      {report.length > 0 && (
        <div className="fairness-report">
          <h3>📊 Current Fairness Balance</h3>
          {report.map(record => (
            <div key={record.memberName} className="member-balance">
              <span className="member-name">{record.memberName}</span>
              <span className="points">{record.inconveniencePoints} points</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FairnessRecommendation;
import React from 'react';
import { format } from 'date-fns';

interface Props {
  overlaps: any[];
  members: any[];
}

const OverlapResults: React.FC<Props> = ({ overlaps, members }) => {
  const getDateDisplay = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d');
  };

  if (members.length < 2) {
    return <div>Add at least 2 team members to see overlaps</div>;
  }

  const daysToCheck = 7; // This should match the value in calculateOverlap

  return (
    <div className="overlap-results">
      <h2>Available Overlap Windows</h2>
      
      {overlaps.length > 0 ? (
        <>
          <div className="search-status">
            <span className="status-badge success">
              ✅ Found overlaps for {getDateDisplay(overlaps[0].date)}
            </span>
            <span className="search-info">
              (Searched {daysToCheck} days ahead)
            </span>
          </div>
          {/* <div className="overlap-slots">
            {overlaps.map((slot, index) => (
              <div key={index} className="time-slot">
                <strong>
                  {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')} UTC
                </strong>
                <div>Available: {slot.participants.join(', ')}</div>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <div className="search-status">
          <span className="status-badge warning">
            ⚠️ No overlaps found in next {daysToCheck} days
          </span>
        </div>
      )}
    </div>
  );
};

export default OverlapResults;
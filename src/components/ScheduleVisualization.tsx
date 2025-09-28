import React from 'react';
import { format, toZonedTime } from 'date-fns-tz';

interface Props {
  members: any[];
  overlaps: any[];
}

const ScheduleVisualization: React.FC<Props> = ({ members, overlaps }) => {
  if (members.length === 0) return null;

  const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const today = new Date();

  // Helper to check if an hour is in overlap
  const isHourInOverlap = (hour: number, memberName: string) => {
    return overlaps.some(overlap => {
      const overlapHour = overlap.start.getUTCHours();
      return overlapHour === hour && overlap.participants.includes(memberName);
    });
  };

  // Helper to check if hour is in working hours (9-5 local)
  const isWorkingHour = (hour: number, timezone: string) => {
    const zonedHour = toZonedTime(
      new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 0, 0),
      timezone
    ).getHours();
    
    return zonedHour >= 9 && zonedHour < 17; // 9 AM to 5 PM local
  };

  return (
    <div className="visualization">
      <h2>Schedule Heatmap</h2>
      <div className="timeline-container">
        <div className="hours-header">
          <div className="member-label">Team Member / Hour (UTC)</div>
          {hours.map(hour => (
            <div key={hour} className="hour-label">{hour}:00</div>
          ))}
        </div>
        
        {members.map(member => (
          <div key={member.id} className="member-row">
            <div className="member-info">
              <strong>{member.name}</strong>
              <br />
              <small>{member.timezone}</small>
            </div>
            {hours.map(hour => {
              let cellClass = 'time-cell';
              
              if (isHourInOverlap(hour, member.name)) {
                cellClass += ' overlap-hour';
              } else if (isWorkingHour(hour, member.timezone)) {
                cellClass += ' working-hour';
              } else {
                cellClass += ' non-working-hour';
              }

              return (
                <div 
                  key={hour} 
                  className={cellClass}
                  title={`${hour}:00 UTC - ${member.name}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="color-box overlap-hour"></div>
          <span>Overlap (All members available)</span>
        </div>
        <div className="legend-item">
          <div className="color-box working-hour"></div>
          <span>Working hours (individual)</span>
        </div>
        <div className="legend-item">
          <div className="color-box non-working-hour"></div>
          <span>Outside working hours</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisualization;
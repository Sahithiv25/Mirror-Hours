import React from 'react';

interface Props {
  slot: any;
}

const CalendarIntegration: React.FC<Props> = ({ slot }) => {
  const createGoogleCalendarLink = () => {
    const startTime = slot.start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
    const endTime = slot.end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
    
    const details = `Meeting with: ${slot.participants.join(', ')}`;
    const location = 'Zoom/Teams';
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}%2F${endTime}&text=Team+Meeting&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const downloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${slot.start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}Z`,
      `DTEND:${slot.end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}Z`,
      'SUMMARY:Team Meeting',
      `DESCRIPTION:Meeting with: ${slot.participants.join(', ')}`,
      'LOCATION:Zoom/Teams',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meeting.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calendar-integration">
      <h3>📅 Add to Calendar</h3>
      <div className="calendar-options">
        <a 
          href={createGoogleCalendarLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="calendar-btn google"
        >
          <span>📊</span>
          Add to Google Calendar
        </a>
        
        <button onClick={downloadICS} className="calendar-btn outlook">
          <span>📧</span>
          Download .ICS File
        </button>
        
        <button className="calendar-btn apple">
          <span>📧</span>
          Add to Apple Calendar
        </button>
      </div>
      
      <div className="meeting-details">
        <h4>Meeting Details</h4>
        <p><strong>Time:</strong> {slot.start.toUTCString()}</p>
        <p><strong>Duration:</strong> 1 hour</p>
        <p><strong>Participants:</strong> {slot.participants.join(', ')}</p>
        {slot.assignedTo && <p><strong>Organizer:</strong> {slot.assignedTo}</p>}
      </div>
    </div>
  );
};

export default CalendarIntegration;
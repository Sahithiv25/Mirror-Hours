import { toZonedTime, fromZonedTime } from 'date-fns-tz';

interface TimeSlot {
  start: Date;
  end: Date;
  participants: string[];
  date: Date;
}

export const calculateOverlap = (members: any[], daysToCheck: number = 7) => {
  if (members.length < 2) return [];

  const overlaps: TimeSlot[] = [];
  const today = new Date();

  // Check multiple days
  for (let dayOffset = 0; dayOffset < daysToCheck; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    // Convert each member's working hours to UTC for this day
    const utcSlots = members.map(member => {
      // Get working hours based on work style
      const { startHour, endHour } = getWorkingHours(member);
      
      const localStart = new Date(year, month, day, startHour, 0, 0);
      const localEnd = new Date(year, month, day, endHour, 0, 0);

      const utcStart = fromZonedTime(localStart, member.timezone);
      const utcEnd = fromZonedTime(localEnd, member.timezone);

      return {
        memberName: member.name,
        timezone: member.timezone,
        utcStart,
        utcEnd,
        localStart,
        localEnd
      };
    });

    // Find overlapping windows for this day
    for (let hour = 0; hour < 24; hour++) {
      const slotStart = new Date(year, month, day, hour, 0, 0);
      const slotEnd = new Date(year, month, day, hour + 1, 0, 0);
      
      const availableMembers = utcSlots.filter(slot => 
        slotStart >= slot.utcStart && slotEnd <= slot.utcEnd
      );

      if (availableMembers.length >= 2) {
        overlaps.push({
          start: slotStart,
          end: slotEnd,
          participants: availableMembers.map(m => m.memberName),
          date: currentDate
        });
      }
    }

    // If we found overlaps for this day, we can stop searching
    if (overlaps.length > 0) {
      break;
    }
  }

  return overlaps;
};

// Helper function to get working hours based on work style
const getWorkingHours = (member: any): { startHour: number; endHour: number } => {
  if (member.workStyle === 'custom' && member.customHours) {
    return member.customHours;
  }
  
  switch (member.workStyle) {
    case 'early_bird':
      return { startHour: 7, endHour: 15 };
    case 'night_owl':
      return { startHour: 11, endHour: 19 };
    case 'extended':
      return { startHour: 8, endHour: 18 };
    case 'flexible':
      return { startHour: 6, endHour: 20 };
    default: // standard
      return { startHour: 9, endHour: 17 };
  }
};
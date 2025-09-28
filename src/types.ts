export interface TeamMember {
  id: string;
  name: string;
  timezone: string;
  workStyle: 'standard' | 'early_bird' | 'night_owl' | 'extended' | 'flexible' | 'custom';
  customHours?: {
    start: number;
    end: number;
  };
}

export interface MeetingSlot {
  start: Date;
  end: Date;
  participants: string[];
  date: Date;
}
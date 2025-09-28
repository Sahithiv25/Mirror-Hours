interface TimezoneOption {
  value: string;
  label: string;
}

export const getTimezoneOptions = (): TimezoneOption[] => {
  // Use a fixed list of common timezones for now
  const timezones = [
    'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'America/Denver',
    'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Europe/Moscow',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Kolkata',
    'Australia/Sydney', 'Pacific/Auckland'
  ];
  
  return timezones.map((tz: string) => ({
    value: tz,
    label: tz
  }));
};
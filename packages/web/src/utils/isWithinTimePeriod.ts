const isWithinTimePeriod = (startTimeStr: string, endTimeStr: string): boolean => {
  // Parse the start and end times
  const [startHour, startMinute] = startTimeStr.split(':').map(Number);
  const [endHour, endMinute] = endTimeStr.split(':').map(Number);

  // Get the current local time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Create date objects for comparison
  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  const currentTime = new Date();
  currentTime.setHours(currentHour, currentMinute, 0, 0);

  // Check if the current time is within the start and end times
  return currentTime >= startTime && currentTime <= endTime;
}

export default isWithinTimePeriod;

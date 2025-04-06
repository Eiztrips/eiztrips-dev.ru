import { useState, useEffect } from 'react';

export interface DateTimeInfo {
  currentDateTime: Date;
  timeOfDay: 'morning' | 'day' | 'evening' | 'night';
  season: 'winter' | 'spring' | 'summer' | 'autumn';
}

export const useDateTime = (): DateTimeInfo => {
  const [dateTimeInfo, setDateTimeInfo] = useState<DateTimeInfo>({
    currentDateTime: new Date(),
    timeOfDay: 'day',
    season: 'winter'
  });
  
  useEffect(() => {
    const updateTimeAndSeason = () => {
      const now = new Date();
      
      const hours = now.getHours();
      let timeOfDay: DateTimeInfo['timeOfDay'] = 'day';
      
      if (hours >= 5 && hours < 12) {
        timeOfDay = 'morning';
      } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'day';
      } else if (hours >= 18 && hours < 23) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }
      
      const month = now.getMonth();
      let season: DateTimeInfo['season'] = 'winter';
      
      if (month >= 11 || month <= 1) {
        season = 'winter';
      } else if (month >= 2 && month <= 4) {
        season = 'spring';
      } else if (month >= 5 && month <= 7) {
        season = 'summer';
      } else {
        season = 'autumn';
      }
      
      setDateTimeInfo({
        currentDateTime: now,
        timeOfDay,
        season
      });
    };
    
    updateTimeAndSeason();
    const timer = setInterval(updateTimeAndSeason, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return dateTimeInfo;
};

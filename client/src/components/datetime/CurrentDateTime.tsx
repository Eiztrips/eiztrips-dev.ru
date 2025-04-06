import { useDateTime } from '../../hooks/useDateTime';

function CurrentDateTime() {
  const { currentDateTime, timeOfDay, season } = useDateTime();

  const getTimeIcon = () => {
    switch(timeOfDay) {
      case 'morning': return 'fi-rr-sunrise';
      case 'day': return 'fi-rr-sun';
      case 'evening': return 'fi-rr-sunset';
      case 'night': return 'fi-rr-moon-stars';
      default: return 'fi-rr-time-past';
    }
  };
  
  const getSeasonIcon = () => {
    switch(season) {
      case 'winter': return 'fi-rr-snowflake';
      case 'spring': return 'fi-rr-flower-tulip';
      case 'summer': return 'fi-rr-umbrella-beach';
      case 'autumn': return 'fi-rr-leaf';
      default: return '';
    }
  };
  
  const getGreeting = () => {
    switch(timeOfDay) {
      case 'morning': return ' Good morning! ';
      case 'day': return ' Good afternoon! ';
      case 'evening': return ' Good evening! ';
      case 'night': return ' Good night! ';
      default: return ' Hello! ';
    }
  };

  return (
    <div className={`current-datetime ${timeOfDay} ${season}`}>
      <div className="time-greeting">
        <i className={`${getTimeIcon()} time-icon`}></i>
        <span className="greeting">{getGreeting()}</span>
        <i className={`${getSeasonIcon()} season-icon`}></i>
      </div>
      <div className="date-time-value">
        {currentDateTime.toLocaleString()}
      </div>
    </div>
  );
}

export default CurrentDateTime;

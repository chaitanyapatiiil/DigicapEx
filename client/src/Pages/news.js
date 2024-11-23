import React, { useEffect } from 'react';

const CombinedTradingViewWidgets = () => {
  useEffect(() => {
    // Load the Timeline widget
    const timelineContainer = document.querySelector('.tradingview-timeline-container');
    if (timelineContainer && !timelineContainer.querySelector('script')) {
      const timelineScript = document.createElement('script');
      timelineScript.type = 'text/javascript';
      timelineScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      timelineScript.async = true;
      timelineScript.innerHTML = JSON.stringify({
        feedMode: 'all_symbols',
        isTransparent: false,
        displayMode: 'regular',
        width: 400,
        height: 550,
        colorTheme: 'light',
        locale: 'en',
      });
      timelineContainer.appendChild(timelineScript);
    }

    // Load the Events widget
    const eventsContainer = document.querySelector('.tradingview-events-container');
    if (eventsContainer && !eventsContainer.querySelector('script')) {
      const eventsScript = document.createElement('script');
      eventsScript.type = 'text/javascript';
      eventsScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
      eventsScript.async = true;
      eventsScript.innerHTML = JSON.stringify({
        colorTheme: 'light',
        isTransparent: false,
        width: 400,
        height: 550,
        locale: 'en',
        importanceFilter: '-1,0,1',
        countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
      });
      eventsContainer.appendChild(eventsScript);
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Timeline Widget */}
      <div className="tradingview-timeline-container" style={styles.widget}></div>

      {/* Events Widget */}
      <div className="tradingview-events-container" style={styles.widget}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    flexWrap: 'wrap',
    minHeight: '100vh', // Ensure container takes full screen height
  },
  widget: {
    width: '400px',
    height: '550px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default CombinedTradingViewWidgets;

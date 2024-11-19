import React from 'react';

const TradingViewWidget = ({ symbol = 'BTCUSD' }) => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: '100%',
        height: '500',
        symbol: symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview-widget',
      });
    };
    document.body.appendChild(script);
    return () => {
      // Cleanup when component unmounts
      document.body.removeChild(script);
    };
  }, [symbol]);

  return (
    <div
      id="tradingview-widget"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        margin: 'auto',
      }}
    />
  );
};

export default TradingViewWidget;

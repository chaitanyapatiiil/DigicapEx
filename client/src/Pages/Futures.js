import React, { useEffect } from 'react';

const TradingViewMarketQuotesWidget = () => {
  useEffect(() => {
    // Check if the script already exists to prevent duplication
    const existingScript = document.querySelector('#tradingview-market-quotes-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'tradingview-market-quotes-script';
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: 550,
        height: 550,
        symbolsGroups: [
          {
            name: 'Futures',
            originalName: 'Futures',
            symbols: [
              { name: 'BINANCE:BTCUSDT' },
              { name: 'BINANCE:BNBUSDT' },
              { name: 'BINANCE:ETHUSD' },
              { name: 'BINANCE:TRXUSDT' },
              { name: 'BINANCE:XRPUSDT' },
              { name: 'BINANCE:DOGEUSDT' },
              { name: 'BINANCE:ADAUSDT' },
              { name: 'BINANCE:SOLUSDT' },
              { name: 'BINANCE:PEPEUSDT' },
              { name: 'BINANCE:AVAXUSDT' },
            ],
          },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        colorTheme: 'dark',
        locale: 'en',
      });
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={styles.widgetContainer}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener noreferrer"
          target="_blank"
          style={styles.copyrightText}
        >
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
};

const styles = {
  widgetContainer: {
    width: '550px',
    height: '550px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  copyrightText: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#0088cc',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default TradingViewMarketQuotesWidget;

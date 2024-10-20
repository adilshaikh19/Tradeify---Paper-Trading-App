import React, { useState, useEffect, useRef } from "react";

const Stocks = () => {
  const [btcPrice, setBtcPrice] = useState("Loading...");
  const [ethPrice, setEthPrice] = useState("Loading...");
  const ws = useRef(null);

  useEffect(() => {
    // TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
        { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
      ],
      isTransparent: false,
      showSymbolLogo: true,
      colorTheme: "light",
      locale: "en",
    });

    document.querySelector(".tradingview-widget-container__widget").appendChild(script);

    // WebSocket connection
    ws.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade/ethusdt@trade');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.s === 'BTCUSDT') {
        setBtcPrice(parseFloat(data.p).toFixed(2));
      } else if (data.s === 'ETHUSDT') {
        setEthPrice(parseFloat(data.p).toFixed(2));
      }
    };

    return () => {
      document.querySelector(".tradingview-widget-container__widget").innerHTML = '';
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="price-display">
        <p>Bitcoin: <span className="price">${btcPrice}</span></p>
        <p>Ethereum: <span className="price">${ethPrice}</span></p>
      </div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default Stocks;
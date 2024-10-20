import React, { useEffect } from "react";

const fetchMarketQuotes = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "NSE:NIFTY50",
      "width": "100%",
      "colorTheme": "light",  // or 'dark'
      "isTransparent": false,
      "locale": "en",
    });
    document.getElementById("tradingview-widget").appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-widget" />
    </div>
  );
};

export default fetchMarketQuotes;

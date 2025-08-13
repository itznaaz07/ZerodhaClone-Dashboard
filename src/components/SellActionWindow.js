import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

const SellActionWindow = ({ uid, maxQty }) => {
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");

  const handleSellClick = () => {
    const qty = Number(stockQuantity);
    if (!qty || qty < 1) {
      setError("Please enter a valid quantity to sell.");
      return;
    }
    if (qty > maxQty) {
      setError(`You can only sell up to ${maxQty} units!`);
      return;
    }
    axios.post(`${apiUrl}/newOrder`, {
      name: uid,
      qty: qty,
      price: stockPrice,
      mode: "SELL",
    });
    GeneralContext.closeSellWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min={1}
              max={maxQty}
              onChange={e => {
                const val = e.target.value;
                // Allow empty string for clearing
                if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0)) {
                  setStockQuantity(val);
                }
              }}
              value={stockQuantity}
              placeholder="Qty"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>
      {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
      <div className="buttons">
        <span>Margin required ₹0.00</span>
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
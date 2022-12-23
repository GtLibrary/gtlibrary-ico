import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import "../styles/Swap.css";
LoadingOverlay.propTypes = undefined;

function Swap({
  account,
  promiseData,
  presaleStart,
  isEnded,
}) {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0.0);
  const [swap, SetSwap] = useState(true);
  return (
    <div id="swap">
      <div className="swap-content">
        <div className="swap-body flex-column alginCenter">
          <div className="from-container">
            <div className="balance-title font-non-nulshock t-grey2 fs-20">
              <p></p>
              <p>Available: {promiseData["avax_val"]}</p>
            </div>
            <div className="avax-container">
              <input
                className="input-value-section t-grey2 fs-30"
                type="number"
                placeholder="0.0"
                value={0}
                disabled = { (account && !isEnded) ? false: true }
                readOnly={ account ? false: true }
                onChange={(e) => {
                }}
              />
              <div className="max-button-section">
                <button
                  className="max-button"
                  onClick={() => {
                  }}
                >
                  MAX
                </button>
                <div className="avax-section font-non-nulshock t-grey3 fs-25">
                  <img alt="avax" className="avax-img ml-20" src="avax.png" />
                  <p className="avax-letter ml-20">AVAX</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 mb-20 alignCenter">
            <button className="btn btn-swap" onClick={() => {swap ? SetSwap(false): SetSwap(true)}}><img alt="arrow" src="swap.png" className="arrow-img"/></button>
          </div>
          <div className="to-container">
            <div className="available-title font-non-nulshock t-grey2 fs-20">
              <p></p>
              <p>Balance: {promiseData["token_price"]}</p>
            </div>
            <div className="ccoin-container">
              <input
                className="input-value-section t-grey2 fs-30"
                type="number"
                placeholder="0.0"
                value={0}
                readOnly={ (account && !isEnded) ? false: true }
                onChange={(e) => {
                }}
              />
              <div className="ccoin-section font-non-nulshock t-grey3 fs-25">
                <img alt="coin" className="ccoin-img" src="c-coin-small.png" />
                <p className="ccoin-letter ml-20">CC</p>
              </div>
            </div>
          </div>
          <div className="ccoin-price-section font-non-nulshock t-white fs-20">
            <p>Price</p>
            <div className="ccoin-price-title">
              {rate === 0 ? (
                <p>{promiseData["dexCCRate"]} CC per AVAX</p>
              ) : (
                <p>
                  {promiseData["dexXMTSPRate"]}
                  AVAX per CC
                </p>
              )}
              <img
                alt="direction"
                className="two-direction-img ml-5"
                src="two-direction.png"
                onClick={() => {
                  if (rate === 1) setRate(0);
                  else setRate(1);
                }}
              />
            </div>
          </div>
          <div className="buy-sell-btn-area">
            <button className="btn btn-buy-ccoin fs-30">Buy CCoin</button>
            <button className="btn btn-buy-avax fs-30">Buy Avax</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;

import React, { useState, useEffect } from 'react'
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { ProgressBar } from "react-bootstrap";
import BigNumber from "bignumber.js";


const Purchase = ({ promiseData, leftDays, buy_CCOIN }) => {
    const [fromAmount, setFromAmount] = useState(null);
    const [toAmount, setToAmount] = useState(null);
    const [rate, setRate] = useState(0.0);

    const bigAmount = new BigNumber(fromAmount).multipliedBy(10 ** 6).toFixed(4);

    const progress = (sold, total) => {
        if (sold < total) {
            return ((sold * 100) / total);
        } else {
            return 100;
        }
    }

    const clickBuy = async () => {
        let bought = buy_CCOIN(Number(fromAmount));
        if (bought) {
            NotificationManager.success('Bought ccoin tokens');
        }
    }

    return (
        <>
            <div className="">
                <div className="calendar-section">
                    <img alt='calendar' src="calendar.png" />
                    <p className="calendar-title font-non-nulshock fs-20 ml-10">{leftDays()} day(s) left</p>
                </div>
                <div className="progress-section font-non-nulshock t-grey2 fs-20">
                    <div className="progress-title">
                        <p>Progress</p>
                        <p>{promiseData["remain_token"] === undefined && promiseData["sold_token"] == undefined ? "0/0" : Number(promiseData["sold_token"]).toLocaleString()+"/"+(Number(promiseData["remain_token"]) + Number(promiseData["sold_token"])).toLocaleString()}</p>
                    </div>
                    <div className="mt-10">
                        <ProgressBar label={promiseData["remain_token"] === undefined && promiseData["sold_token"] == undefined ? "0%" : (`${progress(Number(promiseData["sold_token"]), (Number(promiseData["remain_token"]) + Number(promiseData["sold_token"])))}%`)} now={promiseData["sold_token"] == undefined && promiseData["remain_token"] == undefined ? 0 : (progress(Number(promiseData["sold_token"]), (Number(promiseData["remain_token"]) + Number(promiseData["sold_token"]))) < 100 ? progress(Number(promiseData["sold_token"]), (Number(promiseData["remain_token"]) + Number(promiseData["sold_token"]))) : 100)} className={progress(Number(promiseData["sold_token"]), Number(promiseData["remain_token"] + promiseData["sold_token"])) < 100 ? "progress1" : "progress2"} />
                    </div>
                </div>
                <div className="from-container">
                    <div className="balance-title font-non-nulshock t-grey2 fs-20">
                        <p>From</p>
                        <p>Available: {promiseData["avax_val"]}</p>
                    </div>
                    <div className="avax-container">
                        <input className="input-value-section t-grey2 fs-30" type="number" placeholder="0.0" value={fromAmount} onChange={(e) => { setToAmount(e.target.value * 4); setFromAmount(e.target.value); }} />
                        <div className="max-button-section">
                            <button className="max-button" onClick={() => {setFromAmount(Number(promiseData["avax_val"])); setToAmount(Number(promiseData["token_price"] * Number(promiseData["avax_val"])));}}>
                                MAX
                            </button>
                            <div className="avax-section font-non-nulshock t-grey3 fs-25">
                                <img alt='avax' className="avax-img ml-20" src="avax.png" />
                                <p className="avax-letter ml-20">AVAX</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 mb-20">
                    <img alt='arrow' src="blue-arrow.png" />
                </div>
                <div className="to-container">
                    <div className="available-title font-non-nulshock t-grey2 fs-20">
                        <p>To</p>
                        <p>Balance: {promiseData["token_price"]}</p>
                    </div>
                    <div className="ccoin-container">
                        <input className="input-value-section t-grey2 fs-30" type="number" placeholder="0.0" value={toAmount} onChange={(e) => { setFromAmount(e.target.value / 4); setToAmount(e.target.value); }} />
                        <div className="ccoin-section font-non-nulshock t-grey3 fs-25">
                            <img alt='coin' className="ccoin-img" src="c-coin-logo.png" />
                            <p className="ccoin-letter ml-20">CC</p>
                        </div>
                    </div>
                </div>
                <div className="ccoin-price-section font-non-nulshock t-grey2 fs-20">
                    <p>Price</p>
                    <div className="ccoin-price-title">
                        {rate === 0 ? <p>{promiseData["token_price"]} CC per AVAX</p> : <p>{1/promiseData["token_price"]} AVAX per CC</p>}
                        <img alt='direction' className="two-direction-img ml-5" src="two-direction.png" onClick={() => {if (rate === 1) setRate(0); else setRate(1);}} />
                    </div>
                </div>
                <div>
                    {fromAmount > promiseData["avax_val"] ? 
                    <button className="insufficient-button font-non-nulshock fs-30">
                        Insufficient balance
                    </button> : (fromAmount <= 0 ? 
                    <button className="amount-button font-non-nulshock fs-30">
                        Enter an amount
                    </button> : (fromAmount < 0.02 ? 
                    <button className="min-price-button font-non-nulshock fs-30">
                        Min. Purchase is 0.02 AVAX
                    </button> : 
                    <button className="big-order-button font-non-nulshock fs-30" onClick={clickBuy}>
                        Complete Order
                    </button> 
                    ))
                    }
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}

export default Purchase;
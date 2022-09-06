import React, { useState, useEffect } from 'react'
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { ProgressBar } from "react-bootstrap";
import BigNumber from "bignumber.js";


const Purchase = ({ promiseData, leftDays, approve_USDC, buy_SBC }) => {
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [rate, setRate] = useState(0);

    const bigAmount = new BigNumber(fromAmount).multipliedBy(10 ** 6).toFixed(4);

    const progress = (sold, total) => {
        if (sold < total) {
            return (sold / total) * 100;
        } else {
            return 100;
        }
    }

    // const createNotification = (type) => {
    //     return () => {
    //         switch (type) {
    //             case 'info':
    //                 NotificationManager.info('Please enter an amount');
    //                 break;
    //             case 'success1':
    //                 NotificationManager.success('Approved USDC tokens');
    //                 break;
    //             case 'success2':
    //                 NotificationManager.success('Purchased SBC tokens');
    //                 break;
    //             case 'warning1':
    //                 NotificationManager.warning('Min purchase price is 250 USDC');
    //                 break;
    //             case 'warning2':
    //                 NotificationManager.warning('Insufficient balance');
    //                 break;
    //             case 'error':
    //                 NotificationManager.error('Error message', 'Click me!', 5000, () => {
    //                 alert('callback');
    //             });
    //             break;
    //         }
    //     };
    // };

    const clickApprove = async () => {
        let approved = await approve_USDC(Number(bigAmount));
        if (approved) {
            NotificationManager.success('Approved USDC tokens');
        }
    }

    const clickBuy = async () => {
        let bought = buy_SBC(Number(bigAmount));
        if (bought) {
            NotificationManager.success('Bought SBC tokens');
        }
    }

    return (
        <>
            <div className="">
                <div className="calendar-section">
                    <img src="calendar.png" />
                    <p className="calendar-title font-non-nulshock fs-20 ml-10">{leftDays()} day(s) left</p>
                </div>
                <div className="progress-section font-non-nulshock t-grey2 fs-20">
                    <div className="progress-title">
                        <p>Progress</p>
                        <p>{promiseData[2] == undefined && promiseData[1] == undefined ? "0/0" : Number(promiseData[2]).toLocaleString()+"/"+Number(promiseData[1]).toLocaleString()}</p>
                    </div>
                    <div className="mt-10">
                        <ProgressBar label={promiseData[2] == undefined && promiseData[1] == undefined ? "0%" : (`${progress(Number(promiseData[2]), Number(promiseData[1]))}%`)} now={promiseData[2] == undefined && promiseData[1] == undefined ? 0 : (progress(Number(promiseData[2]), Number(promiseData[1])) < 100 ? progress(Number(promiseData[2]), Number(promiseData[1])) : 100)} className={progress(Number(promiseData[2]), Number(promiseData[1])) < 100 ? "progress1" : "progress2"} />
                    </div>
                </div>
                <div className="from-container">
                    <div className="balance-title font-non-nulshock t-grey2 fs-20">
                        <p>From</p>
                        <p>Balance: {promiseData[9]}</p>
                    </div>
                    <div className="usdc-container">
                        <input className="input-value-section t-grey2 fs-30" type="number" placeholder="0.0" value={fromAmount > 0 ? fromAmount : ''} onChange={(e) => { setToAmount(e.target.value * 4); setFromAmount(e.target.value); }} />
                        <div className="max-button-section">
                            <button className="max-button" onClick={() => {setFromAmount(Number(promiseData[9])); setToAmount(Number(promiseData[9]) * 4);}}>
                                MAX
                            </button>
                            <div className="usdc-section font-non-nulshock t-grey3 fs-25">
                                <img className="usdc-img ml-20" src="avax.png" />
                                <p className="usdc-letter ml-20">AVAX</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 mb-20">
                    <img src="blue-arrow.png" />
                </div>
                <div className="to-container">
                    <div className="available-title font-non-nulshock t-grey2 fs-20">
                        <p>To</p>
                        <p>Available: {promiseData[5]}</p>
                    </div>
                    <div className="sbc-container">
                        <input className="input-value-section t-grey2 fs-30" type="number" placeholder="0.0" value={toAmount > 0 ? toAmount : ''} onChange={(e) => { setFromAmount(e.target.value / 4); setToAmount(e.target.value); }} />
                        <div className="sbc-section font-non-nulshock t-grey3 fs-25">
                            <img className="sbc-img" src="c-coin-logo.png" />
                            <p className="sbc-letter ml-20">CC</p>
                        </div>
                    </div>
                </div>
                <div className="sbc-price-section font-non-nulshock t-grey2 fs-20">
                    <p>Price</p>
                    <div className="sbc-price-title">
                        {rate == 0 ? <p>80.00 CC per AVAX</p> : <p>0.0125 AVAX per CC</p>}
                        <img className="two-direction-img ml-5" src="two-direction.png" onClick={() => {if (rate == 1) setRate(0); else setRate(1);}} />
                    </div>
                </div>
                <div>
                    {fromAmount > Number(promiseData[9]) ? 
                    <button className="insufficient-button font-non-nulshock fs-30">
                        Insufficient balance
                    </button> : (fromAmount <= 0 ? 
                    <button className="amount-button font-non-nulshock fs-30">
                        Enter an amount
                    </button> : (fromAmount < 250 ? 
                    <button className="min-price-button font-non-nulshock fs-30">
                        Min. Purchase is $250.00 AVAX
                    </button> : (Number(promiseData[10]) >= 250 && Number(promiseData[10]) >= fromAmount ? 
                    <button className="big-order-button font-non-nulshock fs-30" onClick={clickBuy}>
                        Complete Order
                    </button> : 
                    <div>
                        <div className="purchase-button-section mb-27">
                            <button className="approve-button font-non-nulshock fs-29" onClick={clickApprove}>
                                Approve
                            </button>
                            <button className="small-order-button font-non-nulshock fs-29">
                                Complete Order
                            </button>
                        </div>
                        <div className="purchase-shape-section">
                            <div className="red-circle fs-25">1</div>
                            <div className="gradient-stick"></div>
                            <div className="black-circle fs-25">2</div>
                        </div>
                    </div>)))
                    }
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}

export default Purchase;
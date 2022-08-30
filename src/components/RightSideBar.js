import React, { useState, useEffect } from 'react'
import Purchase from './Purchase'
import CountDownDate from './CountDownDate'


const startTime = "";
const endTime = "";
// const startTimeStamp = 1656000000000;
const startTimeStamp = 0;
const endTimeStame = 1656086400000;

const RightSideBar = ({ account, promiseData, presaleStart, isEnded, add_whitelist, approve_USDC, buy_SBC }) => {
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const leftDays = () => {
        const leftDay = (Date.parse(promiseData[4]) - (Date.now() + 3600000)) / 86400000;

        if (leftDay > 0 && leftDay < 30) {
            return leftDay.toFixed(0);
        } else {
            return 0;
        } 
    }

    return (
        <div className="rightsidebar">
            {!presaleStart ? <button className="private-button font-nulshock fs-14">PRIVATE</button> : <button className="live-button font-nulshock fs-14">LIVE</button>}
            
            <div className='flex-column alignCenter marginAuto'>
                {presaleStart && account ? <Purchase promiseData={promiseData} leftDays={leftDays} approve_USDC={approve_USDC} buy_SBC={buy_SBC} /> : <>
                    {!account || (account && promiseData[12]) ? 
                    <>
                        <div className="font-nulshock fs-20">
                            <span className="font-nulshock t-white"><span className="font-nulshock t-gray">Phase #1 {!presaleStart ? <span className="font-nulshock t-gray">starts</span> : <span className="font-nulshock t-gray">ends</span>} at</span> {!presaleStart ? <span className="font-nulshock t-white">{startTime}</span> : <span className="font-nulshock t-white">{promiseData[4]}</span>}</span>
                        </div>
                        <CountDownDate seconds={!presaleStart ? (startTimeStamp - (currentTime + 3600000)) / 1000 : (Date.parse(promiseData[4]) - (currentTime + 3600000)) / 1000} />
                    </> : <div></div>
                    }
                    {!account ? (
                        <>
                            <div className="font-nulshock fs-20">
                                <span className="font-nulshock">Be able to participate in phase #1, please connect your wallet</span>
                            </div>
                        </>) :
                        (<> {!promiseData[12] ? 
                                <div className="whitelist-section" onClick={add_whitelist}>
                                    <p className="font-nulshock fs-25 mb-50"><span className="font-nulshock t-gray fs-25">unfortunately, your wallet address is not on the</span> whitelist<span className="font-nulshock t-gray fs-25"> :(</span></p>
                                    <div id="whitelist-button" className="font-nulshock link marginAuto fs-25">
                                        <img src="whitelist.png" />
                                        <p>Join Whitelist</p>
                                    </div>
                                </div> :
                                <div className="congratulation-section">
                                    <p className="font-nulshock fs-25 mb-40"><span className="font-nulshock t-gray fs-25">Congratulations, Your wallet address is on the</span> whitelist.</p>
                                    <p className="comeback-title font-non-nulshock marginAuto fs-25"><span className="t-gray">Comeback later to purchase SBC when the</span> presale <span className="t-gray">is </span><span className="t-yellow">live</span></p>
                                </div>
                            }
                        </>)
                    }
                </>}
            </div>
        </div>
    )
}

export default RightSideBar;
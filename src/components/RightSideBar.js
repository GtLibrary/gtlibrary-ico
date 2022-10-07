import React, { useState, useEffect } from 'react'
import Purchase from './Purchase'
import CountDownDate from './CountDownDate'


const startTime = "";
const endTime = "";
// const startTimeStamp = 1656000000000;
const startTimeStamp = 0;
const endTimeStame = 1656086400000;

const RightSideBar = ({ account, promiseData, presaleStart, isEnded, approve_AVAX, buy_CCOIN }) => {
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const leftDays = () => {
        const leftDay = (Date.parse(promiseData["end_day"]) - (Date.now() + 3600000)) / 86400000;

        if (leftDay > 0 && leftDay < 30) {
            return leftDay.toFixed(0);
        } else {
            return 0;
        } 
    }

    return (
        <div className="rightsidebar">
            {!presaleStart || isEnded ? <button className="private-button font-nulshock fs-14">PRIVATE</button> : <button className="live-button font-nulshock fs-14">LIVE</button>}
            
            <div className='flex-column alignCenter rightsidebar-content'>
                <Purchase promiseData={promiseData} leftDays={leftDays} buy_CCOIN={buy_CCOIN} isEnded={isEnded} />
                {/* {presaleStart && account ? <Purchase promiseData={promiseData} leftDays={leftDays} approve_AVAX={approve_AVAX} buy_CCOIN={buy_CCOIN} /> : <>
                    {!account || (account && promiseData[12]) ? 
                    <>
                        <div className="font-nulshock fs-20">
                            <span className="font-nulshock t-white"><span className="font-nulshock t-gray">Phase #1 {!presaleStart ? <span className="font-nulshock t-gray">starts</span> : <span className="font-nulshock t-gray">ends</span>} at</span> {!presaleStart ? <span className="font-nulshock t-white">{startTime}</span> : <span className="font-nulshock t-white">{promiseData[4]}</span>}</span>
                        </div>
                        <CountDownDate seconds={!presaleStart ? (startTimeStamp - (currentTime + 3600000)) / 1000 : (Date.parse(promiseData[4]) - (currentTime + 3600000)) / 1000} />
                    </> : <div></div>
                    }
                </>} */}
            </div>
        </div>
    )
}

export default RightSideBar;
import react from "react";


const startTime = "";
const endTime = "";
const tgeTime = "";

const LeftSideBar = ({ account, promiseData, presaleStart, isEnded }) => {
    return (
        <div className="leftsidebar">
            <div className="flex-row mb-30">
                <img src="c-coin-logo.png" width={80} height={80} />
                <div className="flex-column ml-20">
                    <span className="font-nulshock t-gray fs-20 mb-5">PHASE #1</span>
                    <span className="font-nulshock fs-25">ANGEL ROUND</span>
                </div>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">ON SALE</span>
                <span className="font-nulshock mb-5">20,000,000 CC</span>
                <span className=" mb-10 t-gray font-nulshock">2% of total supply</span>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">CC/AVAX</span>
                <span className="font-nulshock mb-5">1 CC = 0.25 AVAX</span>
                <span className=" mb-10 t-gray font-nulshock">1 AVAX = 4 CC</span>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">TERMS</span>
                <div className="pt-10 mb-10 separateText">
                    <span className="t-gray font-nulshock">Phase start:</span>
                    {!presaleStart ? <span>{startTime}</span> : <span>{promiseData[3]}</span>}
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray font-nulshock">Phase end:</span>
                    {!presaleStart ? <span>{endTime}</span> : <span>{promiseData[4]}</span>}
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;
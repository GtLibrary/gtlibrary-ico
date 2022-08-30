import react from "react";


const startTime = "";
const endTime = "";
const tgeTime = "";

const LeftSideBar = ({ account, promiseData, presaleStart, isEnded }) => {
    return (
        <div className="leftsidebar">
            <div className="flex-row mb-30">
                <img src="big-sbc.png" width={60} height={60} />
                <div className="flex-column ml-20">
                    <span className="font-nulshock t-gray fs-20 mb-5">PHASE #1</span>
                    <span className="font-nulshock fs-25">ANGEL ROUND</span>
                </div>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">ON SALE</span>
                <span className="font-nulshock mb-5">20,000,000 SBC</span>
                <span className=" mb-10 t-gray">2% of total supply</span>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">SBC/USDC</span>
                <span className="font-nulshock mb-5">1 USDC = 80 SBC</span>
                <span className=" mb-10 t-gray">1 SBC = $0.0125 USDC</span>
            </div>
            <div className="flex-column bt-1 pt-20">
                <span className="font-nulshock t-blue">TERMS</span>
                <div className="pt-10 mb-10 separateText">
                    <span className="t-gray">Phase start:</span>
                    {!presaleStart ? <span>{startTime}</span> : <span>{promiseData[3]}</span>}
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Phase end:</span>
                    {!presaleStart ? <span>{endTime}</span> : <span>{promiseData[4]}</span>}
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Funds to raise:</span>
                    <span>${promiseData[11]} USDC</span>
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Min. Ticket size:</span>
                    <span>$250 USDC</span>
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">TGE* date:</span>
                    {!presaleStart ? <span>{tgeTime}</span> : <span>{promiseData[7]}</span>}
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">TGE Release:</span>
                    <span>10%</span>
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Cliff:</span>
                    <span>3 hours</span>
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Vesting Period:</span>
                    <span>2 hours</span>
                </div>
                <div className="mb-10 separateText">
                    <span className="t-gray">Vesting Type:</span>
                    <span>MLV** (30% per month)</span>
                </div>
                <br />
                <br />
                <br />

                <div className="mb-10 fs-14">
                    <span className="t-gray">* Token Generation Event</span>
                </div>
                <div className="fs-14">
                    <span className="t-gray">** Monthly Linear Vesting</span>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;
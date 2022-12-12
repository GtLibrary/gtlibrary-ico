import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";
import CountDownDate from "./CountDownDate";

const RightSideBar = ({
  account,
  promiseData,
  presaleStart,
  isEnded,
  approve_AVAX,
  buy_CCOIN,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const leftDays = () => {
    const leftDay =
      (Date.parse(promiseData["end_day"]) - (Date.now())) / 86400000;

    if (leftDay > 0 && leftDay < 30) {
      return Number(leftDay.toFixed(0)) + 1;
    } else {
      return 1;
    }
  };

  return (
    <div className="rightsidebar">
      {!presaleStart || isEnded ? (
        <button className="private-button font-nulshock fs-14">PRIVATE</button>
      ) : (
        <button className="live-button font-nulshock fs-14">LIVE</button>
      )}

      <div className="flex-column alignCenter rightsidebar-content">
        {/* <Purchase promiseData={promiseData} leftDays={leftDays} buy_CCOIN={buy_CCOIN} isEnded={isEnded} /> */}
        {presaleStart && !isEnded ? (
          <Purchase
            promiseData={promiseData}
            leftDays={leftDays}
            approve_AVAX={approve_AVAX}
            buy_CCOIN={buy_CCOIN}
          />
        ) : (
          <>
            {(!presaleStart && !isEnded) ? (
              <>
                <div className="font-nulshock fs-20">
                  <span className="font-nulshock t-white">
                    <span className="font-nulshock">
                      Presale {" "}
                      {!presaleStart ? (
                        <span className="font-nulshock">starts</span>
                      ) : (
                        <span className="font-nulshock">ends</span>
                      )}{" "}
                      at
                    </span>{" "}
                    {!presaleStart ? (
                      <span className="font-nulshock t-white">{promiseData["start_day"]}</span>
                    ) : (
                      <span className="font-nulshock t-white">
                        {promiseData["end_day"]}
                      </span>
                    )}
                  </span>
                </div>
                <CountDownDate
                  seconds={ (Date.parse(promiseData["start_day"]) - (currentTime)) / 1000 }
                />
              </>
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;

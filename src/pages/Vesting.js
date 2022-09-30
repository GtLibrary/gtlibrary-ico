import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

const Vesting = ({ account, promiseData, presaleStart, isEnded, claimCC }) => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [rate, setRate] = useState(0.0);

  // const bigAmount = new BigNumber(fromAmount).multipliedBy(10 ** 6).toFixed(4);

  const progress = (sold, total) => {
    if (sold < total) {
      return ((sold * 100) / total).toFixed(5);
    } else {
      return 100;
    }
  };

  const claimCCoin = async () => {
    await claimCC(Number(fromAmount));
    toast.success("Succesfuly withraw token!", {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setFromAmount(0);
  };

  return (
    <>
      <div className="main-content">
        <div className="container-flex marginAuto card-content">
          <div className="rightsidebar">
            <div className="flex-column alignCenter rightsidebar-content">
              <div className="">
                {/* <div className="calendar-section">
                  <img alt="calendar" src="calendar.png" />
                  <p className="calendar-title font-non-nulshock fs-20 ml-10">
                    Vesting Start Day:{promiseData["vest_starttime"]}
                  </p>
                </div> */}
                <div className="progress-section font-non-nulshock t-grey2 fs-20">
                  <div className="progress-title">
                    <p>Progress</p>
                    <p>
                      {promiseData["vested_token"] === undefined &&
                      promiseData["unlocked_token"] == undefined
                        ? "0/0"
                        : Number(
                            promiseData["unlocked_token"]
                          ).toLocaleString() +
                          "/" +
                          Number(
                            promiseData["vested_token"]
                          ).toLocaleString()}{" "}
                      CC
                    </p>
                  </div>
                  <div className="mt-10">
                    <ProgressBar
                      label={
                        promiseData["vested_token"] === undefined &&
                        promiseData["unlocked_token"] == undefined
                          ? "0%"
                          : `${progress(
                              Number(promiseData["unlocked_token"]),
                              Number(promiseData["vested_token"])
                            )}%`
                      }
                      now={
                        promiseData["unlocked_token"] == undefined &&
                        promiseData["vested_token"] == undefined
                          ? 0
                          : progress(
                              Number(promiseData["unlocked_token"]),
                              Number(promiseData["vested_token"]) +
                                Number(promiseData["unlocked_token"])
                            ) < 100
                          ? progress(
                              Number(promiseData["unlocked_token"]),
                              Number(promiseData["vested_token"])
                            )
                          : 100
                      }
                      className={
                        progress(
                          Number(promiseData["unlocked_token"]),
                          Number(promiseData["vested_token"])
                        ) < 100
                          ? "progress1"
                          : "progress2"
                      }
                    />
                  </div>
                </div>
                <div className="from-container">
                  <div className="balance-title font-non-nulshock t-grey2 fs-20">
                    <p>Withrawable CCoin amount</p>
                  </div>
                  <div className="avax-container">
                    <input
                      className="input-value-section t-grey2 fs-30"
                      type="number"
                      placeholder="0.0"
                      value={!promiseData["withrawable_token"] ? '' : promiseData["withrawable_token"]}
                      readOnly
                    />
                    <div className="max-button-section">
                      <div className="avax-section font-non-nulshock t-grey3 fs-25">
                        <img
                          alt="avax"
                          className="avax-img ml-20"
                          src="c-coin-logo.png"
                        />
                        <p className="avax-letter ml-20">CC</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-20 mb-20">
                  {promiseData["withrawable_token"] <= 0 ? (
                    <button className="insufficient-button font-non-nulshock fs-30">
                      Insufficient balance
                    </button>
                  ) : (
                    <button
                      className="big-order-button font-non-nulshock fs-30"
                      onClick={claimCCoin}
                    >
                      Claim CCoin
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vesting;

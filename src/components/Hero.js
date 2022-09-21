import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../pages/connector";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "../styles/Hero.css";

let isConfirm = false;

const Hero = props => {
  
  const { account, activate, deactivate, error, active, chainId } = useWeb3React();
  const { promiseData } = props;
  
  const handleLogin = async () => {
    //   const { address, status } = await connectWallet();
    //   console.log("address => ", address)
    //   console.log("status  => ", status)
      isConfirm = true
      localStorage.setItem("accountStatus", "1");
      activate(injected)
  }

  const handleLogout = () => {
      isConfirm = false
      localStorage.removeItem("accountStatus")
      deactivate()
  }

  function copyToClipBoard() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            const obj = {
                status: "success",
                address: addressArray[0]
            };
            return obj;
        } catch (err) {
            return {
              address: "",
              status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: "",
        };
    }
}

  useEffect(() => {
    
    //   if(account) {
    //       NotificationManager.success('Successfully Connected to Metamask');
    //   }
    //   else {
    //       NotificationManager.success('Successfully Disconnected');
    //   }

      if (!chainId && isConfirm) {
          const { ethereum } = window;
          (async () => {
              try {
                  await ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [{ chainId: "0xA869" }],
                  });
              } catch (switchError) {
                  if (switchError.code === 4902) {
                      try {
                          await ethereum.request({
                              method: "wallet_addEthereumChain",
                              params: [
                                  {
                                      chainId: "0xA869",
                                      chainName: "Avalanche Testnet C-Chain",
                                      nativeCurrency: {
                                          name: "Avalanche",
                                          symbol: "AVAX",
                                          decimals: 18,
                                      },
                                      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                                      blockExplorerUrls: ["https://testnet.snowtrace.io/"],
                                  },
                              ],
                          });
                      } catch (addError) {
                          console.error(addError);
                      }
                  }
              }
              activate(injected);
          })();
          isConfirm = false;
      }
  }, [account, error, active, chainId, activate ]);


  useEffect(() => {
      if (!active && localStorage.getItem("accountStatus")) {
          activate(injected);
      }
  }, [ active, activate])

  return (
    <>
      <Header account={account} handleLogin={handleLogin} handleLogout={handleLogout} copyToClipBoard={copyToClipBoard} promiseData={promiseData} />
      {/* <NotificationContainer /> */}
    </>
  );
};

export default Hero;
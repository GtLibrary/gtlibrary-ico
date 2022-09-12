import react, { useState, useEffect } from "react";
import usdc_abi from "../utils/USDCabi.json";
import sbc_abi from "../utils/SBCabi.json";
import presale_abi from "../utils/PRESALEabi.json";
import vesting_abi from "../utils/VESTINGabi.json";
import Hero from "../components/Hero";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import "../styles/Home.css";
import "../styles/Hero.css";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connector";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';


const usdc_addr = "0xcE6a7e77Ae1438B606648a64B30A75777320CDd3";
const sbc_addr = "0x7397D02ED21f277031811674Af7Ed7B48D554eD7";
const presale_addr = "0x74BbeB470fCba40ed39dC0EEFe356838EB126B6F";
const vesting_addr = "0xa193b79D21416F41ccC78d75eB7D296F85f9dBFA";
const multiSigAdmin_addr = "0x258E881b148469CAF9477E4Ffb1992556Fef3AD9";
let USDCPortal;
let SBCPortal;
let PresalePortal;
let VestingPortal;

let isConfirm = false;

const Home = () => {
  const { account, activate, deactivate, error, active, chainId } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [presaleStart, setPresaleStart] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [promiseData, setPromiseData] = useState([]);
  
  const handleLogin = () => {
      isConfirm = true
      localStorage.setItem("accountStatus", "1");
      return activate(injected)
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

  useEffect(() => {
    
      if(account)
        NotificationManager.success('Successfully Connected to Metamask');
      else 
        NotificationManager.success('Successfully Disconnected');

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

  const add_whitelist = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      PresalePortal = new ethers.Contract(presale_addr, presale_abi, signer);

      let whitelisted = await PresalePortal.addWhitelist();
      await whitelisted.wait();
      console.log(whitelisted);

      if (whitelisted) {
        await getContractData();
      }
    }
  }

  const approve_USDC = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      USDCPortal = new ethers.Contract(usdc_addr, usdc_abi, signer);

      let approved = await USDCPortal.approve(presale_addr, amount);
      await approved.wait();
      console.log(approved);

      if (approved) {
        await getContractData();
        return true;
      }
    }
  }

  const buy_SBC = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      PresalePortal = new ethers.Contract(presale_addr, presale_abi, signer);

      let bought = await PresalePortal.deposit(amount);
      await bought.wait();
      console.log(bought);

      await getContractData();
    }
  }

  const withdraw_SBC = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      VestingPortal = new ethers.Contract(vesting_addr, vesting_abi, signer);

      let withdrawable_ = await VestingPortal.getWithdrawable(account);
      let TGEtime = await VestingPortal.getTGETime();

      let withdrawable = new BigNumber(Number(withdrawable_)).dividedBy(10 ** 18).toFixed(0);
      if (Number(withdrawable) == 0) {
        alert("Nothing to withdraw");
        return;
      }
      if ((Date.now() + 3600000 > TGEtime * 1000 + 1800 * 1000 && Date.now() + 3600000 < TGEtime * 1000 + 10800 * 1000) ||
        (Date.now() + 3600000 > TGEtime * 1000 + 12600 * 1000 && Date.now() + 3600000 < TGEtime * 1000 + 14400 * 1000) ||
        (Date.now() + 3600000 > TGEtime * 1000 + 16200 * 1000 && Date.now() + 3600000 < TGEtime * 1000 + 18000 * 1000)) {
        alert("You can't claim at this point");
        return;
      }

      let withdrawn = await VestingPortal.withdrawToken();
      await withdrawn.wait();
      console.log(withdrawn);

      await getContractData();
    }
  }

  useEffect(async () => {
    const { ethereum } = window;
    if (ethereum) {
      await getContractData();
    }
  }, [account]);

  const getContractData = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      USDCPortal = new ethers.Contract(usdc_addr, usdc_abi, signer);
      SBCPortal = new ethers.Contract(sbc_addr, sbc_abi, signer);
      PresalePortal = new ethers.Contract(presale_addr, presale_abi, signer);
      VestingPortal = new ethers.Contract(vesting_addr, vesting_abi, signer);

      const promises = [];

      promises.push(await PresalePortal.recipients(account));
      promises.push(await PresalePortal.TotalPresaleAmnt());
      promises.push(await PresalePortal.soldSBCAmount());
      promises.push(await PresalePortal.startTime());
      promises.push(await PresalePortal.PERIOD());
      promises.push(await SBCPortal.balanceOf(account));
      promises.push(await VestingPortal.getWithdrawable(account));
      promises.push(await VestingPortal.getTGETime());
      promises.push(await VestingPortal.getLocked(account));
      promises.push(await USDCPortal.balanceOf(account));
      promises.push(await USDCPortal.allowance(account, presale_addr));
      promises.push(await USDCPortal.balanceOf(multiSigAdmin_addr));
      promises.push(await PresalePortal.whitelists(account));

      let temp = [];
      Promise.all(promises).then(responses => {
        responses.forEach((response, index) => {
          temp.push(response);
        })
        temp[0] = new BigNumber(Number(temp[0].amountSBC)).dividedBy(10 ** 18).toFixed(0);
        temp[1] = new BigNumber(Number(temp[1])).dividedBy(10 ** 18).toFixed(0);
        temp[2] = new BigNumber(Number(temp[2])).dividedBy(10 ** 18).toFixed(0);
        let presaleStart_ = temp[3];
        temp[3] = new Date(presaleStart_ * 1000).toUTCString();
        let presaleEnd_ = presaleStart_ * 1000 + temp[4] * 1000;
        temp[4] = new Date(presaleEnd_).toUTCString();
        temp[5] = new BigNumber(Number(temp[5])).dividedBy(10 ** 18).toFixed(4);
        temp[6] = new BigNumber(Number(temp[6])).dividedBy(10 ** 18).toFixed(0);
        temp[7] = new Date(temp[7] * 1000).toUTCString();
        temp[8] = new BigNumber(Number(temp[8])).dividedBy(10 ** 18).toFixed(0);
        temp[9] = new BigNumber(Number(temp[9])).dividedBy(10 ** 6).toFixed(4);
        temp[10] = new BigNumber(Number(temp[10])).dividedBy(10 ** 6).toFixed(0);
        temp[11] = new BigNumber(Number(temp[11])).dividedBy(10 ** 6).toFixed(0);
        temp[12] = temp[12];

        setPromiseData(temp);
        setPresaleStart(Number(presaleStart_));
        setIsEnded(Number(presaleStart_) > 0 && Date.now() + 3600000 >= presaleEnd_); // Date.now() + 1 hour = real UTC time on blockchain
      })
    }
  }

  return (
    <div id="home">
      <Hero account={account} handleLogin={handleLogin} handleLogout={handleLogout} copyToClipBoard={copyToClipBoard} />
      <div className="container-flex marginAuto">
          <LeftSideBar account={account} promiseData={promiseData} presaleStart={presaleStart} isEnded={isEnded} />
          <RightSideBar account={account} promiseData={promiseData} presaleStart={presaleStart} isEnded={isEnded} add_whitelist={add_whitelist} approve_USDC={approve_USDC} buy_SBC={buy_SBC} />
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Home;

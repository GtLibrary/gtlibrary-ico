import { useState, useEffect } from "react";
import ccoin_abi from "./utils/CCOINabi.json";
import presale_abi from "./utils/PRESALEabi.json";
import vesting_abi from "./utils/VESTINGabi.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Hero from "./components/Hero";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
//dapp
import { DAppProvider } from "@usedapp/core";
import "./App.css";
import LoadingOverlay from "react-loading-overlay";

const ccoin_addr = "0x18DA08e33B60901929dF1317Ef70C5779899bbEC";
const presale_addr = "0x6E62c655fab2893e78d2544fb7dcE027bB86D16F";
const vesting_addr = "0xa193b79D21416F41ccC78d75eB7D296F85f9dBFA";
let CCOINPortal;
let PresalePortal;
let VestingPortal;

function App() {
  const [loading, setLoading] = useState(true);
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [presaleStart, setPresaleStart] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [promiseData, setPromiseData] = useState([]);

  const buy_CCOIN = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      PresalePortal = new ethers.Contract(presale_addr, presale_abi, signer);
      let bought = await PresalePortal.buyTokens({
        value: ethers.utils.parseEther(String(amount)),
      });
      await bought.wait();

      await getContractData();
    }
  };

  useEffect(() => {
    async function contractdata() {
      const { ethereum } = window;
      if (ethereum) {
        await getContractData();
      }
    }
    contractdata();
  }, [account]);

  const getContractData = async () => {
    const { ethereum } = window;
    if (ethereum) {
      let signer;
      if (library) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://api.avax-test.network/ext/bc/C/rpc"
        );
        signer = provider.getSigner(ccoin_addr);
      }

      CCOINPortal = new ethers.Contract(ccoin_addr, ccoin_abi, signer);
      PresalePortal = new ethers.Contract(presale_addr, presale_abi, signer);
      VestingPortal = new ethers.Contract(vesting_addr, vesting_abi, signer);

      const promises = [];

      promises.push(await CCOINPortal.balanceOf(presale_addr)); // saleable token amount
      promises.push(await PresalePortal.totalsold()); /// sold token amount
      promises.push(await PresalePortal.START()); // get start time
      promises.push(await PresalePortal.DAYS()); /// get duration
      promises.push(await PresalePortal.getCuurentTime()); // get current time
      promises.push(await PresalePortal.isActive()); // get active flag
      promises.push(await PresalePortal.tokenprice()); // get token change rate
      promises.push(await CCOINPortal.totalSupply()); // total supply token amount
      if (account) {
        promises.push(await PresalePortal.getAvaxBal(account)); /// buy available avax amount
        promises.push(await CCOINPortal.balanceOf(account)); // cc token amount
      }

      setLoading(true);
      let temp = [];
      Promise.all(promises).then((responses) => {
        responses.forEach((response, index) => {
          temp.push(response);
        });
        let promisedata = [];
        promisedata["remain_token"] = new BigNumber(Number(temp[0]))
          .dividedBy(10 ** 18)
          .toFixed(2);
        promisedata["sold_token"] = new BigNumber(Number(temp[1]))
          .dividedBy(10 ** 18)
          .toFixed(2);
        let presaleStart_ = temp[2];
        promisedata["start_day"] = new Date(presaleStart_ * 1000).toUTCString();
        let presaleEnd_ = presaleStart_ * 1000 + temp[3] * 86400 * 1000;
        promisedata["end_day"] = new Date(presaleEnd_).toUTCString();
        promisedata["current_time"] = new Date(temp[4] * 1000).toUTCString();
        promisedata["is_active"] = temp[5];
        promisedata["token_price"] = new BigNumber(Number(temp[6])).toFixed(0);
        promisedata["total_supply"] = new BigNumber(Number(temp[7]))
          .dividedBy(10 ** 18)
          .toFixed(0);
        if (account) {
          promisedata["avax_val"] = new BigNumber(Number(temp[8]))
            .dividedBy(10 ** 18)
            .toFixed(2);
          promisedata["ccoin_token"] = new BigNumber(Number(temp[9]))
            .dividedBy(10 ** 18)
            .toFixed(2);
        } else {
          promisedata["avax_val"] = new BigNumber(Number(0))
            .dividedBy(10 ** 18)
            .toFixed(2);
          promisedata["ccoin_token"] = new BigNumber(Number(0))
            .dividedBy(10 ** 18)
            .toFixed(2);
        }

        setPromiseData(promisedata);
        setPresaleStart(Number(presaleStart_));
        setIsEnded(promisedata["token_price"]);
      });
    }
    setLoading(false);
  };

  return (
    <>
      <BrowserRouter>
        {loading && <div style={{background:"#00000055", width:"100%", height:"102%", zIndex:"1000", position: "absolute", top: 0}}>
          <LoadingOverlay
            active={true}
            spinner
            text="Loading ..."
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(255, 255, 255)",
                position:"absolute",
                marginTop:"30%",
              }),
            }}
            fadeSpeed = "9000"
          ></LoadingOverlay>
        </div>}
        <Hero promiseData={promiseData} />
        <DAppProvider config={{}}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  account={account}
                  promiseData={promiseData}
                  presaleStart={presaleStart}
                  isEnded={isEnded}
                  buy_CCOIN={buy_CCOIN}
                />
              }
            />
            <Route path="/swap" element={<Swap />} />
          </Routes>
        </DAppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

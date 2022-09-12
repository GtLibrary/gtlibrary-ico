import react, { useState } from 'react'
import { Link } from 'react-router-dom'


const Header = ({ account, handleLogin, handleLogout, copyToClipBoard }) => {
  const [selectedTab, setSelectedTab] = useState(1)

  const handleSelectTab = (value) => {
    setSelectedTab(value)
  }

  const toggleMenu = () => {
    let x = document.getElementById("toggle-navbar-links");
    if (x.className === "navbar-links") {
      x.className += " responsive";
    } else {
      x.className = "navbar-links";
    }
  }

  return (
    <div id="header">
      <div id="link-containers">
        <Link to="/" id="logo">
          <img src='c-coin-logo.png' className="spinblade-icon" />&nbsp;
          <h1 className="logo-nulshock">Culture Coin</h1>
        </Link>
        <div className="navbar-links" id="toggle-navbar-links">
          <a className='font-nulshock cursorPointer fs-18 ml-30 link active'>Presale</a>
          {/* <a className={selectedTab === 1 ? 'font-nulshock cursorPointer link fs-18 ml-30 active' : 'font-nulshock cursorPointer link fs-18 ml-30'} onClick={() => handleSelectTab(1)}>Presale</a>
          <a className={selectedTab === 2 ? 'font-nulshock cursorPointer link fs-18 ml-30 font-dark active' : 'font-nulshock cursorPointer fs-18 ml-30 font-dark link'} onClick={() => handleSelectTab(2)}>Vesting<span> (coming soon)</span></a>
          <a className={selectedTab === 3 ? 'font-nulshock cursorPointer link fs-18 ml-30 font-dark active' : 'font-nulshock cursorPointer fs-18 ml-30 font-dark link'} onClick={() => handleSelectTab(3)}>Staking<span> (coming soon)</span></a> */}
        </div>
      </div>
      <div className="right-header">
        <div className="right-header-icon-flex">
          <div className="sbc-title ml-50">
            <img src="c-coin-logo.png" width={40} height={40} />
            <div className="ml-5">
              <p className="sbc-nulshock t-gray fs-14">$CC</p>
              <p className="font-nulshock t-white fs-18">0</p>
            </div>
          </div>
          {/* <div className="bolt-title ml-50">
            <img src="bolt.png" width={35} height={35} />
            <div className="ml-5">
              <p className="bolt-nulshock t-gray fs-14">$BOLT</p>
              <p className="font-nulshock t-white fs-18">0</p>
            </div>
          </div> */}
        </div>
        <div className="right-header-toggle-flex">
          <div className='font-nulshock t-white link ml-50'>
            {!account ?
              <button id="connect-wallet" className='font-nulshock link fs-18' onClick={handleLogin}>
                Connect Wallet
              </button> :
              <div className="right-header-wallet-flex">
                <div className="cursorPointer" onClick={() => {
                      navigator.clipboard.writeText(account)
                      copyToClipBoard()
                  }}>
                  <p>{account.slice(0, 6) + "..." + account.slice(-4)}</p>
                  <div className="right-header-connected-flex">
                    <img src='Ellipse.png' width={13} height={11} />
                    <p className="bolt-nulshock t-gray fs-12 ml-15">connected</p>
                  </div>
                </div>
                <div className="ml-10 pt-5" onClick={handleLogout}>
                  <img src="wallet-icon.png" />
                </div>
                <span id="snackbar">Copied</span>
              </div>
            }
          </div>
          <a className="navbar-menu-icon" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="white" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
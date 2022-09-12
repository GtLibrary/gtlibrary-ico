import React, { useState, useEffect } from "react";
import Header from "./Header";


const Hero = props => {
  const { account, handleLogin, handleLogout, copyToClipBoard } = props;

  return (
    <div id="hero">
      <Header account={account} handleLogin={handleLogin} handleLogout={handleLogout} copyToClipBoard={copyToClipBoard} />
    </div>
  );
};

export default Hero;
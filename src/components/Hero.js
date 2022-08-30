import React, { useState, useEffect } from "react";
import Header from "./Header";


const Hero = props => {
  const { account, handleLogin, handleLogout } = props;

  return (
    <div id="hero">
      <Header account={account} handleLogin={handleLogin} handleLogout={handleLogout} />
    </div>
  );
};

export default Hero;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Hero from "./components/Hero";
//dapp
import { DAppProvider } from "@usedapp/core";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Hero />
        <DAppProvider config={{}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Swap />} />
          </Routes>
        </DAppProvider>
      </BrowserRouter>,
    </>
  );
}

export default App;

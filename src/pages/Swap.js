import React from "react";
import "../styles/Swap.css";

function Swap() {
    return (
        <div id="swap">
            <div className="container-flex marginAuto">
            <iframe title="swapplatform" src="https://app.bogged.finance/avax/swap?tokenIn=0xB09FE1613fE03E7361319d2a43eDc17422f36B09&tokenOut=AVAX&embed=1&theme=dark" height="780px" width="100%" style={{marginTop: "40px"}}></iframe>
            </div>
        </div>
    )
}

export default Swap;

import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import "../styles/Swap.css";
LoadingOverlay.propTypes = undefined;

function Swap() {
  const [loading, setLoading] = useState(true);
  return (
    <div id="swap">
      {loading && (
        <div
          style={{
            background: "#00000055",
            width: "100%",
            height: "102%",
            zIndex: "1000",
            position: "absolute",
            top: 0,
          }}
        >
          <LoadingOverlay
            active={true}
            spinner
            text="Loading ..."
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(255, 255, 255)",
                position: "absolute",
                marginTop: "30%",
              }),
            }}
            fadeSpeed={9000}
          ></LoadingOverlay>
        </div>
      )}
      <div className="container-flex marginAuto">
        <iframe
          title="swapplatform"
          src="https://app.bogged.finance/avax/swap?tokenIn=0xB09FE1613fE03E7361319d2a43eDc17422f36B09&tokenOut=AVAX&embed=1&theme=dark"
          height="780px"
          width="100%"
          onLoad={setLoading(false)}
          style={{ marginTop: "40px" }}
        ></iframe>
      </div>
    </div>
  );
}

export default Swap;

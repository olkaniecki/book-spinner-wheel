import React, {useState} from "react";
import styled from "styled-components";
import { Wheel } from "react-custom-roulette";
import { RainbowButton } from "./components/ui/rainbow-button";

const WheelWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto 120px;
`;

const CoverPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SpinButton = styled.button`
  margin-top: 20px;
  padding: 0.5rem 1rem;
  font-size: 14px;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 50;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  padding: 2rem;
  text-align: center;
  z-index: 100;
`;

export default function SpinnerWheel({ books }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState(null);

  const data = books
    .filter(book => book.title)
    .map(book => ({
        option: book.title,
        image: book.cover
        ? { uri: book.cover, sizeMultiplier: 0.5 } // or adjust sizeMultiplier
        : undefined,
        style: { backgroundColor: "#A3B18A", textColor: "black" },
    }));

  const handleSpin = () => {
    if (!data.length) return;
    const newPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  const handleStop = () => {
    setWinner(books[prizeNumber]);
    setMustSpin(false);
  };

  const closePopUp = () => setWinner(null);

  return (
    <div style={{ textAlign: "center" }}>
      {data.length ? (
        <>
          <WheelWrapper>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={["#A3B18A", "#588157"]}
              textColors={["black"]}
              outerBorderColor="#333"
              outerBorderWidth={4}
              innerRadius={0}
              radiusLineColor="#333"
              radiusLineWidth={2}
              onStopSpinning={handleStop}
              fontSize={14}
              pointerColor="red"
              pointerRadius={10}
              renderSlice={(slice) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {slice.image ? (
                    <img
                      src={slice.image.uri}
                      alt={slice.option}
                      style={{ width: 40, height: 60, marginBottom: 4, borderRadius: 4 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 60,
                        marginBottom: 4,
                        borderRadius: 4,
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                      }}
                    >
                      No Cover
                    </div>
                  )}
                  <span>{slice.option}</span>
                </div>
              )}
            />
          </WheelWrapper>

          <RainbowButton onClick={handleSpin} disabled={mustSpin}>
            {mustSpin ? "Spinning..." : "Spin Wheel"}
          </RainbowButton>
        </>
      ) : (
        <p>Add some books to spin the wheel!</p>
      )}

      {winner && (
        <>
          <Overlay />
          <Popup>
            <CoverPopup>
              {winner.image ? (
                <CoverImage src={winner.image.uri} alt={winner.option} />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 120,
                    backgroundColor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    marginBottom: 16,
                  }}
                >
                  No Cover
                </div>
              )}
              <h2>Winner!</h2>
              <p>{winner.option}</p>
              <SpinButton onClick={closePopUp}>Close</SpinButton>
            </CoverPopup>
          </Popup>
        </>
      )}
    </div>
  );
}
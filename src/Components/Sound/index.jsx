import React from "react";

const index = ({ sunkSoundRef, clickSoundRef, lossSoundRef, winSoundRef }) => {
  return (
    <>
      <audio
        ref={sunkSoundRef}
        src="../assets/sounds/ship_sunk.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={clickSoundRef}
        src="../assets/sounds/click.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={lossSoundRef}
        src="../assets/sounds/lose.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={winSoundRef}
        src="../assets/sounds/win.wav"
        className="clip"
        preload="auto"
      />
    </>
  );
};

export default index;

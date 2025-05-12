import Canvas from "./components/Canvas/Canvas";
import Landing from "./components/Landing/Landing";
import Dropzone from "./components/Dropzone/Dropzone";
import Tracks from "./components/Tracks/Tracks";
import Picker from "./components/Picker/Picker";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { useState } from "react";

function App() {

  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <>
      <Landing />
      <Dropzone />
      <Picker />
      <Tracks setCurrentTrack={setCurrentTrack} />
      {/* <AudioPlayer track={currentTrack} /> */}
      {currentTrack && <AudioPlayer track={currentTrack} />}

      <Canvas />
    </>
  );
}

export default App;

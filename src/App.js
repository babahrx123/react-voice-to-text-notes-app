import VoiceText from "./Component/VoiceText";
import "./App.css"
import MicAuth from "./Component/MicAuth";
import { useState } from "react";
const App = () => {
  const [micPermissionStatus, setMicPermissionStatus] = useState(false);

  const handleOnMicPermissionStatus = (micStatus) => {
    setMicPermissionStatus(micStatus);
  }

  return (
    <div className="App">
      <VoiceText micPermissionStatus={micPermissionStatus}/>
      <MicAuth micPermissionStatus={handleOnMicPermissionStatus} />
    </div>
  )
}
export default App;

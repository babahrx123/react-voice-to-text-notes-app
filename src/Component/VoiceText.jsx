import { useState, useEffect } from "react";
import { MdMic } from "react-icons/md";
import { MdStop } from "react-icons/md";
import "./style.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

const VoiceText = ({ micPermissionStatus }) => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("Transcript of voice will show here...");
  const [savedNotes, setSavedNotes] = useState([]);

  const handleListen = () => {
    if (isListening) {
      recognition.onstart = () => {
        console.log("mic on");
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("mic stoped on click");
      };
    }
    recognition.onresult = (event) => {
      let transcript = "";
      Array.from(event.results).forEach((result) => {
        transcript += result[0].transcript + " ";
      });
      setNote(transcript);
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("Transcript of voice will show here...");
  };

  useEffect(() => {
    handleListen();
  }, [handleListen]);

  return (
    <>
      <div className="voiceText">
        <div>
          <div
            className={
              isListening && micPermissionStatus
                ? "voiceTextArea"
                : "voiceTextArea showLight"
            }
            value={note}
          >
            <p>{note}</p>
          </div>
          <div className="voiceTextBtn">
            {isListening && micPermissionStatus ? (
              <p className="showLight">Press here to stop</p>
            ) : (
              <p className="showLight">Press here to start</p>
            )}
            {isListening === true && micPermissionStatus === false ? (
              <p
                className="permissionNeed"
                title="Sites can asking to use your microphone.."
              >
                i
              </p>
            ): null}
            {isListening && micPermissionStatus ? (
              <i
                className="icon showAnimation"
                onClick={() => {
                  setIsListening(false);
                }}
              >
                <MdStop />
              </i>
            ) : (
              <i
                className="icon"
                onClick={() => {
                  setIsListening(true);
                  recognition.start();
                }}
              >
                <MdMic />
              </i>
            )}
          </div>
        </div>
        <div className="savedNotes">
          <button className="saveNote" onClick={handleSaveNote}>
            SaveNote
          </button>
          <h2>Notes</h2>
          {savedNotes.map((notes, index) => (
            <div key={index}>
              <br />
              <p>
                {index + 1} . {notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VoiceText;

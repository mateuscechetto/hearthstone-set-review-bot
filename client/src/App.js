import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [room, setRoom] = useState('');
  const [spreadSheetLink, setSpreadSheetLink] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const sendSheet = () => {
    axios.post("/api/createArchive", {
      link: spreadSheetLink,
      streamerName: room
    }).then(() => {
      setShowCard(true);
    }).catch(() => {
      alert("Could not create sheet. Please make sure you gave permission to edit it");
    });
  }

  const recordChat = () => {
    axios.post("/api/record", {
      streamerName: room,
      cardName: currentCard
    }).then(() => {
      setIsRecording(true);
    }).catch(() => {

    });
  }

  const stopRecording = () => {
    axios.post("/api/stop", {
      streamerName: room,
    }).then(() => {
      setIsRecording(false);
      setCurrentCard('');
    }).catch(() => {
      
    });
  }



  return (
    <div className="App">
      <div>
        <input
          placeholder='Your twitch channel'
          onChange={(event) => setRoom(event.target.value)} />
        <input
          placeholder='Spreadsheet code'
          onChange={(event) => setSpreadSheetLink(event.target.value)} />
        <button onClick={sendSheet}>Create bot</button>
      </div>
      {showCard && (
        <div>
          <input
            placeholder='CardName'
            onChange={(event) => setCurrentCard(event.target.value)}
            value={currentCard} />
            {!isRecording && <button onClick={recordChat}>Record chat</button>}
            {isRecording && <button onClick={stopRecording}>Stop recording</button>} 
        </div>
      )}
    </div>
  );
}

export default App;

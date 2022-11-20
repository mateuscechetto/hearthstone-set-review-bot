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
    axios.post("http://localhost:5000/api/createArchive", {
      link: spreadSheetLink,
      streamerName: room
    }).then(() => {
      setShowCard(true);
    }).catch((e) => {
      alert(e)
      alert("Could not create sheet. Please make sure you gave permission to edit it");
    });
  }

  const recordChat = () => {
    axios.post("http://localhost:5000/api/record", {
      streamerName: room,
      cardName: currentCard
    }).then(() => {
      setIsRecording(true);
    }).catch(() => {

    });
  }

  const stopRecording = () => {
    axios.post("http://localhost:5000/api/stop", {
      streamerName: room,
    }).then(() => {
      setIsRecording(false);
      setCurrentCard('');
    }).catch(() => {

    });
  }



  return (
    <div className="App">
      <h2>First of all, create a Google Spreadsheet and give editor permission to: <br />
        hs-review@hs-review-bot.iam.gserviceaccount.com</h2>
      <div>
        <input
          placeholder='Your twitch name'
          onChange={(event) => setRoom(event.target.value)}
          disabled={showCard} />
        <input
          placeholder='Spreadsheet code'
          onChange={(event) => setSpreadSheetLink(event.target.value)}
          disabled={showCard} />
        <button onClick={sendSheet} disabled={showCard}>Create bot</button>
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

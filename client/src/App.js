import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [room, setRoom] = useState('');
  const [spreadSheetLink, setSpreadSheetLink] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [ratings, setRatings] = useState([]);

  const sendSheet = () => {
    axios.post("/api/createArchive", {
      link: spreadSheetLink,
      streamerName: room
    }).then(() => {
      setShowCard(true);
    }).catch((e) => {
      //alert(e);
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
      alert("Make sure you wrote your twitch name correctly");

    });
  }

  const stopRecording = () => {
    axios.post("/api/stop", {
      streamerName: room,
    }).then((res) => {
      setIsRecording(false);
      setCurrentCard('');
      const newRating = res.data;
      setRatings(prevArray => [newRating, ...prevArray]);
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
        <>
          <h3> A new sheet should be created at the bottom of your spreadsheet </h3>
          <div className='cardNameInput'>
            <input
              placeholder='CardName'
              onChange={(event) => setCurrentCard(event.target.value)}
              value={currentCard} />
            {!isRecording && <button onClick={recordChat}>Record chat</button>}
            {isRecording && <button onClick={stopRecording}>Stop recording</button>}
          </div>
          {ratings.map((rating) => <div key={rating.card}><div className="cardListContainer"><h4 className='leftColumn'>{rating.card}</h4> <h4>Avg: {rating.avg}</h4></div></div>)}
        </>
      )}
    </div>
  );
}

export default App;

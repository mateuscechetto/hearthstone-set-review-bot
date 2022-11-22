import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [streamerName, setStreamerName] = useState('');
  const [spreadSheetLink, setSpreadSheetLink] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [showFormat, setShowFormat] = useState(false);
  const [loadingFormat, setLoadingFormat] = useState(false);
  const [loadingCreateBot, setLoadingCreateBot] = useState(false);

  const sendSheet = () => {
    setLoadingCreateBot(true);
    axios.post("/api/createArchive", {
      link: spreadSheetLink,
      streamerName: streamerName
    }).then(() => {
      setShowCard(true);
      setLoadingCreateBot(false);
    }).catch((e) => {
      //alert(e);
      alert("Could not create sheet. Please make sure you gave permission to edit it");
    });
  }

  const recordChat = () => {
    axios.post("/api/record", {
      streamerName: streamerName,
      cardName: currentCard
    }).then(() => {
      setIsRecording(true);
    }).catch(() => {
      alert("Make sure you wrote your twitch name correctly");

    });
  }

  const stopRecording = () => {
    axios.post("/api/stop", {
      streamerName: streamerName,
    }).then((res) => {
      setIsRecording(false);
      setCurrentCard('');
      const newRating = res.data;
      setRatings(prevArray => [newRating, ...prevArray]);
      setShowFormat(true);
    }).catch(() => {

    });
  }

  const formatSheet = () => {
    setLoadingFormat(true);
    axios.post("/api/format", {
      link: spreadSheetLink,
    }).then(() => {
      setLoadingFormat(false);
      alert("Formatted with success");
    }).catch((e) => {
      alert(e.message);
    })
  }

  return (
    <div className="App">
      <h2>First of all, create a Google Spreadsheet and give editor permission to: <br />
        hs-review@hs-review-bot.iam.gserviceaccount.com</h2>
      <div>
        <input
          placeholder='Your twitch name'
          onChange={(event) => setStreamerName(event.target.value)}
          disabled={showCard} />
        <input
          placeholder='Spreadsheet code'
          onChange={(event) => setSpreadSheetLink(event.target.value)}
          disabled={showCard} />
        <button onClick={sendSheet} disabled={showCard}>Create bot</button>
      </div>
      {loadingCreateBot && <h3>Creating bot...</h3>}
      {showFormat &&
        (
          <>
            <div>
              <h3>Have you finished your review? Format it!</h3>
              <button onClick={formatSheet}> Format sheet</button>
              {loadingFormat && <h3>Formatting...</h3>}
            </div>
          </>
        )}


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

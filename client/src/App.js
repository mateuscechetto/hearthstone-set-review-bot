import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [streamerName, setStreamerName] = useState(
    () => localStorage.getItem('streamerName')
  );
  const [spreadSheetLink, setSpreadSheetLink] = useState(
    () => localStorage.getItem('spreadSheetLink')
  );
  const [showCard, setShowCard] = useState(
    () => !!localStorage.getItem('streamerName')
  );
  const [token, setToken] = useState(
    () => localStorage.getItem('userToken')
  );
  const [isLogged, setIsLogged] = useState(
    () => !!localStorage.getItem('userToken')
  );
  const [currentCard, setCurrentCard] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [showFormat, setShowFormat] = useState(false);
  const [loadingFormat, setLoadingFormat] = useState(false);
  const [loadingCreateBot, setLoadingCreateBot] = useState(false);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const getUser = () => {
      axios.get("/api/auth/login/success")
        .then((resObject) => {
          console.log(resObject);
          setStreamerName(resObject.data.user.data[0].display_name);
          setToken(resObject.data.user.userToken);
          localStorage.setItem('userToken', resObject.data.user.userToken);
          localStorage.setItem('streamerName', resObject.data.user.data[0].display_name);
          setIsLogged(true);
        });
    }
    getUser();
  }, []);

  const sendSheet = () => {
    setLoadingCreateBot(true);
    axios.post("/api/createArchive", {
      link: spreadSheetLink,
      //streamerName: streamerName
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setShowCard(true);
      setLoadingCreateBot(false);
      localStorage.setItem('streamerName', streamerName);
      localStorage.setItem('spreadSheetLink', spreadSheetLink);
    }).catch((e) => {
      setLoadingCreateBot(false);
      //alert(e);
      alert("Could not create sheet. Please make sure you gave permission to edit it and there is no \"Chat\" sheet");
    });
  }


  const recordChat = () => {
    if (streamerName !== "") {
      axios.post("/api/record", {
        //streamerName: streamerName,
        cardName: currentCard
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        setIsRecording(true);
        setLoading("recording chat...");
      }).catch((e) => {
        alert(e.message);

      });
    }

  }

  const stopRecording = () => {
    if (streamerName !== "") {
      setLoading("Saving the ratings on google sheet...");
      axios.post("/api/stop", {
        streamerName: streamerName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setIsRecording(false);
        setCurrentCard('');
        const newRating = res.data;
        setRatings(prevArray => [newRating, ...prevArray]);
        setLoading("");
        //setShowFormat(true);
      }).catch((e) => {
        alert(e.message);
      });
    }
  }

  const formatSheet = () => {
    setLoadingFormat(true);
    axios.post("/api/format", {
      streamerName: streamerName,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setLoadingFormat(false);
      alert("Formatted with success");
    }).catch((e) => {
      alert(e.message);
    })
  }

  const changeSheet = () => {
    setShowCard(false);
  }

  const login = () => {
    window.open("/api/auth/twitch", "_self");
  }

  return (
    <div className="App">
      {isLogged ? (
        <>
          <h2>First of all, create a Google Spreadsheet and give editor permission to: <br />
            hs-review@hs-review-bot.iam.gserviceaccount.com</h2>
          <div>
            {/* <input
              placeholder='Your twitch name'
              onChange={(event) => setStreamerName(event.target.value)}
              value={streamerName}
              disabled={showCard} /> */}
              <b>{streamerName}</b>
            <input
              placeholder='Spreadsheet URL'
              onChange={(event) => setSpreadSheetLink(event.target.value)}
              value={spreadSheetLink}
              disabled={showCard} />
            <button onClick={sendSheet} disabled={showCard}>Create bot</button>
          </div>
          {showCard && <button onClick={changeSheet}>Change stream/sheet</button>}
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
                <h3>{loading}</h3>
              </div>
              {ratings.map((rating) => <div key={rating.card}><div className="cardListContainer"><h4 className='leftColumn'>{rating.card}</h4> <h4>Avg: {rating.avg}</h4></div></div>)}
            </>
          )}
        </>) :
        <>
          <h1>Hearthstone Set Review Bot</h1>
          <button onClick={login}>Login</button>
          <h3>If you already clicked login button, wait a few seconds</h3>
        </>
      }
    </div>
  );
}

export default App;

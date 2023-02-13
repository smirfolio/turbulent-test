import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [score, setScore] = useState([])
  const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(Date.now());
    const fetchData = () => {
        console.log(`{ query: scorePlayers {id score }}`)
        setLoading(true);
        fetch("http://localhost:5000/update-score", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ query: scorePlayers {id score }}`}),
        })
            .then(async (res) => {
                const dataScore = await res.json();
                console.log("result GraphQl======>", dataScore.data?.query)
                dataScore.data?.query.sort((a, b) => {
                    const parsedA = parseInt(a.score, 10);
                    const parsedB = parseInt(b.score, 10);
                    return parsedA > parsedB ? -1 : 1; // for descending sort inverse -1 and 1
                });
                setScore(dataScore.data?.query)
                setLoading(false)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
            if(!loading){
                fetchData();
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [time]);
  return (
    <div className="App">
      <header className="App-header">
          <h1>Score board</h1>
          <section className={"container"}>
              {
                  score ? score.map((player) => {
                          return (
                              <span key={player.id} className={"box avatar"}>
                                  <img src={`https://i.pravatar.cc/500?img=${player.id}`} alt=""/>
                                    <h2 className={"smallMargin"}>Score: {player.score}</h2>
                            </span>
                          );
                      }
                  ) : ""
              }
          </section>
      </header>
    </div>
  );
}

export default App;

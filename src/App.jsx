import './App.css'

function App() {
  const currentCount = 0
  const bets = [
    { name: 'Juan', prediction: 8 },
    { name: 'Matt', prediction: 10 },
    { name: 'Reuben', prediction: 6 },
    { name: 'Nance', prediction: 50 },
    { name: 'Izzy', prediction: 14 },
    { name: 'Toby', prediction: 12 },
    { name: 'Ferdy', prediction: 4 },
    { name: 'Feli', prediction: 9 },
    { name: 'Anushka', prediction: 11 },
    { name: 'Gregor', prediction: 5 },
    { name: 'Daimy', prediction: 6 },
    { name: 'Awen', prediction: 6 }
  ].sort((a, b) => a.prediction - b.prediction)

  const getClosestBets = () => {
    let minDiff = Infinity;
    let closestBets = [];
    
    bets.forEach(bet => {
      const diff = Math.abs(bet.prediction - currentCount);
      if (diff < minDiff) {
        minDiff = diff;
        closestBets = [bet];
      } else if (diff === minDiff) {
        closestBets.push(bet);
      }
    });
    
    return closestBets;
  }

  const closestBets = getClosestBets()
  const leaderNames = closestBets.map(bet => bet.name).join(', ')

  return (
    <div className="container">
      <div className="counter-section">
        <h1>🚽 Bathroom Visit Counter 🧻</h1>
        <div className="counter">
          <span className="count">{currentCount}</span>
        </div>
        <div className="emoji-row">💩 💨 🚽</div>
      </div>

      <div className="leader-banner">
        <div className="leader-content">
          <span className="leader-label">Current {closestBets.length > 1 ? 'Leaders' : 'Leader'}:</span>
          <span className="leader-name">👑 {leaderNames}</span>
          <span className="leader-prediction">Guess: {closestBets[0].prediction}</span>
        </div>
      </div>

      <div className="bets-section">
        <h2>🎲 Current Bets 🎲</h2>
        <div className="bets-list">
          {bets.map((bet, index) => (
            <div 
              key={index} 
              className={`bet-item ${closestBets.includes(bet) ? 'closest-bet' : ''} ${
                bet.prediction < currentCount && !closestBets.includes(bet) ? 'eliminated-bet' : ''
              }`}
            >
              <span className="name">
                {bet.prediction < currentCount && !closestBets.includes(bet) ? '❌ ' : ''}
                👤 {bet.name}
              </span>
              <span className="prediction">🎯 Guess: {bet.prediction}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

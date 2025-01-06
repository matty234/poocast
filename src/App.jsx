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
    { name: 'Gregor', prediction: 3 },
    { name: 'Daimy', prediction: 6 },
    { name: 'Awen', prediction: 6 }
  ].sort((a, b) => a.prediction - b.prediction)

  const getClosestBet = () => {
    return bets.reduce((closest, current) => {
      const closestDiff = Math.abs(closest.prediction - currentCount)
      const currentDiff = Math.abs(current.prediction - currentCount)
      return currentDiff < closestDiff ? current : closest
    })
  }

  const closestBet = getClosestBet()

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
          <span className="leader-label">Current Leader:</span>
          <span className="leader-name">👑 {closestBet.name}</span>
          <span className="leader-prediction">Guess: {closestBet.prediction}</span>
        </div>
      </div>

      <div className="bets-section">
        <h2>🎲 Current Bets 🎲</h2>
        <div className="bets-list">
          {bets.map((bet, index) => (
            <div 
              key={index} 
              className={`bet-item ${bet === closestBet ? 'closest-bet' : ''} ${
                bet.prediction < currentCount && bet !== closestBet ? 'eliminated-bet' : ''
              }`}
            >
              <span className="name">
                {bet.prediction < currentCount && bet !== closestBet ? '❌ ' : ''}
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

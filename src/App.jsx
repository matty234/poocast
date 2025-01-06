import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [currentCount, setCurrentCount] = useState(0)
  const [bets, setBets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BIN_ID = '677bfac7e41b4d34e470cfd8'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`)
      const { count, predictions } = response.data.record
      setCurrentCount(count)
      setBets(predictions.sort((a, b) => a.prediction - b.prediction))
      setError(null)
    } catch (err) {
      setError('Failed to load data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getClosestBets = () => {
    if (!bets.length) return [];
    
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

  if (loading) {
    return <div className="loading">Loading... 🚽</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="container">
      <div className="counter-section">
        <h1>🚽 Bathroom Visit Counter 🧻</h1>
        <div className="counter">
          <span className="count">{currentCount}</span>
        </div>
        <div className="emoji-row">💩 💨 🚽</div>
      </div>

      {closestBets.length > 0 && (
        <div className="leader-banner">
          <div className="leader-content">
            <span className="leader-label">Current {closestBets.length > 1 ? 'Leaders' : 'Leader'}:</span>
            <span className="leader-name">👑 {leaderNames}</span>
            <span className="leader-prediction">Guess: {closestBets[0].prediction}</span>
          </div>
        </div>
      )}

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

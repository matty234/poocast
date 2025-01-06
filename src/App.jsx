import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [currentCount, setCurrentCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BIN_ID = '677bfac7e41b4d34e470cfd8' // You'll get this after creating a bin

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

  useEffect(() => {
    fetchCount()
  }, [])

  const fetchCount = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`)
      setCurrentCount(response.data.record.count)
      setError(null)
    } catch (err) {
      setError('Failed to load count')
      console.error('Error fetching count:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateCount = async (newCount) => {
    try {
      setLoading(true)
      await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, 
        { count: newCount },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setCurrentCount(newCount)
      setError(null)
    } catch (err) {
      setError('Failed to update count')
      console.error('Error updating count:', err)
    } finally {
      setLoading(false)
    }
  }

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
          <button onClick={() => updateCount(currentCount - 1)} className="count-button">➖</button>
          <span className="count">{currentCount}</span>
          <button onClick={() => updateCount(currentCount + 1)} className="count-button">➕</button>
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

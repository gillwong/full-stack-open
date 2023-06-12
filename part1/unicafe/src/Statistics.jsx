import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = 100 * good / total
  
  return (
    <div>
      <h2>statistics</h2>
      {total !== 0 ? <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table> : <p>No feedback given</p>}
    </div>
  )
}

export default Statistics
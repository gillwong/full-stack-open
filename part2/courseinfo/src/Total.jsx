const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, part) => accumulator + part.exercises, 0
  )

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

export default Total
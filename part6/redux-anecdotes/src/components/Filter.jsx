import { changeFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter
      <input
        type="text"
        name="filter"
        onChange={(event) => dispatch(changeFilter(event.target.value))}
      />
    </div>
  )
}

export default Filter
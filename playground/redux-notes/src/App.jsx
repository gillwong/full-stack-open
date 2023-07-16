import { useDispatch } from "react-redux"
import { useEffect } from "react"
import NewNote from "./NewNote"
import Notes from "./Notes"
import VisibilityFilter from "./VisibilityFilter"
import { initalizeNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
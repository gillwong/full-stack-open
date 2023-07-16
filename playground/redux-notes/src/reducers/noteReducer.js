import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(note => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      const completeNote = action.payload
      state.push(completeNote)
    },
    setNotes(state, action) {
      const newNotes = action.payload
      return newNotes
    }
  }
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initalizeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Character, CharacterFormInput } from 'features/characters/types'
import type { RootState } from 'store/store'

export interface CharactersState {
  characters: Character[]
}

const initialState: CharactersState = {
  characters: [],
}

// slice
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchAllSucceeded(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload
    },
  },
})

// Actions
export const charactersAction = {
  fetchAll: createAction(`${charactersSlice.name}/fetchAll`),
  fetchAllSucceeded: charactersSlice.actions.fetchAllSucceeded,
  create: createAction<CharacterFormInput>(`${charactersSlice.name}/create`),
  update: createAction<CharacterFormInput>(`${charactersSlice.name}/update`),
  delete: createAction<string>(`${charactersSlice.name}/delete`),
}

// Selectors
export const selectCharacters = (state: RootState) => state.characters.characters

// Reducer
export default charactersSlice.reducer

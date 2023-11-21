import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Character, CharacterFormInput } from 'features/characters/types'
import type { RootState } from 'store/store'

export interface ErrorAction {
  type: string
  errors: Error[]
}
export interface CharactersState {
  characters: Character[]
  errorActions: ErrorAction[]
}

const initialState: CharactersState = {
  characters: [],
  errorActions: [],
}

// slice
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchAllSucceeded(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload
    },
    functionDispatchFailed(state, action: PayloadAction<{ type: string; error: Error }>) {
      let isExist = false
      state.errorActions.forEach(errorAction => {
        if (errorAction.type === action.payload.type) {
          errorAction.errors = [...errorAction.errors, action.payload.error]
          isExist = true
        }
      })
      if (!isExist) {
        state.errorActions = [
          ...state.errorActions,
          {
            type: action.payload.type,
            errors: [action.payload.error],
          },
        ]
      }
    },
  },
})

// Actions
export const charactersAction = {
  fetchAll: createAction(`${charactersSlice.name}/fetchAll`),
  fetchAllSucceeded: charactersSlice.actions.fetchAllSucceeded,
  create: createAction<CharacterFormInput>(`${charactersSlice.name}/create`),
  update: createAction<{
    id: string
    character: CharacterFormInput
    callbackFn: (status: string) => void
  }>(`${charactersSlice.name}/update`),
  delete: createAction<string>(`${charactersSlice.name}/delete`),
  functionDispatchFailed: createAction<{ type: string; error: Error }>(
    `${charactersSlice.name}/functionDispatchFailed`,
  ),
}

// Selectors
export const selectCharacters = (state: RootState) => state.characters.characters
export const selectErrorActions = (state: RootState) => state.characters.errorActions

// Reducer
export default charactersSlice.reducer

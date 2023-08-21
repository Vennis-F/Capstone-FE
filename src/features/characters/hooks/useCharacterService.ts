import { useCallback } from 'react'

import {
  ErrorAction,
  charactersAction,
  selectCharacters,
  selectErrorActions,
} from 'features/characters/store/characters.slice'
import { Character, CharacterFormInput } from 'features/characters/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type CharacterServiceOperators = {
  characters: Character[]
  errorActions: ErrorAction[]
  createCharacter: (data: CharacterFormInput) => void
  fetchAllCharacters: () => void
  deleteCharacter: (id: string) => void
  updateCharacter: (
    id: string,
    character: CharacterFormInput,
    callbackFn: (status: string) => void,
  ) => void
}

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useCharacterService = (): Readonly<CharacterServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    characters: useAppSelector(selectCharacters),
    errorActions: useAppSelector(selectErrorActions),

    fetchAllCharacters: useCallback(() => {
      dispatch(charactersAction.fetchAll())
      console.log(1234)
    }, [dispatch]),

    createCharacter: useCallback(
      (character: CharacterFormInput) => {
        dispatch(charactersAction.create({ ...character }))
      },
      [dispatch],
    ),

    deleteCharacter: useCallback(
      (id: string) => {
        dispatch(charactersAction.delete(id))
      },
      [dispatch],
    ),

    updateCharacter: useCallback(
      (id: string, character: CharacterFormInput, callbackFn: (message: string) => void) => {
        dispatch(charactersAction.update({ id, character, callbackFn }))
      },
      [dispatch],
    ),
  }
}

export default useCharacterService

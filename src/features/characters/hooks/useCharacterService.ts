import { useCallback } from 'react'

import { charactersAction, selectCharacters } from 'features/characters/store/characters.slice'
import { Character, CharacterFormInput } from 'features/characters/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type CharacterServiceOperators = {
  characters: Character[]
  createCharacter: (data: CharacterFormInput) => void
  fetchAllCharacters: () => void
  deleteCharacter: (id: string) => void
  updateCharacter: (character: Character) => void
}

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const usePostService = (): Readonly<CharacterServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    characters: useAppSelector(selectCharacters),

    createCharacter: useCallback(
      (character: CharacterFormInput) => {
        dispatch(charactersAction.create({ ...character }))
      },
      [dispatch],
    ),
    fetchAllCharacters: useCallback(() => {
      dispatch(charactersAction.fetchAll())
    }, [dispatch]),
    deleteCharacter: useCallback(
      (id: string) => {
        dispatch(charactersAction.delete(id))
      },
      [dispatch],
    ),
    updateCharacter: useCallback(
      (character: CharacterFormInput) => {
        dispatch(
          charactersAction.update({
            ...character,
          }),
        )
      },
      [dispatch],
    ),
  }
}

export default usePostService

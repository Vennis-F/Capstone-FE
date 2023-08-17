/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { Character } from 'features/characters/types'
import makeApi from 'libs/core/configureAxios'

const api = makeApi(`${Env.API_BASE_URL}`)

const CHARACTERS_BASE_URL = `/character`

export const getCharacters = (): Promise<Character[]> => api.get(CHARACTERS_BASE_URL)

export const getCharacterById = (id: string): Promise<Character> =>
  api.get(`${CHARACTERS_BASE_URL}/${id}`)

export const createCharacter = (character: Character): Promise<Character> =>
  api.post(CHARACTERS_BASE_URL, character)

export const updateCharacter = (character: Character): Promise<Character> =>
  api.patch(`${CHARACTERS_BASE_URL}/${character.id}`, character)

export const deleteCharacter = (id: string): Promise<Character> =>
  api.delete(`${CHARACTERS_BASE_URL}/${id}`)

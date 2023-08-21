import { Grid } from '@mui/material'
import React from 'react'

import { Character } from '../types'

import { CharacterCardView } from './CharacterCardView'

export type CharacterListProps = {
  characters: Character[]
}

export const CharacterList = (props: CharacterListProps) => {
  const { characters } = props

  return (
    <>
      <Grid container spacing={2}>
        {characters.map(character => (
          <CharacterCardView key={character.id} character={character} />
        ))}
      </Grid>
    </>
  )
}

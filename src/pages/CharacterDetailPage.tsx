import { Container } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { CharacterDetailContainer } from 'features/characters/components/CharacterDetailContainer'

type LocationStateType = { id: string }

const CharacterDetailPage = () => {
  const locationState = useLocation().state as LocationStateType

  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ height: '100vh', backgroundColor: 'black' }}>
        <CharacterDetailContainer id={locationState.id} />
      </Container>
    </>
  )
}

export default CharacterDetailPage

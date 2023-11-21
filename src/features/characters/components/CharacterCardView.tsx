import { Grid, Typography, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Character } from 'features/characters/types'

export type CharacterCardViewProps = {
  character: Character
}

export const CharacterCardView = (props: CharacterCardViewProps) => {
  const { character } = props
  const navigate = useNavigate()

  //   const handleClick = () => {
  //   }

  return (
    <>
      <Grid xs={3} item key={character.id}>
        <Card
          sx={{ maxWidth: 280 }}
          onClick={() => navigate('/character-detail', { state: { id: character.id } })}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={character.imgUrl}
              alt={`${character.name} image`}
            />
            <CardContent style={{ backgroundColor: '#061C25' }}>
              <Typography variant="h5" component="div" color={'white'}>
                {character.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  )
}

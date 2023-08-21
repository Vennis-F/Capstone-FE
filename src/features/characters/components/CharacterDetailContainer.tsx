import AccessibilityIcon from '@mui/icons-material/Accessibility'
import CallSplitIcon from '@mui/icons-material/CallSplit'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Fab,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import Container from '@mui/material/Container'
import Image from 'material-ui-image'
import React, { CSSProperties, useEffect, useState } from 'react'

import MaxHeightTextarea from 'libs/ui/components/MaxHeightTextArea'
import ReadMoreText from 'libs/ui/components/ReadMoreText'
import { StyleSxProps } from 'types'

import { getCharacterById } from '../api'
import useCharacterService from '../hooks/useCharacterService'
import { Lane, CharacterRole, Character, CharacterFormInput } from '../types'

const styles: StyleSxProps = {
  container: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '100vh',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  container_inner: {
    position: 'absolute',
    zIndex: 4,
    height: '70vh',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 50,
  },
  fab: { position: 'absolute', bottom: 40, right: 40 },
} as const

type CharacterDetailContainerProps = {
  id: string
}

export const CharacterDetailContainer = (props: CharacterDetailContainerProps) => {
  const [currCharacter, setCurrCharacter] = useState<Character | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [messageStatusUpading, setMessageStatusUpading] = useState('')
  const [currLane, setCurrLane] = useState('')
  const [currRole, setCurrRole] = useState('')
  const [currDescription, setCurrDescription] = useState('')
  const [open, setOpen] = React.useState(false)
  const { updateCharacter } = useCharacterService()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const { id } = props

  useEffect(() => {
    const fetchData = async () => {
      try {
        const character = await getCharacterById(id)
        setCurrLane(character.lane)
        setCurrRole(character.role)
        setCurrDescription(character.description)
        setCurrCharacter(character)
      } catch (error) {
        console.log('[CharacterDetailContainer/fetchData]', error)
      }
    }
    fetchData()
  }, [id])

  const callbackHandleUpdateCharacter = (status: string) => {
    // Logic when saga send message successfully
    if (status === 'success') {
      setOpen(true)
      setMessageStatusUpading('The information is updated successfully')
      setIsEdit(false)
      setIsUpdating(false)
      setCurrCharacter({
        ...(currCharacter as Character),
        description: currDescription,
        lane: currLane as Lane,
        role: currRole as CharacterRole,
      })
    }

    // Logic when saga send message fails
    if (status === 'fail') {
      setOpen(true)
      setIsUpdating(false)
      setMessageStatusUpading('There is some problems with the information')
    }
  }

  return (
    currCharacter && (
      <>
        <Container
          maxWidth={false}
          disableGutters
          sx={{ ...styles.container, backgroundImage: `url(${currCharacter?.imgUrl})` }}
        >
          <div style={styles.overlay as CSSProperties} />
          <Container maxWidth="lg" sx={{ ...styles.container_inner }} disableGutters>
            <Image
              src={currCharacter.imgUrl}
              style={{ height: '100%', padding: 0 }}
              imageStyle={{ height: '100%' }}
            />
          </Container>
          <Container maxWidth="lg" sx={{ ...styles.container_inner, zIndex: 6 }} disableGutters>
            <Typography
              variant="h2"
              sx={{
                position: 'absolute',
                zIndex: 12,
                width: '100%',
                top: 240,
                color: 'white',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {currCharacter.name}
            </Typography>
            {/* <Box sx={{ ...styles.container_inner, flexGrow: 1, height: 300 }}> */}
            <Box
              sx={{
                position: 'absolute',
                zIndex: 10,
                overflow: 'hidden',
                padding: 10,
                width: '100%',
                bottom: 0,
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  // backgroundColor: 'pink',
                  height: 300,
                  border: '3px solid #333A42',
                  padding: 5,
                  // width: '100%',
                }}
              >
                <Grid item xs={6} md={6} sx={{ borderRight: '1px solid #333A42' }}>
                  <Grid
                    container
                    justifyContent={'center'}
                    alignItems="center"
                    sx={{ height: '100%', textAlign: 'center' }}
                  >
                    <Grid item xs={6}>
                      <AccessibilityIcon
                        sx={{ color: '#D0A85C', width: '100%' }}
                        fontSize="large"
                      />
                      {isEdit ? (
                        <TextField
                          select
                          label="Select"
                          value={currRole}
                          helperText="Please select your role"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCurrRole(event.target.value)
                          }}
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'white',
                            },
                          }}
                        >
                          {Object.entries(CharacterRole).map(entry => (
                            <MenuItem key={entry[0]} value={entry[1]}>
                              {entry[1]}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <Typography sx={{ color: 'white' }}>{currCharacter.role}</Typography>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CallSplitIcon sx={{ color: '#D0A85C', width: '100%' }} fontSize="large" />
                      {isEdit ? (
                        <TextField
                          select
                          label="Select"
                          value={currLane}
                          helperText="Please select your lane"
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'white',
                            },
                          }}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCurrLane(event.target.value)
                          }}
                        >
                          {Object.entries(Lane).map(entry => (
                            <MenuItem key={entry[0]} value={entry[1]}>
                              {entry[1]}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <Typography sx={{ color: 'white' }} noWrap={true} paragraph={true}>
                          {currCharacter.lane}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6} sx={{ borderLeft: '1px solid #333A42' }}>
                  {isEdit ? (
                    <MaxHeightTextarea
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      value={currDescription}
                      onChange={event => {
                        setCurrDescription(event.target.value)
                      }}
                    />
                  ) : (
                    <ReadMoreText text={currCharacter.description} maxCharacterCount={50} />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Container>
        {!isUpdating ? (
          <Fab
            sx={styles.fab}
            color="primary"
            aria-label="add"
            onClick={() => {
              if (isEdit === false) return setIsEdit(true)
              const { id: ID, ...rest } = currCharacter
              const characterUpdateForm: CharacterFormInput = {
                ...rest,
                role: currRole as CharacterRole,
                lane: currLane as Lane,
                description: currDescription,
              }
              // Dispatch
              updateCharacter(ID, characterUpdateForm, callbackHandleUpdateCharacter)
              return setIsUpdating(true)
            }}
          >
            {isEdit ? <CheckIcon /> : <EditIcon />}
          </Fab>
        ) : (
          <Fab sx={styles.fab} color="info" aria-label="add">
            <CircularProgress />
          </Fab>
        )}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {messageStatusUpading}
          </Alert>
        </Snackbar>
      </>
    )
  )
}

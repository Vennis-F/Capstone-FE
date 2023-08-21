import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import FormSelectField from 'libs/ui/components/FormSelectField'
import { FormTextField } from 'libs/ui/components/FormTextField'

import { CharacterFormInput, CharacterRole, Lane } from '../types'

export type CharacterFormProps = {
  defaultValues?: CharacterFormInput
  onSubmitClick(data: CharacterFormInput, reset: UseFormReset<CharacterFormInput>): void
}

export const CharacterForm = (props: CharacterFormProps) => {
  const { t } = useTranslation()

  const { defaultValues = { name: '', description: '', imgUrl: '' }, onSubmitClick } = props

  const newCharacterValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('home.form.validation.name-required'))
      .max(20, t('home.form.validation.name-max', { num: 20 })),
    description: Yup.string().required(t('home.form.validation.description-required')),
    imgUrl: Yup.string().required(t('Please image URL cannot be empty')),
    role: Yup.string().required('Please role cannot be empty'),
  })

  const methods = useForm<CharacterFormInput>({
    defaultValues,
    resolver: yupResolver(newCharacterValidationSchema),
  })

  const { control, reset, handleSubmit } = methods
  const submitHandler = (data: CharacterFormInput) => {
    onSubmitClick(data, reset)
  }

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <FormTextField name="name" label={t('home.form.name')} control={control} />
      <FormTextField name="description" label={t('home.form.description')} control={control} />
      <FormTextField name="imgUrl" label={t('home.form.imgUrl')} control={control} />
      <FormSelectField
        name="role"
        label={'role'}
        control={control}
        formInputOptions={Object.entries(CharacterRole)}
      />
      <FormSelectField
        name="lane"
        label={'lane'}
        control={control}
        formInputOptions={Object.entries(Lane)}
      />
      <Button onClick={handleSubmit(submitHandler)} variant={'contained'}>
        {'Thêm'}
      </Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        {t('home.buttons.reset')}
      </Button>
    </Stack>
  )
}

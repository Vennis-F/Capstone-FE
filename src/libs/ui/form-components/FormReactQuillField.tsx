import React from 'react'
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const modulesVideoImage = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
]

const formatsVideoImage = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export interface FormInputProps {
  name: string
  control: Control<any> // eslint-disable-line
  label: string
  placeholder?: string
  disable?: boolean
  isFull?: boolean
}

export const FormReactQuillField = ({
  name,
  control,
  placeholder,
  disable,
  isFull = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    // render={({ field: { onChange, value }, fieldState: { error } }) => (
    render={({ field: { onChange, value } }) => (
      <ReactQuill
        onChange={onChange}
        value={value}
        theme="snow"
        modules={isFull ? modulesVideoImage : modules}
        formats={isFull ? formatsVideoImage : formats}
        placeholder={placeholder}
        // className={{back}}
        style={{ height: '80px' }}
        readOnly={disable}
      />
    )}
  />
)

export default FormReactQuillField

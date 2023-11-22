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

export interface FormInputProps {
  name: string
  control: Control<any> // eslint-disable-line
  label: string
  placeholder?: string
  disable?: boolean
}

export const FormReactQuillField = (props: FormInputProps) => (
  <Controller
    name={props.name}
    control={props.control}
    // render={({ field: { onChange, value }, fieldState: { error } }) => (
    render={({ field: { onChange, value } }) => (
      <ReactQuill
        onChange={onChange}
        value={value}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={props.placeholder}
        // className={{back}}
        style={{ height: '80px' }}
        readOnly={props.disable}
      />
    )}
  />
)

export default FormReactQuillField

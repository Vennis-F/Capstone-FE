import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
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
  'image',
  'video',
]

type Props = {
  value: string
  placeholder: string
  handleChangeValue: React.Dispatch<React.SetStateAction<string>>
}

const ReactQuillCustom = (props: Props) => (
  <ReactQuill
    theme="snow"
    modules={modules}
    formats={formats}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.handleChangeValue}
  />
)

export default ReactQuillCustom

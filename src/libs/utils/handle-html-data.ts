import DOMPurify from 'dompurify'
import Parser from 'html-react-parser'

export const textFromHTMLCode = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Lấy nội dung văn bản từ phần tử body
  const { textContent } = doc.body
  return textContent === null ? '' : textContent
}

export const renderHTML = (htmlString: string) => Parser(DOMPurify.sanitize(htmlString))

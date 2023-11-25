import { useParams } from 'react-router-dom'

import PostDetailContainer from 'features/post/components/PostDetailContainer'

const BlogDetailPage = () => {
  const { id } = useParams()

  return <PostDetailContainer postId={id as string} />
}

export default BlogDetailPage

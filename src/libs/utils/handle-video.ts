const VIDEO_BASE_URL = `video`

export const getVideo = (path?: string | null): string => {
  if (!path) return ''
  return `${
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_BASE_CLOUD_URL
      : process.env.REACT_APP_API_BASE_LOCAL_URL
  }/${VIDEO_BASE_URL}?id=${path}`
}

// videoURL={!currChapterLecture ? '' : getVideo(currChapterLecture.video)}

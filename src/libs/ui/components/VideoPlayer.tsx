import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'

const VideoPlayer: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const playerRef = useRef<ReactPlayer | null>(null)

  // const handlePlayPause = () => {
  //   setPlaying(!playing)
  // }

  const handleProgress = (state: OnProgressProps) => {
    setPlayed(state.played)
    setDuration(state.loaded)
  }

  // const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const currPlayed = parseFloat(e.target.value)
  //   if (playerRef.current) {
  //     playerRef.current.seekTo(currPlayed)
  //   }
  //   setPlayed(currPlayed)
  // }

  console.log(playing, played, duration)
  useEffect(() => {
    if (played >= 0.8 && !isCompleted) {
      setIsCompleted(true)
      console.log('COMPLETED')
    }
  }, [played, isCompleted])

  return (
    <div>
      <ReactPlayer
        controls={true}
        ref={playerRef}
        url="https://capstone-be-7fef96e86ef9.herokuapp.com/video?id=courses/course_1/videos/4ec1be64-ccdd-4932-a0a4-92cd8fb02263.mp4"
        playing={playing}
        onProgress={handleProgress}
        onEnded={() => setPlaying(false)}
        width={'100%'}
      />

      {/* <div>
        <button onClick={handlePlayPause}>{playing ? 'Tạm dừng' : 'Xem'}</button>
      </div> */}

      {/* <div>
        <input type="range" min={0} max={1} step="any" value={played} onChange={handleSeek} />
      </div>

      <div>
        <p>Thời gian hiện tại: {Math.floor(played * duration)}</p>
        <p>Tổng thời lượng: {Math.floor(duration)}</p>
      </div> */}
    </div>
  )
}

export default VideoPlayer

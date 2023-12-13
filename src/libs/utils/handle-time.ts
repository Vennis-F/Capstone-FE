export const formatSecondToMinute = (second: number) => Math.round((second / 60) * 10) / 10

export const secondsToMinutesString = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60)
  const remainingSeconds: number = seconds % 60

  const minutesString: string = minutes.toString().padStart(2, '0')
  const secondsString: string = remainingSeconds.toString().padStart(2, '0')

  return `${minutesString}:${secondsString}`
}

export const formatSecondToHour = (second: number) => Math.round((second / 60 / 60) * 10) / 10

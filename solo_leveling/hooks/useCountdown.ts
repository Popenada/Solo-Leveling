import { useEffect, useRef, useState } from 'react'

interface useCountdownProps {
    initialSeconds: number
    onComplete?: () => void
    autoStart?: boolean
}
export default function useCountdown({initialSeconds, onComplete, autoStart}: useCountdownProps){
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) 
          clearInterval(intervalRef.current)
          setIsRunning(true)
          setIsComplete(false)
          onComplete?.()
          return 0

        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])
  
  const start = () => { setIsComplete(false); setIsRunning(true)}
  const pause = () => setIsRunning(false)
  const reset = () => { setSecondsLeft(initialSeconds); setIsRunning(false); setIsComplete(false) }
  const resume = () => setIsRunning(true)

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100
  return { secondsLeft, minutes, seconds, reset, resume, pause, start, isRunning, isComplete, display, progress}
}

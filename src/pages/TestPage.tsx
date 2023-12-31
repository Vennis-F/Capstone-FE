import React, { useEffect, useRef, useState } from 'react'

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000') // Default color
  const [brushSize, setBrushSize] = useState(5) // Default brush size

  const getOffset = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const offsetX = clientX - rect.left
      const offsetY = clientY - rect.top
      return { offsetX, offsetY }
    }
    return { offsetX: 0, offsetY: 0 }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        setCtx(context)
      }
    }
  }, [])

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const clientX = 'touches' in nativeEvent ? nativeEvent.touches[0].clientX : nativeEvent.clientX
    const clientY = 'touches' in nativeEvent ? nativeEvent.touches[0].clientY : nativeEvent.clientY

    if (ctx) {
      const { offsetX, offsetY } = getOffset(clientX, clientY)
      ctx.beginPath()
      ctx.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    const clientX = 'touches' in nativeEvent ? nativeEvent.touches[0].clientX : nativeEvent.clientX
    const clientY = 'touches' in nativeEvent ? nativeEvent.touches[0].clientY : nativeEvent.clientY

    const { offsetX, offsetY } = getOffset(clientX, clientY)
    ctx.lineWidth = brushSize
    ctx.strokeStyle = color
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
  }

  const endDrawing = () => {
    if (ctx) {
      ctx.closePath()
      setIsDrawing(false)
    }
  }

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800} // Adjust canvas size as needed
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        style={{ border: '1px solid black' }}
      />
      <div>
        <label htmlFor="colorPicker">Select color:</label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="brushSize">Brush size:</label>
        <input
          type="range"
          id="brushSize"
          min={1}
          max={20}
          value={brushSize}
          onChange={e => setBrushSize(Number(e.target.value))}
        />
      </div>
      <button onClick={clearCanvas}>Clear canvas</button>
    </div>
  )
}

export default DrawingCanvas

import React, { useEffect, useRef, useState } from 'react'

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000') // Màu sắc mặc định
  const [brushSize, setBrushSize] = useState(5) // Độ dày nét vẽ mặc định

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        setCtx(context)
      }
    }
  }, [])

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (ctx) {
      const { offsetX, offsetY } = nativeEvent
      ctx.beginPath()
      ctx.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return
    const { offsetX, offsetY } = nativeEvent
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
        width={800} // Điều chỉnh kích thước canvas theo ý muốn
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        style={{ border: '1px solid black' }}
      />
      <div>
        <label htmlFor="colorPicker">Chọn màu:</label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="brushSize">Độ dày nét vẽ:</label>
        <input
          type="range"
          id="brushSize"
          min={1}
          max={20}
          value={brushSize}
          onChange={e => setBrushSize(Number(e.target.value))}
        />
      </div>
      <button onClick={clearCanvas}>Xóa trang</button>
    </div>
  )
}

export default DrawingCanvas

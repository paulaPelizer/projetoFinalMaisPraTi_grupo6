"use client"

import { useEffect, useRef } from "react"

export function DocumentStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Simulação de um gráfico de barras simples
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configurações
    const data = [65, 45, 30, 20, 15]
    const labels = ["Plantas", "Memoriais", "Cronogramas", "Orçamentos", "Outros"]
    const colors = ["#2563eb", "#4f46e5", "#7c3aed", "#9333ea", "#c026d3"]
    const barWidth = 40
    const spacing = 30
    const startX = 50
    const bottomY = 250
    const maxValue = Math.max(...data)

    // Desenhar barras
    data.forEach((value, index) => {
      const x = startX + index * (barWidth + spacing)
      const barHeight = (value / maxValue) * 200
      const y = bottomY - barHeight

      // Barra
      ctx.fillStyle = colors[index]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Valor
      ctx.fillStyle = "#000"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)

      // Label
      ctx.fillText(labels[index], x + barWidth / 2, bottomY + 15)
    })

    // Eixo Y
    ctx.beginPath()
    ctx.moveTo(30, 50)
    ctx.lineTo(30, bottomY)
    ctx.stroke()

    // Eixo X
    ctx.beginPath()
    ctx.moveTo(30, bottomY)
    ctx.lineTo(startX + data.length * (barWidth + spacing), bottomY)
    ctx.stroke()
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <canvas ref={canvasRef} width={400} height={300} className="max-w-full" />
    </div>
  )
}

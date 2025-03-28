"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function SkillsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels: ["JavaScript", "React", "Node.js", "UI/UX Design", "Database", "DevOps", "Testing", "Performance"],
            datasets: [
              {
                label: "Skill Level",
                data: [90, 95, 85, 80, 75, 70, 80, 85],
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderColor: "rgba(99, 102, 241, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(99, 102, 241, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(99, 102, 241, 1)",
              },
            ],
          },
          options: {
            scales: {
              r: {
                angleLines: {
                  display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
          },
        })
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="aspect-square w-full max-w-md mx-auto">
      <canvas ref={chartRef} />
    </div>
  )
}


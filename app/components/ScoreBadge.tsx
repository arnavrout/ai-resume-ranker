import React from 'react'

// ScoreBadge: display a small badge with a single <p> element inside
// Uses Tailwind utility classes for color and background
export default function ScoreBadge({score}: {score: number}) {
  let label = 'Needds Work'
  let bgClass = 'bg-badge-red'
  let textClass = 'text-red-600'

  if (score > 70) {
    label = 'Strong'
    bgClass = 'bg-badge-green'
    textClass = 'text-green-600'
  } else if (score > 49) {
    label = 'Good Start'
    bgClass = 'bg-badge-yellow'
    textClass = 'text-yellow-600'
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${bgClass}`}>
      <p className={`${textClass} text-sm font-semibold`}>{label}</p>
    </div>
  )
}

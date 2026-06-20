import React from 'react'

type Suggestion = { type: 'good' | 'improve'; tip: string }

interface ATSProps {
  score: number
  suggestions?: Suggestion[]
}

export default function ATS({ score, suggestions = [] }: ATSProps) {
  const bgFrom = score > 69 ? 'from-green-100' : score > 49 ? 'from-yellow-100' : 'from-red-100'
  const icon = score > 69 ? '/icons/ats-good.svg' : score > 49 ? '/icons/ats-warning.svg' : '/icons/ats-bad.svg'

  return (
    <div className={`rounded-2xl overflow-hidden shadow-md bg-linear-to-r ${bgFrom} to-white p-6`}> 
      {/* Top section */}
      <div className='flex items-center gap-4 mb-4'>
        <div className='w-12 h-12 flex items-center justify-center bg-white/60 rounded-full'>
          <img src={icon} alt='ats icon' className='w-7 h-7'/>
        </div>
        <div>
          <h3 className='text-lg font-bold'>ATS Score - {score}/100</h3>
          <p className='text-sm text-gray-600'>How well your resume passes applicant tracking systems</p>
        </div>
      </div>

      {/* Description */}
      <div className='mb-4'>
        <h4 className='text-sm font-semibold'>Summary</h4>
        <p className='text-sm text-gray-500'>This section highlights how compatible your resume is with common ATS parsing and keyword-matching. Follow the suggestions below to improve your chances of being found by recruiters.</p>
      </div>

      {/* Suggestions list */}
      <ul className='space-y-3 mb-4'>
        {suggestions.length === 0 ? (
          <li className='text-sm text-gray-500'>No suggestions available.</li>
        ) : (
          suggestions.map((sugg, idx) => {
            const sugIcon = sugg.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'
            return (
              <li key={idx} className='flex items-start gap-3'>
                <img src={sugIcon} alt={sugg.type} className='w-5 h-5 mt-1'/>
                <p className='text-sm text-gray-700'>{sugg.tip}</p>
              </li>
            )
          })
        )}
      </ul>

      {/* Closing line */}
      <p className='text-sm text-gray-600'>Keep iterating on these suggestions to increase your ATS compatibility.</p>
    </div>
  )
}

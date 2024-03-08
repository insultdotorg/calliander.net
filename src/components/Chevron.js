import * as React from 'react'

const Chevron = ({ right = false }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {right
        ? <polyline points="9 18 15 12 9 6"></polyline>
        : <polyline points="15 18 9 12 15 6"></polyline>
      }
    </svg>
  )
}

export default Chevron

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle */}
          <circle cx="16" cy="16" r="12" fill="#8AD62B" />

          {/* Speaker dots */}
          <circle cx="16" cy="5.5" r="1.5" fill="#050505" />
          <circle cx="26.5" cy="16" r="1.5" fill="#050505" />
          <circle cx="16" cy="26.5" r="1.5" fill="#050505" />
          <circle cx="5.5" cy="16" r="1.5" fill="#050505" />

          {/* Center ring */}
          <circle cx="16" cy="16" r="7" fill="#050505" />

          {/* Inner circle */}
          <circle cx="16" cy="16" r="4.5" fill="#F6C21A" />

          {/* Center dot */}
          <circle cx="16" cy="16" r="3" fill="#050505" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

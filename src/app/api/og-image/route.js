import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2785ca',
            backgroundImage: 'linear-gradient(135deg, #2785ca 0%, #1f6ea5 100%)',
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              backgroundColor: 'white',
              borderRadius: '50%',
              marginBottom: 30,
            }}
          >
            <span style={{ fontSize: 48, color: '#2785ca' }}>🎧</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 10 }}>
            Wearist
          </div>
          <div style={{ fontSize: 24, fontWeight: 400, opacity: 0.9 }}>
            Premium Tech Accessories
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}
'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <p style={{ color: 'red', fontSize: '1.2rem' }}>❌ {error.message}</p>
      <button
        onClick={reset}
        style={{ marginTop: 16, padding: '8px 20px', borderRadius: 8, cursor: 'pointer' }}
      >
        Try again
      </button>
    </main>
  )
}
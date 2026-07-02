export default function Loading() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>😄 Joke App</h1>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            background: '#f3f4f6',
            borderRadius: 12,
            padding: '1.25rem',
            marginBottom: '1rem',
            height: 80,
            animation: 'pulse 1.5s infinite',
          }}
        />
      ))}
    </main>
  )
}
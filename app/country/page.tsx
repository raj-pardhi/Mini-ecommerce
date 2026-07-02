type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
        🛍️ Fake Store
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 14,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {/* Product Image */}
            <div
              style={{
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f9fafb',
                borderRadius: 10,
                padding: '1rem',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Category */}
            <span
              style={{
                fontSize: 11,
                background: '#eff6ff',
                color: '#1d4ed8',
                padding: '2px 10px',
                borderRadius: 20,
                width: 'fit-content',
                textTransform: 'capitalize',
              }}
            >
              {product.category}
            </span>

            {/* Title */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#111827',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.title}
            </p>

            {/* Rating */}
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>

            {/* Price */}
            <p style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>
              ${product.price}
            </p>

            {/* Button */}
            <button
              style={{
                marginTop: 'auto',
                background: '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.6rem 1rem',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyIcon}>🔍</p>
        <h3 style={styles.emptyTitle}>No products found</h3>
        <p style={styles.emptySub}>Try a different search term</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          index={i}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24,
    padding: '32px 0',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 24px',
    color: 'var(--text-muted)',
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: 'var(--text)',
    marginBottom: 8,
  },
  emptySub: { fontSize: 14 },
};
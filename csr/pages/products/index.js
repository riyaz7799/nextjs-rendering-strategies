import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ProductGrid from '../../components/ProductGrid';

export default function CSRProductsPage() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [cartCount, setCartCount]   = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(r => r.json())
      .then(data => { setProducts(data.products); setLoading(false); })
      .catch(() => { setError('Failed to load products'); setLoading(false); });
  }, []);

  const handleAddToCart = () => setCartCount(c => c + 1);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="NexMart — CSR">
      <Header
        cartCount={cartCount}
        onSearch={setSearch}
        searchValue={search}
        badge="csr"
      />

      <main className="page-wrapper">
        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Product Catalog</h1>
          <p style={styles.heroSub}>
            <span className="badge badge-csr">● CSR — Client-Side Rendering</span>
            &nbsp; Data fetched in browser after page load
          </p>
          {!loading && (
            <p style={styles.count}>
              Showing <strong>{filtered.length}</strong> of <strong>{products.length}</strong> products
            </p>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div style={styles.skeletonGrid}>
            {Array(8).fill(0).map((_, i) => (
              <div key={i} style={styles.skeletonCard}>
                <div className="skeleton" style={styles.skeletonImg} />
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="skeleton" style={{ height: 12, width: '40%' }} />
                  <div className="skeleton" style={{ height: 18, width: '90%' }} />
                  <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  <div className="skeleton" style={{ height: 36, width: '100%', marginTop: 8 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-box">
            <h2>⚠️ {error}</h2>
            <p>Please check your connection and try again.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <ProductGrid products={filtered} onAddToCart={handleAddToCart} />
        )}
      </main>
    </Layout>
  );
}

const styles = {
  hero: {
    padding: '56px 0 24px',
    borderBottom: '1px solid var(--border)',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 900,
    background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 12,
  },
  heroSub: {
    color: 'var(--text-muted)',
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  count: {
    marginTop: 16,
    color: 'var(--text-muted)',
    fontSize: 13,
  },
  skeletonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24,
    padding: '32px 0',
  },
  skeletonCard: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
  },
  skeletonImg: { height: 200, borderRadius: 0 },
};
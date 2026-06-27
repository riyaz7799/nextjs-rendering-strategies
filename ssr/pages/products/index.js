import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ProductGrid from '../../components/ProductGrid';

export default function SSRProductsPage({ products }) {
  const [search, setSearch]       = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => setCartCount(c => c + 1);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="NexMart — SSR">
      <Header cartCount={cartCount} onSearch={setSearch} searchValue={search} badge="ssr" />
      <main className="page-wrapper">
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Product Catalog</h1>
          <p style={styles.heroSub}>
            <span className="badge badge-ssr">● SSR — Server-Side Rendering</span>
            &nbsp; HTML generated fresh on every request
          </p>
          <p style={styles.count}>
            Showing <strong>{filtered.length}</strong> of <strong>{products.length}</strong> products
          </p>
        </div>
        <ProductGrid products={filtered} onAddToCart={handleAddToCart} />
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=20');
    const data = await res.json();
    return { props: { products: data.products } };
  } catch {
    return { props: { products: [] } };
  }
}

const styles = {
  hero: { padding: '56px 0 24px', borderBottom: '1px solid var(--border)', marginBottom: 8 },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900,
    background: 'linear-gradient(135deg, var(--text) 0%, #60a5fa 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12,
  },
  heroSub: { color: 'var(--text-muted)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  count: { marginTop: 16, color: 'var(--text-muted)', fontSize: 13 },
};
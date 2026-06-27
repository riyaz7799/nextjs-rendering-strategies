import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

export default function CSRProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    setCartCount(c => c + 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Layout title={product ? `${product.title} — NexMart` : 'NexMart'}>
      <Header cartCount={cartCount} badge="csr" />
      <main className="page-wrapper" style={{ paddingTop: 40 }}>
        <Link href="/products" style={styles.back}>← Back to Products</Link>

        {loading && (
          <div style={styles.detailGrid}>
            <div className="skeleton" style={{ height: 420, borderRadius: 16 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
              {[80, 200, 120, 60, 300, 48].map((h, i) => (
                <div key={i} className="skeleton" style={{ height: h, borderRadius: 8 }} />
              ))}
            </div>
          </div>
        )}

        {!loading && product && <ProductDetailView product={product} onAdd={handleAdd} added={added} />}
        {!loading && !product && (
          <div className="error-box"><h2>Product not found</h2></div>
        )}
      </main>
    </Layout>
  );
}

function ProductDetailView({ product, onAdd, added }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div style={styles.detailGrid}>
      {/* Images */}
      <div>
        <div style={styles.mainImgWrap}>
          <img src={images[activeImg]} alt={product.title} style={styles.mainImg}
            onError={e => e.target.src = product.thumbnail} />
        </div>
        {images.length > 1 && (
          <div style={styles.thumbRow}>
            {images.slice(0, 5).map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)}
                style={{ ...styles.thumb, ...(activeImg === i ? styles.thumbActive : {}) }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => e.target.src = product.thumbnail} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <span style={styles.catLabel}>{product.category}</span>
        <h1 data-testid="product-title" style={styles.detailTitle}>{product.title}</h1>
        <p style={styles.brand}>by {product.brand || 'Unknown Brand'}</p>

        {/* Rating */}
        <div style={styles.ratingRow}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: i <= Math.round(product.rating) ? '#f0a500' : 'var(--border)', fontSize: 18 }}>★</span>
          ))}
          <span style={styles.ratingText}>{product.rating?.toFixed(1)} / 5</span>
        </div>

        <p style={styles.desc}>{product.description}</p>

        {/* Price block */}
        <div style={styles.priceBlock}>
          <span style={styles.detailPrice}>${product.price}</span>
          {product.discountPercentage && (
            <span style={styles.discountTag}>{Math.round(product.discountPercentage)}% OFF</span>
          )}
        </div>

        {/* Stock */}
        <div style={styles.stockBar}>
          <div style={{ ...styles.stockFill, width: `${Math.min((product.stock / 100) * 100, 100)}%` }} />
        </div>
        <p style={styles.stockText}>
          {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
        </p>

        {/* Button */}
        <button data-testid="add-to-cart-btn" onClick={onAdd}
          style={{ ...styles.detailBtn, ...(added ? styles.detailBtnAdded : {}) }}>
          {added ? '✓ Added to Cart!' : '+ Add to Cart'}
        </button>

        {/* Meta */}
        <div style={styles.metaGrid}>
          {[
            ['SKU', product.sku || 'N/A'],
            ['Weight', product.weight ? `${product.weight}g` : 'N/A'],
            ['Warranty', product.warrantyInformation || 'N/A'],
            ['Shipping', product.shippingInformation || 'N/A'],
          ].map(([k, v]) => (
            <div key={k} style={styles.metaItem}>
              <span style={styles.metaKey}>{k}</span>
              <span style={styles.metaVal}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  back: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: 'var(--text-muted)', fontSize: 14, marginBottom: 32,
    transition: 'var(--transition)',
    padding: '8px 16px', border: '1px solid var(--border)',
    borderRadius: 999, background: 'var(--bg3)',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    paddingBottom: 80,
    '@media(max-width:768px)': { gridTemplateColumns: '1fr' },
  },
  mainImgWrap: {
    height: 420, borderRadius: 'var(--radius)',
    overflow: 'hidden', background: 'var(--bg3)',
    border: '1px solid var(--border)',
  },
  mainImg: { width: '100%', height: '100%', objectFit: 'cover' },
  thumbRow: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  thumb: {
    width: 64, height: 64, borderRadius: 8, overflow: 'hidden',
    cursor: 'pointer', border: '2px solid var(--border)',
    transition: 'var(--transition)',
  },
  thumbActive: { borderColor: 'var(--accent)' },
  info: { display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 },
  catLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--accent)',
  },
  detailTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
    fontWeight: 900, lineHeight: 1.2, color: 'var(--text)',
  },
  brand: { fontSize: 13, color: 'var(--text-muted)' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, color: 'var(--text-muted)', marginLeft: 8 },
  desc: { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 },
  priceBlock: { display: 'flex', alignItems: 'center', gap: 12 },
  detailPrice: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36, fontWeight: 900, color: 'var(--accent)',
  },
  discountTag: {
    background: 'rgba(240,165,0,0.15)',
    color: 'var(--accent)', border: '1px solid rgba(240,165,0,0.3)',
    padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700,
  },
  stockBar: {
    height: 4, background: 'var(--border)',
    borderRadius: 999, overflow: 'hidden',
  },
  stockFill: {
    height: '100%', background: 'var(--accent)',
    borderRadius: 999, transition: 'width 0.6s ease',
  },
  stockText: { fontSize: 12, color: 'var(--text-muted)' },
  detailBtn: {
    padding: '14px 24px', background: 'var(--accent)',
    color: '#000', border: 'none', borderRadius: 'var(--radius-sm)',
    fontWeight: 700, fontSize: 15, cursor: 'pointer',
    transition: 'var(--transition)', letterSpacing: '0.05em',
  },
  detailBtnAdded: { background: 'var(--success)', color: '#fff' },
  metaGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
    background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: 16, marginTop: 8,
  },
  metaItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  metaKey: { fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  metaVal: { fontSize: 13, color: 'var(--text)', fontWeight: 500 },
};
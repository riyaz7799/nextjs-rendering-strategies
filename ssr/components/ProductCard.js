import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null;

  const stars = Math.round(product.rating || 0);

  return (
    <div
      data-testid="product-item"
      className="fade-in-up"
      style={{ ...styles.card, animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} style={styles.imageWrap}>
        {!imgError ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            style={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={styles.imgFallback}>📦</div>
        )}
        {discount && (
          <span style={styles.discountBadge}>-{discount}%</span>
        )}
        <div style={styles.imageOverlay} />
      </Link>

      {/* Content */}
      <div style={styles.content}>
        <p style={styles.category}>{product.category}</p>

        <Link href={`/products/${product.id}`}>
          <h3 style={styles.title}>{product.title}</h3>
        </Link>

        {/* Stars */}
        <div style={styles.stars}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: i <= stars ? '#f0a500' : 'var(--border)', fontSize: 12 }}>
              ★
            </span>
          ))}
          <span style={styles.ratingNum}>({product.rating?.toFixed(1)})</span>
        </div>

        {/* Price row */}
        <div style={styles.priceRow}>
          <span style={styles.price}>${product.price}</span>
          {product.stock < 10 && (
            <span style={styles.stockWarn}>Only {product.stock} left!</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          data-testid="add-to-cart-btn"
          onClick={handleAdd}
          style={{
            ...styles.btn,
            ...(added ? styles.btnAdded : {}),
          }}
        >
          {added ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    transition: 'var(--transition)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  imageWrap: {
    display: 'block',
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    background: 'var(--bg3)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  imgFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
    background: 'var(--bg3)',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'var(--accent)',
    color: '#000',
    fontWeight: 700,
    fontSize: 11,
    padding: '3px 8px',
    borderRadius: 999,
    zIndex: 2,
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  category: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text)',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  ratingNum: {
    fontSize: 11,
    color: 'var(--text-muted)',
    marginLeft: 4,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--accent)',
    fontFamily: "'Playfair Display', serif",
  },
  stockWarn: {
    fontSize: 10,
    color: '#f87171',
    fontWeight: 600,
  },
  btn: {
    marginTop: 8,
    width: '100%',
    padding: '10px',
    background: 'var(--accent)',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.05em',
    transition: 'var(--transition)',
    cursor: 'pointer',
  },
  btnAdded: {
    background: 'var(--success)',
    color: '#fff',
  },
};
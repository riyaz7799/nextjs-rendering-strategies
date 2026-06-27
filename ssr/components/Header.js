import { useState } from 'react';
import Link from 'next/link';

export default function Header({ cartCount = 0, onSearch, searchValue = '', badge = 'csr' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const badgeLabels = { csr: 'CSR', ssr: 'SSR', ssg: 'SSG' };
  const badgeDesc = {
    csr: 'Client-Side Rendering',
    ssr: 'Server-Side Rendering',
    ssg: 'Static Site Generation',
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        {/* Logo */}
        <Link href="/products" style={styles.logo}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>NEXMART</span>
        </Link>

        {/* Badge */}
        <div className={`badge badge-${badge}`} style={{ marginLeft: 16 }}>
          <span style={styles.dot} />
          {badgeLabels[badge]} — {badgeDesc[badge]}
        </div>

        {/* Search */}
        {onSearch !== undefined && (
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              data-testid="search-input"
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        )}

        {/* Cart */}
        <div style={styles.cartWrap}>
          <span style={styles.cartIcon}>🛒</span>
          <span style={styles.cartLabel}>Cart</span>
          <span data-testid="cart-count" style={styles.cartCount}>
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10,10,15,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    padding: '0 24px',
  },
  headerInner: {
    maxWidth: 1400,
    margin: '0 auto',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: 28,
    color: 'var(--accent)',
    lineHeight: 1,
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 900,
    color: 'var(--text)',
    letterSpacing: '0.12em',
  },
  dot: {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'currentColor',
    animation: 'pulse 2s infinite',
  },
  searchWrap: {
    flex: 1,
    maxWidth: 400,
    marginLeft: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    fontSize: 18,
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: 999,
    padding: '10px 16px 10px 40px',
    color: 'var(--text)',
    fontSize: 14,
    outline: 'none',
    transition: 'var(--transition)',
    fontFamily: "'DM Sans', sans-serif",
  },
  cartWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: 999,
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  cartIcon: { fontSize: 18 },
  cartLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--text-muted)',
  },
  cartCount: {
    background: 'var(--accent)',
    color: '#000',
    fontWeight: 700,
    fontSize: 12,
    borderRadius: '50%',
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 22,
  },
};
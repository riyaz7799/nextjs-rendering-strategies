import Head from 'next/head';

export default function Layout({ children, title = 'NexMart' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="NexMart — Premium Product Catalog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>" />
      </Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {children}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            ⬡ <strong>NexMart</strong> — Built with Next.js · Rendering Strategy Demo
          </p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '32px 24px',
    textAlign: 'center',
    marginTop: 80,
  },
  footerText: {
    color: 'var(--text-muted)',
    fontSize: 13,
    letterSpacing: '0.05em',
  },
};
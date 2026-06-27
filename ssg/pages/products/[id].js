import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

export default function SSGProductDetail({ product }) {
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded]         = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return (
    <Layout><Header badge="ssg" /><div className="error-box"><h2>Product not found</h2></div></Layout>
  );

  const images = product.images?.length ? product.images : [product.thumbnail];
  const handleAdd = () => { setCartCount(c => c + 1); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return (
    <Layout title={`${product.title} — NexMart SSG`}>
      <Header cartCount={cartCount} badge="ssg" />
      <main className="page-wrapper" style={{ paddingTop: 40 }}>
        <Link href="/products" style={styles.back}>← Back to Products</Link>
        <div style={styles.detailGrid}>
          <div>
            <div style={styles.mainImgWrap}>
              <img src={images[activeImg]} alt={product.title} style={styles.mainImg}
                onError={e => e.target.src = product.thumbnail} />
            </div>
            {images.length > 1 && (
              <div style={styles.thumbRow}>
                {images.slice(0,5).map((img,i) => (
                  <div key={i} onClick={() => setActiveImg(i)}
                    style={{...styles.thumb,...(activeImg===i?styles.thumbActive:{})}}>
                    <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={styles.info}>
            <span style={styles.catLabel}>{product.category}</span>
            <h1 data-testid="product-title" style={styles.detailTitle}>{product.title}</h1>
            <p style={styles.brand}>by {product.brand || 'Unknown Brand'}</p>
            <div style={styles.ratingRow}>
              {[1,2,3,4,5].map(i=>(
                <span key={i} style={{color:i<=Math.round(product.rating)?'#f0a500':'var(--border)',fontSize:18}}>★</span>
              ))}
              <span style={{fontSize:13,color:'var(--text-muted)',marginLeft:8}}>{product.rating?.toFixed(1)} / 5</span>
            </div>
            <p style={styles.desc}>{product.description}</p>
            <div style={styles.priceBlock}>
              <span style={styles.detailPrice}>${product.price}</span>
              {product.discountPercentage&&(
                <span style={styles.discountTag}>{Math.round(product.discountPercentage)}% OFF</span>
              )}
            </div>
            <p style={{fontSize:12,color:'var(--text-muted)'}}>{product.stock} units in stock</p>
            <button data-testid="add-to-cart-btn" onClick={handleAdd}
              style={{...styles.detailBtn,...(added?styles.detailBtnAdded:{})}}>
              {added?'✓ Added to Cart!':'+ Add to Cart'}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res  = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();
  const paths = data.products.map(p => ({ params: { id: String(p.id) } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const res     = await fetch(`https://dummyjson.com/products/${params.id}`);
    const product = await res.json();
    if (!product.id) return { notFound: true };
    return { props: { product }, revalidate: 60 };
  } catch {
    return { notFound: true };
  }
}

const styles = {
  back:{display:'inline-flex',alignItems:'center',gap:6,color:'var(--text-muted)',fontSize:14,marginBottom:32,padding:'8px 16px',border:'1px solid var(--border)',borderRadius:999,background:'var(--bg3)'},
  detailGrid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,paddingBottom:80},
  mainImgWrap:{height:420,borderRadius:'var(--radius)',overflow:'hidden',background:'var(--bg3)',border:'1px solid var(--border)'},
  mainImg:{width:'100%',height:'100%',objectFit:'cover'},
  thumbRow:{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'},
  thumb:{width:64,height:64,borderRadius:8,overflow:'hidden',cursor:'pointer',border:'2px solid var(--border)',transition:'var(--transition)'},
  thumbActive:{borderColor:'#4ade80'},
  info:{display:'flex',flexDirection:'column',gap:16,paddingTop:8},
  catLabel:{fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#4ade80'},
  detailTitle:{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,lineHeight:1.2,color:'var(--text)'},
  brand:{fontSize:13,color:'var(--text-muted)'},
  ratingRow:{display:'flex',alignItems:'center',gap:4},
  desc:{fontSize:15,color:'var(--text-muted)',lineHeight:1.7},
  priceBlock:{display:'flex',alignItems:'center',gap:12},
  detailPrice:{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:900,color:'#4ade80'},
  discountTag:{background:'rgba(74,222,128,0.15)',color:'#4ade80',border:'1px solid rgba(74,222,128,0.3)',padding:'4px 10px',borderRadius:999,fontSize:12,fontWeight:700},
  detailBtn:{padding:'14px 24px',background:'#4ade80',color:'#000',border:'none',borderRadius:'var(--radius-sm)',fontWeight:700,fontSize:15,cursor:'pointer',transition:'var(--transition)'},
  detailBtnAdded:{background:'var(--success)',color:'#fff'},
};
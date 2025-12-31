export default function Product({ params }) {
  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto', border: '1px solid #eee', borderRadius: '20px', marginTop: '50px' }}>
      <h2 style={{ color: '#0070f3' }}>STANLEY</h2>
      <h1>Classic Travel Mug</h1>
      <p>To jest Twój pierwszy działający produkt w systemie Giviu.</p>
      <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        ID z adresu: <strong>{params.id}</strong>
      </div>
    </div>
  )
}

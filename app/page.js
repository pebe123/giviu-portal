export default function Home() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f0f0f0' 
    }}>
      <h1 style={{ color: '#0070f3', fontSize: '3rem' }}>GIVIU PORTAL 🚀</h1>
      <p style={{ fontSize: '1.5rem' }}>Serwer działa poprawnie!</p>
      <a href="/product/1" style={{
        marginTop: '20px',
        padding: '10px 20px',
        background: '#0070f3',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>PRZEJDŹ DO PRODUKTU</a>
    </div>
  );
}

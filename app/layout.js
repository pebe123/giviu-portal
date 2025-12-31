import './globals.css';  // <--- TO JEST TA BRAKUJĄCA LINIA

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}

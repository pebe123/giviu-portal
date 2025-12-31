import './globals.css'

export const metadata = {
  title: 'Giviu - Premium Business Gifts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}

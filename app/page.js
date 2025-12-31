export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 font-sans">
      <div className="bg-white p-12 rounded-[40px] shadow-xl text-center max-w-lg border border-gray-100">
        <h1 className="text-4xl font-black text-blue-600 mb-4">GIVIU PORTAL 🚀</h1>
        <p className="text-gray-500 mb-8 text-lg">Twoja technologia Next.js właśnie została pomyślnie uruchomiona.</p>
        <a href="/product/1" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 inline-block">
          ZOBACZ STRONĘ PRODUKTU
        </a>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 p-8 h-[calc(100vh-64px)] bg-gradient-to-b from-stone-50 via-amber-50/30 to-white rounded-2xl">
      <h1 
        className="font-display font-black text-4xl sm:text-5xl tracking-tight block"
        style={{ color: '#dc2626', opacity: 1 }}
      >
        Bienvenido a CookMatch
      </h1>
      
      <p className="text-stone-700 text-lg max-w-lg leading-relaxed">
        Encontrá las mejores <span className="text-orange-500 font-semibold">recetas</span> según los <span className="text-amber-700 font-semibold">ingredientes</span> que tenés disponibles hoy en tu cocina.
      </p>
    </div>
  );
}

export default HomePage;

function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display font-bold text-3xl text-ink">
        Bienvenido a CookMatch
      </h1>
      <p className="text-ink/70">
        Encontrá recetas según los ingredientes que tenés disponibles en tu cocina.
      </p>
    </div>
  );
}

export default HomePage;
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import HomePage from "./pages/homePage";
import EtiquetasPage from "./pages/etiquetaPage";
import IngredientesPage from "./pages/ingredientePage";
import UtensiliosPage from "./pages/utensilioPage";
import TiposRestriccionPage from "./pages/tipo_restriccionPage";
import "./index.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/etiquetas" element={<EtiquetasPage />} />
        <Route path="/ingredientes" element={<IngredientesPage />} />
        <Route path="/utensilios" element={<UtensiliosPage />} />
        <Route path="/tipo-restriccion" element={<TiposRestriccionPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
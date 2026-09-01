import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import HomePage from "./pages/homePage";
import EtiquetasPage from "./pages/etiquetaPage";
import IngredientesPage from "./pages/ingredientePage";
import UtensiliosPage from "./pages/utensilioPage";
import TiposRestriccionPage from "./pages/tipo_restriccionPage";
import RestriccionesAlimentariasPage from "./pages/restriccion_alimentariaPage";
import RecetasPage from "./pages/recetaPage";
import PasosPage from "./pages/pasoPage";
import BuscarPage from "./pages/buscarPage";
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
        <Route path="/restricciones-alimentarias" element={<RestriccionesAlimentariasPage />} />
        <Route path="/recetas" element={<RecetasPage />} />
        <Route path="/recetas/:recetaId/pasos" element={<PasosPage />} />
        <Route path="/buscar" element={<BuscarPage />} />

      </Routes>
    </Layout>
  );
}

export default App;
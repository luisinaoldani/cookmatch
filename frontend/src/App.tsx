import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import HomePage from "./pages/homePage";
import EtiquetasPage from "./pages/etiquetaPage";
import IngredientesPage from "./pages/ingredientePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/etiquetas" element={<EtiquetasPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
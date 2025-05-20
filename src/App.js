import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCatalog from "./pages/ProductCatalog";
import ProductDetail from "./pages/ProductDetail"; 

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
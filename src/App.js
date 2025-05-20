import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCatalog from "./pages/ProductCatalog";
import ProductDetail from "./pages/ProductDetail"; 
import Header from "./components/Header";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCatalog from "./pages/ProductCatalog";
import ProductDetail from "./pages/ProductDetail"; 
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext"; 

function App() {
  return (
    <div style={{ backgroundColor: "rgb(255, 255, 255)" }} className="min-h-screen">
      <CartProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ProductDetails} from './pages/ProductDetails';
import {Products} from './pages/Products';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to='/products'/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
    </Router>
  )
}

export default App

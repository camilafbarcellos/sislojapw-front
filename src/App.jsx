import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Fornecedor from './componentes/telas/fornecedor/Fornecedor';
import Produto from './componentes/telas/produto/Produto';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact="true" path="/fornecedores" element={<Fornecedor/>}/>
        <Route exact="true" path="/produtos" element={<Produto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Agregarapp from "./pages/agregarapp";  
import Auth from "./pages/Auth";
import Header from './components/header';
import Comentario from "./pages/comentarios";


function App() {
  return (
    <Router>
      <Header />  {/* Importamos el componente Header en app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<Agregarapp/>} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/comentarios" element={<Comentario />} />

      </Routes>
    </Router>
  );
}

export default App;


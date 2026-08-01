import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import JoinProject from './components/Common/JoinProject';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import './styles/responsive.css';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar />
      <AppRoutes />
      <JoinProject />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

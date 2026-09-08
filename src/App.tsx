import { NavigationProvider, useNav } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { UPS } from './pages/UPS';
import { Inverter } from './pages/Inverter';
import { Batteries } from './pages/Batteries';
import { Accessories } from './pages/Accessories';
import { Refurbished } from './pages/Refurbished';
import { Solar } from './pages/Solar';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProductDetail } from './pages/ProductDetail';

function PageContent() {
  const { currentPage } = useNav();

  const pages: Record<string, React.ReactNode> = {
    home: <Home />,
    products: <Products />,
    ups: <UPS />,
    inverter: <Inverter />,
    batteries: <Batteries />,
    accessories: <Accessories />,
    refurbished: <Refurbished />,
    solar: <Solar />,
    about: <About />,
    contact: <Contact />,
    'product-detail': <ProductDetail />,
  };

  return <>{pages[currentPage] ?? <Home />}</>;
}

export default function App() {
  return (
    <NavigationProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">
          <PageContent />
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  );
}

import { StoreProvider, useStore } from './context/Store'
import { Header, MobileNav, Footer } from './components/Shell'
import HomePage from './pages/Home'
import './styles.css'
import './home.css'
import './gourmet.css'
import GourmetPage from './pages/Gourmet'
import ShopPage from './pages/Shop'
import ProductPage from './pages/Product'
import CartPage from './pages/Cart'
import WhatsAppPage from './pages/WhatsApp'
import CookPage from './pages/Cook'
import AIPage from './pages/AI'
import RecipesPage from './pages/Recipes'
import LocalesPage from './pages/Locales'
import LonjaPage from './pages/Lonja'
import SocialPage from './pages/Social'
import AccountPage from './pages/Account'
import './pages.css'
import './experience.css'
import './cook.css'
import './mobile.css'

function Soon({ page }) {
  return (
    <section className="wrap soon">
      <span className="eyebrow">Próximo paso</span>
      <h2 style={{ textTransform: 'capitalize' }}>{page}</h2>
      <p>Esta sección se construye en los siguientes pasos de la demo.</p>
      <a className="btn" href="#/inicio">Volver al inicio</a>
    </section>
  )
}

const PAGES = {
  inicio: HomePage, gourmet: GourmetPage, tienda: ShopPage, producto: ProductPage, carrito: CartPage,
  whatsapp: WhatsAppPage, cocinar: CookPage, ia: AIPage, recetas: RecipesPage, receta: RecipesPage,
  locales: LocalesPage, lonja: LonjaPage, redes: SocialPage, cuenta: AccountPage,
}

function Router() {
  const { route, toast } = useStore()
  const Page = PAGES[route.page]
  return (
    <>
      <Header />
      <main key={route.page + (route.param || '')} className="page">
        {Page ? <Page /> : <Soon page={route.page} />}
      </main>
      <Footer />
      <MobileNav />
      {toast && <div key={toast.id} className="toast" role="status">{toast.text}</div>}
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  )
}

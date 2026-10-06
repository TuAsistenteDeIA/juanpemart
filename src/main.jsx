import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ?static → sin animaciones y con imágenes cargadas de golpe (para capturas de revisión)
if (location.search.includes('static')) {
  document.documentElement.classList.add('static')
  new MutationObserver(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'))).observe(document.body, { childList: true, subtree: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

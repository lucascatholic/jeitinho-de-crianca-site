import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { App } from "./App"
import "./index.css"

const root = document.getElementById("root")
if (!root) throw new Error("Elemento #root não encontrado")

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)

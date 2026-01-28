import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home } from './components/Home'
import { ProductProvider } from './context/producto.context'
import { NavigationProvider } from './context/navigation.context'
import { CartProvider } from './context/cart.context'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NavigationProvider>
            <ProductProvider>
                <CartProvider>
                    <Home />
                </CartProvider>
            </ProductProvider>
        </NavigationProvider>
    </StrictMode>,
)

import { createContext, useContext, ReactNode, useMemo } from 'react';

// Types
import type { CartItemType } from '../types/producto.type';

// Contexts
import { useProducts } from '../context/producto.context';

interface CartContextType {
    cartUpdated: CartItemType[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { cart, productos } = useProducts();

    // Sincronizar con el estado global de productos
    const cartUpdated = useMemo(() => {
        if (!productos || productos.length === 0) return cart;

        // Creamos un mapa para búsqueda O(1) del estado isActive
        const mapaEstados = new Map(productos.map(p => [p.id, p.isActive]));

        return cart.map((item): CartItemType => {
            const estadoActual = mapaEstados.get(item.id);
            return {
                ...item,
                isActive: estadoActual ?? item.isActive
            };
        });
    }, [cart, productos]); // Depende del estado global de productos

    return (
        <CartContext.Provider value={{ cartUpdated }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};
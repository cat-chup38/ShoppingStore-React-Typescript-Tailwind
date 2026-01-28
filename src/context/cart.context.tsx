import { createContext, useContext, useEffect, ReactNode, useMemo } from 'react';

// Types
import type { ProductoType, CartItemType } from '../types/producto.type';

// Contexts
import { useProducts } from '../context/producto.context';

// Hooks
import { useFetchProducts } from '../hooks/useFetchProducts';


interface CartContextType {
    cartUpdated: CartItemType[];
    // catalogoList: ProductoType[]; // Asegúrate de incluirlo si lo usas, aquí lo dejo para que no rompa tu interfaz
}

// 1. Se crea el objeto Contexto (inicialmente vacío)
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. El proveedor:
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { cart } = useProducts();
    const { products } = useFetchProducts();

    // Se debe usar useMemo en lugar de useState para recalcula la lista cada vez que el carrito o los productos de la API cambian.
    const cartUpdated = useMemo(() => {
        // 1. Si products aún no ha cargado, devolvemos el cart tal cual
        if (!products || products.length === 0) return cart;

        // 2. Indexamos los productos para búsqueda O(1)
        const mapaEstados = new Map(products.map(p => [p.id, p.isActive]));

        // 3. Mapeamos el carrito con la info actualizada
        return cart.map((item): CartItemType => { // Forzamos el tipo de retorno aquí
            const estadoDesdeApi = mapaEstados.get(item.id);

            return {
                ...item,
                // Si estadoDesdeApi es undefined, usamos item.isActive como respaldo
                // Esto asegura que siempre sea boolean y nunca undefined
                isActive: estadoDesdeApi ?? item.isActive
            };
        });
    }, [cart, products]); // Dependencias: se dispara si cambia el carrito o los productos

    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
        console.log("LocalStorage actualizado:", cart);
    }, [cart]);

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
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ProductoType, CartItemType } from '../types/producto.type';


interface ProductContextType {
    cart: CartItemType[];
    addToCart: (product: CartItemType) => void;
    removeToCart: (productId: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    productos: ProductoType[];
    setProductos: (products: ProductoType[]) => void;
}


const ProductContext = createContext<ProductContextType | undefined>(undefined);


export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [productos, setProductos] = useState<ProductoType[]>([]);
    const [cart, setCart] = useState<CartItemType[]>(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
        console.log("LocalStorage actualizado:", cart);
    }, [cart]);

    const addToCart = (product: ProductoType) => {
        if (!product.isActive) {
            console.warn(`No se puede agregar "${product.title}" - Producto desactivado`);
            alert(`El producto "${product.title}" está desactivado y no se puede agregar al carrito`);
            return;
        }

        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                    ? { ...item, cantidadPedido: item.cantidadPedido + 1 }
                    : item
                );
            }
            return [...prev, { ...product, cantidadPedido: 1 }];
        });
    };

    const removeToCart = (productId: number) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) => prev.map(item => {
            if (item.id === id) {
                const newQty = item.cantidadPedido + delta;
                return { ...item, cantidadPedido: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    return (
        <ProductContext.Provider
            value={{
                cart,
                addToCart,
                removeToCart,
                updateQuantity,
                productos,
                setProductos,
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProducts debe usarse dentro de un ProductProvider");
    return context;
};
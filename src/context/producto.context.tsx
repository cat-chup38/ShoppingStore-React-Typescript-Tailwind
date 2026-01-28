import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ProductoType, CartItemType } from '../types/producto.type';


interface ProductContextType {
    cart: CartItemType[];
    addToCart: (product: CartItemType) => void;
    removeToCart: (productId: number) => void;
    updateQuantity: (id: number, delta: number) => void;
}


// 2. Creamos el objeto Contexto (inicialmente vacío)
const ProductContext = createContext<ProductContextType | undefined>(undefined);


// 3. El PROVEEDOR (El que reparte la señal)
export const ProductProvider = ({ children }: { children: ReactNode }) => {
	// Se comentó porque ahora se guarda en LocalStorage
    // const [cart, setCart] = useState<ProductoType[]>([]);
	const [cart, setCart] = useState<CartItemType[]>(() => {
		const savedCart = localStorage.getItem('shopping-cart'); // Inicializamos el estado con lo que haya en LocalStorage (si existe)
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem('shopping-cart', JSON.stringify(cart)); // Cada vez que 'cart' cambie, se guarda en el navegador
		console.log("LocalStorage actualizado:", cart);
	}, [cart]); // Se ejecuta solo cuando 'cart' se modifica

    /* const addToCart = (product: ProductoType) => {
        setCart((prev) => [...prev, product]);
    }; */
    const addToCart = (product: ProductoType) => {
        setCart((prev) => {
            // Revisamos si ya existe para no duplicar filas, sino aumentar cantidad
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                    ? { ...item, cantidadPedido: item.cantidadPedido + 1 }
                    : item
                );
            }
            // Si es nuevo, le agregamos la propiedad cantidadPedido: 1
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
        <ProductContext.Provider value={{ cart, addToCart, removeToCart, updateQuantity }}>
            {children}
        </ProductContext.Provider>
    );
};

// 4. El Hook (La antena para conectarse)
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProducts debe usarse dentro de un ProductProvider");
    return context;
};
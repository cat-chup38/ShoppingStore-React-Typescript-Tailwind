import { useState, useEffect } from 'react';
import { getProducts } from '../services/product.service';
import { useProducts } from '../context/producto.context';


export const useFetchProducts = () => {
    const { productos, setProductos } = useProducts();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Solo se carga si productos está vacío (evita re-generación de isActive)
        if (productos.length > 0) {
            setLoading(false);
            return;
        }

        const loadProducts = async () => {
            try {
                const data = await getProducts();
                const listData = data.map((prod: any) => ({
                    ...prod,
                    isActive: Math.random() >= 0.5
                }));

                // Se guarda en el estado global en lugar de local
                setProductos(listData);

            } catch (err) {
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []); // Array de dependencias vacío - se ejecuta solo una vez

    // Retorna productos del estado global
    return { products: productos, loading, error };
};
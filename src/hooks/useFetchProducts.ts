import { useState, useEffect } from 'react';
import type { ProductoType } from '../types/producto.type';
import { getProducts } from '../services/product.service';


export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductoType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                const listData = data.map((prod: any) => ({
                    ...prod,
                    isActive: Math.random() >= 0.5
                }));

                setProducts(listData);
            } catch (err) {
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};
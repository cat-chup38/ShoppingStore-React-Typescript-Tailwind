import type { ProductoType } from '../types/producto.type';


const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async (): Promise<ProductoType[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al conectar con la API');

        return await response.json();
    } catch (error) {
        console.error("Error en el servicio de productos:", error);
        throw error;
    }
};
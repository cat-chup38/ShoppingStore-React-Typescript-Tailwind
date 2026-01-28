// Components
import { ProductoLista } from '../Catalogo/ProductoLista'

// Hooks
import { useFetchProducts } from '../../hooks/useFetchProducts';

// Types
// import type { ProductoType } from '../types/producto.type';


/* const mockProducts: ProductoType[] = [
    { "id": 1, "title": "Reloj", "price": 111, "isActive": true },
    { "id": 2, "title": "Anillo", "price": 222, "isActive": false },
    { "id": 3, "title": "Cámara", "price": 450, "isActive": true },
    { "id": 4, "title": "Auriculares", "price": 85, "isActive": true },
    { "id": 5, "title": "Teclado", "price": 120, "isActive": false },
    { "id": 6, "title": "Ratón", "price": 45, "isActive": true },
    { "id": 7, "title": "Monitor", "price": 300, "isActive": true },
    { "id": 8, "title": "Laptop", "price": 1200, "isActive": false },
    { "id": 9, "title": "Mochila", "price": 55, "isActive": true },
    { "id": 10, "title": "Lámpara", "price": 30, "isActive": true },
    { "id": 11, "title": "Smartphone", "price": 800, "isActive": false },
    { "id": 12, "title": "Altavoz", "price": 95, "isActive": true },
    { "id": 13, "title": "Tablet", "price": 350, "isActive": true },
    { "id": 14, "title": "Cargador", "price": 25, "isActive": false },
    { "id": 15, "title": "Gafas de Sol", "price": 150, "isActive": true }
]; */

export const Catalogo = () => {
    const { products, loading, error } = useFetchProducts();

    if (loading) return <div className="p-10 text-center">Cargando productos...</div>;
    if (error) return <div className="p-10 text-red-500">{error}</div>;

    return <ProductoLista rowItems={products}/>;
}
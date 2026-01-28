export interface ProductoType {
    id: number;
    title: string;      // La API usa 'title' en lugar de 'name'
    price: number;
    description: string;
    category: string;
    image: string;
    isActive: boolean;
}

export interface CartItemType extends ProductoType {
    cantidadPedido: number;
}
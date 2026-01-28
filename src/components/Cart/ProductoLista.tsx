// import type { ProductoType } from '../../types/producto.type';
import { Item } from './Item';
// import { useProducts } from '../../context/producto.context';
import { useCart } from '../../context/cart.context';


interface TableProps {
    // rowItems: ProductoType[];
}

export const CartLista: React.FC<TableProps> = ({ }) => {

    // const { cart } = useProducts()
    const { cartUpdated } = useCart()

    return (
        <div className="py-10 overflow-x-auto max-w-4xl mx-auto">
            <table className="min-w-full border border-gray-200 bg-white text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold"></th>
                        <th className="px-4 py-3 text-left font-semibold">Producto</th>
                        <th className="px-4 py-3 text-left font-semibold">Precio</th>
                        <th className="px-4 py-3 text-left font-semibold">Activo</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        cartUpdated.map((row, index) => (
                            <Item index={index} row={row} key={index}></Item>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

import type { ProductoType } from '../../types/producto.type';
import { Item } from './Item';


interface TableProps {
    rowItems: ProductoType[];
}

export const ProductoLista: React.FC<TableProps> = ({ rowItems }) => {
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
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        rowItems.map((row, index) => (
                            <Item index={index} row={row} key={index}></Item>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

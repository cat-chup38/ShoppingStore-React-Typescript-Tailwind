import type { CartItemType } from '../../types/producto.type';
import { useProducts } from '../../context/producto.context';


interface ItemProps {
    index: number;
    row: CartItemType;
}

export const Item: React.FC<ItemProps> = ({ index, row }) => {
    const { removeToCart, updateQuantity } = useProducts(); // Acciones del Context

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            {/*
            <td className="px-4 py-3 text-gray-800">
                <div className="h-8 w-8 rounded-lg bg-white-600 flex items-center justify-center border border-gray-400">
                    <span className="text-black font-bold text-sm">{row.title[0]}</span>
                </div>
            </td>
            */}
            <td className="px-4 py-3 text-gray-800">
                <div className="h-13 w-13 rounded-lg">
                    <img className="size-12" src={row.image} alt={index.toString()} />
                </div>
            </td>

            <td className="px-4 py-3 text-gray-800">{row.title}</td>
            <td className="px-4 py-3 text-gray-800">{row.price}</td>
            <td className="px-4 py-3">
                <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                `}>
                    {row.isActive ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                        onClick={() => updateQuantity(row.id, -1)}
                        disabled={row.cantidadPedido <= 0}
                    >
                        -
                    </button>

                    {/* <input
                        type="number"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={row.cantidadPedido}
                        onChange={(e) => updateQuantity(row.id, Number(e.target.value))}
                    /> */}
                    <span className="px-4 font-medium">{row.cantidadPedido}</span>

                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={() => updateQuantity(row.id, 1)}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="px-4 py-3">
                <button
                    onClick={() => removeToCart(row.id)}
                    disabled={!row.isActive}
                    className={`
                        flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300
                        bg-white text-slate-600 border-2 border-slate-200
                        ${row.isActive ? 'hover:border-indigo-400' : 'opacity-50 cursor-not-allowed'}
                    `}
                >
                    Quitar
                </button>
            </td>
        </tr>
    );
};
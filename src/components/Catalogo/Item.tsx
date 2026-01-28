import React, { useState } from 'react';
import type { CartItemType } from '../../types/producto.type';
import { useProducts } from '../../context/producto.context';


interface ItemProps {
    index: number;
    row: CartItemType;
}

export const Item: React.FC<ItemProps> = ({ index, row }) => {
    const { addToCart, removeToCart } = useProducts(); // Acciones del Context
    const { cart } = useProducts();

    // Se comentó porque ahora tiene que revisar si ya existe en el carrito que se guardo en LocalStorage
    // const [added, setAdded] = useState(false);
    const [added, setAdded] = useState(() =>
        cart.some(item => item.id === row.id)
    );

    const hanbleClicAddTo = () => {
        setAdded(!added);

        if (!added) addToCart(row);
        else removeToCart(row.id)
    };

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
                <button
                    onClick={hanbleClicAddTo}
                    disabled={!row.isActive}
                    className={`
                        flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300
                        ${added
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                            : 'bg-white text-slate-600 border-2 border-slate-200'
                        }
                        ${row.isActive ? 'hover:border-indigo-400' : 'opacity-50 cursor-not-allowed'}
                    `}
                >
                    {added ? 'Agregado' : 'Agregar'}
                </button>
            </td>
        </tr>
    );
};
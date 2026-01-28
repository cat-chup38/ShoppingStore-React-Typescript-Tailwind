// Components
import { NavBar } from './NavBar/NavBar'
import { Catalogo } from './Catalogo/Catalogo'
import { CartLista } from './Cart/ProductoLista'

// Context
import { useNavigation } from '../context/navigation.context';


export const Home = () => {
    const { currentView } = useNavigation();

    // Estructura de control para decidir qué componente mostrar
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return <Catalogo />;
            case 'cart':
                return <CartLista />;
            default:
                return <Catalogo />;
        }
    };

    return (
        <div className="min-h-screen">
            <NavBar title="ShoppingStore" />
            <main className="p-6">
                {renderContent()} {/* Renderizado de la View correspondiente */}
            </main>
        </div>
    );
}

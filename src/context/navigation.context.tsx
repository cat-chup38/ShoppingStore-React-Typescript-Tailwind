import { createContext, useContext, useState, ReactNode } from 'react';


export type View = 'home' | 'cart' | 'admin'; // Defir los tipos de vistas posibles (Type Safety)


interface NavigationContextType {
    currentView: View;
    navigateTo: (view: View) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [currentView, setCurrentView] = useState<View>('home');

    const navigateTo = (view: View) => setCurrentView(view); // Función para cambiar de vista

    return (
        <NavigationContext.Provider value={{ currentView, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Hook para usar la navegación
export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) throw new Error("useNavigation debe usarse dentro de NavigationProvider");
    return context;
};
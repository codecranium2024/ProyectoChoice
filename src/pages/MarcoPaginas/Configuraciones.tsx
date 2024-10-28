import { IonPage, IonIcon, IonButton, IonList, IonItem, IonLabel, IonToggle } from "@ionic/react";
import { moon } from 'ionicons/icons';
import { useState, useEffect } from "react";
import './../../components/MarcoComp/style.css';

export const Configuraciones = () => {
    // Estado para almacenar el modo oscuro
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Al cargar la página, verificar si el modo oscuro está activado en localStorage
        const darkModeEnabled = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkModeEnabled);

        // Aplicar la clase "dark" al body si el modo oscuro está activado
        if (darkModeEnabled) {
            document.body.classList.add("dark");
        }
    }, []);

    const toggleDarkModeHandler = () => {
        // Cambiar el estado del modo oscuro
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        // Guardar el estado en localStorage
        localStorage.setItem("darkMode", newDarkMode.toString());

        // Alternar la clase "dark" en el body
        document.body.classList.toggle("dark", newDarkMode);
    };

    return (
        <IonPage>
            <div className='PanelPrincipal'>
                <h1 className='TituloPagina'>Configuraciones</h1>
                <div className='PanelSecundario'> 
                    <h2 className='TituloN2'>Interfaz</h2>
                    <IonList>
                        <IonItem className='ItemIonList'>
                            <IonIcon slot="start" icon={moon} />
                            <IonLabel>Activar modo oscuro</IonLabel>
                            <IonToggle
                                slot="end"
                                name="darkMode"
                                checked={isDarkMode}
                                onIonChange={toggleDarkModeHandler}
                            />
                        </IonItem>
                    </IonList>
                </div>
            </div>
        </IonPage>
    )
};


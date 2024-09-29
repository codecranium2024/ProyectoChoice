import React from "react";
import {IonPage, IonCol, IonGrid, IonRow, IonIcon} from "@ionic/react";
import './../../components/MarcoComp/style.css';
import { SlOptionsVertical } from "react-icons/sl";
/* Basic CSS for apps built with Ionic */

function VisualizarComunidad() {
    return (
        <main className="PanelPrincipal">
            <h1 className="TituloPagina">Visualizar Comunidades</h1>
            <IonGrid className="TablaComunidad" fixed={true}>
                <IonRow>
                    <IonCol className="EncabezadoTabla">ID</IonCol>
                    <IonCol className="EncabezadoTabla">Nombre</IonCol>
                    <IonCol className="EncabezadoTabla">Habitantes</IonCol>
                    <IonCol className="EncabezadoTabla">Líder</IonCol>
                    <IonCol className="EncabezadoTabla">Municipio</IonCol>
                    <IonCol className="EncabezadoTabla">Departamento</IonCol>
                    <IonCol className="EncabezadoTabla">Proyecto</IonCol>
                </IonRow>
0
                <IonRow>
                    <IonCol className="CeldaTabla">1</IonCol>
                    <IonCol className="CeldaTabla">Abu Hermanto</IonCol>
                    <IonCol className="CeldaTabla">75</IonCol>
                    <IonCol className="CeldaTabla">José José</IonCol>
                    <IonCol className="CeldaTabla">Cobán</IonCol>
                    <IonCol className="CeldaTabla">Alta Verapaz</IonCol>
                    <IonCol className="CeldaTablaEstado" style={{ backgroundColor: "green" }}>En ejecución </IonCol>
                </IonRow>

            </IonGrid>
        </main>
      
    );
  }
  export default VisualizarComunidad;
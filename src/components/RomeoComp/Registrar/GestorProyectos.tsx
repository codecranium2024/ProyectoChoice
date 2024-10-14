// import React, { useState } from 'react';
// import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from '@ionic/react';
// import RegistrarProyecto from './RegistrarProyecto';
// import Historial from '../Historial/Historial';

// // Definición de la interfaz Proyecto
// interface Proyecto {
//   id: number;
//   nombre: string;
//   responsable: string;
//   estado: string;
// }

// const GestorProyectos: React.FC = () => {
//   const [proyectos, setProyectos] = useState<Proyecto[]>([
//     { id: 1, nombre: 'Proyecto A', responsable: 'Juan Pérez', estado: 'Finalizado' },
//     { id: 2, nombre: 'Proyecto B', responsable: 'Ana Gómez', estado: 'En Ejecucion' },
//     { id: 3, nombre: 'Proyecto C', responsable: 'Luis Martínez', estado: 'Finalizado' },
//   ]);

//   const [proyectosFinalizados, setProyectosFinalizados] = useState<Proyecto[]>([]);

//   const handleAddProyecto = (nuevoProyecto: Proyecto) => {
//     setProyectos([...proyectos, nuevoProyecto]);
//   };

//   const handleEditProyecto = (id: number, updatedProyecto: Proyecto) => {
//     const updatedProyectos = proyectos.map(proyecto =>
//       proyecto.id === id ? updatedProyecto : proyecto
//     );

//     if (updatedProyecto.estado === 'Finalizado') {
//       setProyectosFinalizados(prev => [...prev, updatedProyecto]);
//       setProyectos(updatedProyectos.filter(p => p.id !== id));
//     } else {
//       setProyectos(updatedProyectos);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Gestión de Proyectos</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <RegistrarProyecto 
//           onAddProyecto={handleAddProyecto} 
//           onEditProyecto={handleEditProyecto} 
//           proyectos={proyectos} 
//         />
//         <Historial proyectosFinalizados={proyectosFinalizados} />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default GestorProyectos;

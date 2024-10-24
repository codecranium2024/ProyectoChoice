import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonModal,
  IonInput,
  IonLabel,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonToast,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './RegistrarP.css';

interface Proyecto {
  idRegistrarProyecto: number;
  idCategoriaProyecto: number;
  Nombreclatura: string;
  Nombre: string;
  idUsuario: number;
  idestado: number;
  FechaInicio: string;
  FechaFinalizacion: string;
  Categoria: string;
  idComunidad: string;
  Responsable: string;
  Estado: string;
}

interface Categoria {
  idCategoriaProyecto: number;
  Categoria: string;
}

interface Responsable {
  idUsuario: number;
  Nombre: string;
}

interface Estado {
  idestado: number;
  Estadoproyecto: string;
}

const RegistrarProyecto: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [responsables, setResponsables] = useState<Responsable[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [comunidades, setComunidades] = useState<any[]>([]); // Define el estado para comunidades
  const [categoria, setCategoria] = useState<number | undefined>();
  const [nombreclatura, setNombreclatura] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [responsable, setResponsable] = useState<number | undefined>();
  const [idComunidad, setIdComunidad] = useState<string | undefined>();
  const [estado, setEstado] = useState<number | undefined>();
  const [fechainicio, setFechaInicio] = useState<string>('');
  const [fechaFinal, setFechaFinal] = useState<string>('');
  const [proyectoAEditar, setProyectoAEditar] = useState<Proyecto | null>(null);
  const [showToast, setShowToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  useEffect(() => {
    fetchProyectos();
    fetchCategorias();
    fetchResponsables();
    fetchEstados();
    fetchComunidades(); // Llama a la función para obtener comunidades
  }, []);

  const fetchProyectos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proyectos');
      setProyectos(response.data);
      //  console.log(response.data)
    } catch (error) {
      setShowToast({ show: true, message: 'Error al obtener los proyectos.' });
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categorias');
      setCategorias(response.data);
    } catch (error) {
      setShowToast({ show: true, message: 'Error al obtener las categorías.' });
    }
  };

  const fetchResponsables = async () => {
    try {
      const response = await axios.get('http://localhost:3000/responsables');
      setResponsables(response.data);
    } catch (error) {
      setShowToast({ show: true, message: 'Error al obtener los responsables.' });
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/estados');
      setEstados(response.data);
    } catch (error) {
      setShowToast({ show: true, message: 'Error al obtener los estados.' });
    }
  };

  const fetchComunidades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comunidades');
      setComunidades(response.data); 
      // console.log(response.data);// Almacena las comunidades
    } catch (error) {
      setShowToast({ show: true, message: 'Error al obtener las comunidades.' });
    }
  };

  const openRegisterModal = () => setIsRegisterModalOpen(true);

  const openEditModal = (proyecto: Proyecto) => {
    setProyectoAEditar(proyecto);
    setIsRegisterModalOpen(true); // Reutiliza el mismo modal
    // Rellena el formulario con los datos del proyecto
    setCategoria(proyecto.idCategoriaProyecto);
    setNombreclatura(proyecto.Nombreclatura);
    setNombre(proyecto.Nombre);
    setResponsable(proyecto.idUsuario);
    setIdComunidad(proyecto.idComunidad);
    setEstado(proyecto.idestado);
    setFechaInicio(proyecto.FechaInicio);
    setFechaFinal(proyecto.FechaFinalizacion);
  };
  

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    resetForm();
    setProyectoAEditar(null);
  };

  const resetForm = () => {
    setCategoria(undefined);
    setNombreclatura('');
    setNombre('');
    setResponsable(undefined);
    setIdComunidad(undefined);
    setEstado(undefined);
    setFechaInicio('');
    setFechaFinal('');
  };

  const handleAddProyecto = async () => {
    if (
      nombreclatura &&
      nombre &&
      responsable &&
      estado &&
      categoria &&
      fechainicio &&
      fechaFinal &&
      idComunidad // Asegúrate de que este campo se envía
    ) {
      const newProyecto = {
        idCategoriaProyecto: categoria,
        Nombreclatura: nombreclatura,
        Nombre: nombre,
        idUsuario: responsable,
        idComunidad: idComunidad,
        idestado: estado,
        FechaInicio: formatFecha(fechainicio),
        FechaFinalizacion: formatFecha(fechaFinal),
      };

      try {
        await axios.post('http://localhost:3000/RegistrarProyecto', newProyecto);
        await fetchProyectos(); // Actualiza la lista de proyectos
        setShowToast({ show: true, message: 'Proyecto agregado con éxito.' });
        closeModal();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setShowToast({ show: true, message: 'Error al agregar proyecto: ' + (error.response?.data?.error || error.message) });
        } else {
          setShowToast({ show: true, message: 'Error al agregar proyecto: Ocurrió un error desconocido.' });
        }
      }
    } else {
      setShowToast({ show: true, message: 'Por favor, completa todos los campos.' });
    }
  };

  

  const formatFecha = (fecha: string, forDisplay: boolean = false) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    if (forDisplay) {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    } else {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  };

  
  const handleEditProyecto = async () => {
    // Verificar si los campos necesarios tienen valores (ya sea editados o preexistentes)
    if (
      nombreclatura?.trim() ||
      proyectoAEditar?.Nombreclatura &&
      nombre?.trim() ||
      proyectoAEditar?.Nombre &&
      responsable ||
      proyectoAEditar?.idUsuario &&
      estado ||
      proyectoAEditar?.idestado &&
      categoria ||
      proyectoAEditar?.idCategoriaProyecto &&
      fechainicio ||
      proyectoAEditar?.FechaInicio &&
      fechaFinal ||
      proyectoAEditar?.FechaFinalizacion &&
      idComunidad ||
      proyectoAEditar?.idComunidad
    ) {
      const updatedProyecto = {
        idRegistrarProyecto: proyectoAEditar?.idRegistrarProyecto, // Incluye el ID del proyecto
        idCategoriaProyecto: categoria || proyectoAEditar?.idCategoriaProyecto,
        Nombreclatura: nombreclatura || proyectoAEditar?.Nombreclatura,
        Nombre: nombre || proyectoAEditar?.Nombre,
        idUsuario: responsable || proyectoAEditar?.idUsuario,
        idComunidad: idComunidad || proyectoAEditar?.idComunidad,
        idestado: estado || proyectoAEditar?.idestado,
        FechaInicio: formatFecha(fechainicio ?? ''),
        FechaFinalizacion: formatFecha(fechaFinal ?? ''),
      };
  
      try {
        await axios.put(`http://localhost:3000/proyectos/${proyectoAEditar?.idRegistrarProyecto}`, updatedProyecto);
        await fetchProyectos(); // Actualiza la lista de proyectos
        // setShowToast({ show: true, message: 'Proyecto editado con éxito.' });
        closeModal();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setShowToast({ show: true, message: 'Error al editar proyecto: ' + (error.response?.data?.error || error.message) });
        } else {
          setShowToast({ show: true, message: 'Error al editar proyecto: Ocurrió un error desconocido.' });
        }
      }
    } else {
      setShowToast({ show: true, message: 'Por favor, completa todos los campos obligatorios.' });
    }
  };
  
  const renderProyectos = () => {
    return proyectos.map((proyecto) => {
      // console.log('Buscando comunidad para idComunidad:', proyecto.idComunidad);
      return (
        <tr key={proyecto.idRegistrarProyecto}>
          <td>{proyecto.Categoria}</td>
          <td>{proyecto.Nombreclatura}</td>
          <td>{proyecto.Nombre}</td>
          <td>{proyecto.Responsable}</td>
          <td>
            {comunidades.find((com) => com.idComunidad === proyecto.idComunidad)?.nombre_comunidad || 'No asignada'}
          </td>
          <td>{formatFecha(proyecto.FechaInicio, true)}</td>
          <td>{formatFecha(proyecto.FechaFinalizacion, true)}</td>
          <td>
            <IonButton fill="clear" size="small" onClick={() => openEditModal(proyecto)}>Editar</IonButton>
          </td>
        </tr>
      );
    });
  };
  
  // Luego, en tu return, llamas a esta función
  <tbody>
    {renderProyectos()}
  </tbody>
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonButton onClick={openRegisterModal}>Registrar Proyecto</IonButton>
          </IonCol>
        </IonRow>
        <div className="table-container">
        <div className="table-header">
        {/* <div className="scroll-section" style={{ height: '300px', overflowY: 'auto' }}>  */}
          <table className="table">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Nomenclatura</th>
                <th>Proyecto</th>
                <th>Responsable</th>
                <th>Comunidad</th>
                <th>Estado</th>
                <th>F. Inicio</th>
                <th>F. Finalización</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.idRegistrarProyecto}>
                  <td>{proyecto.Categoria}</td>
                  <td>{proyecto.Nombreclatura}</td>
                  <td>{proyecto.Nombre}</td>
                  <td>{proyecto.Responsable}</td>
                  <td> {comunidades.find(com => com.idComunidad === proyecto.idComunidad)?.nombre_comunidad || 'No asignada'}</td>
                  <td>{proyecto.Estado}</td>
                  <td>{formatFecha(proyecto.FechaInicio, true)}</td>
                  <td>{formatFecha(proyecto.FechaFinalizacion, true)}</td>
                  <td>
                    <IonButton fill="clear" size="small"onClick={() => openEditModal(proyecto)}>Editar</IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Modal para Registrar Proyecto */}
        <IonModal isOpen={isRegisterModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Proyecto</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Categoría</IonLabel>
                <IonSelect
                  value={categoria}
                  placeholder="Selecciona una categoría"
                  onIonChange={(e) => setCategoria(Number(e.detail.value))}
                >
                  {categorias.map((cat) => (
                    <IonSelectOption key={cat.idCategoriaProyecto} value={cat.idCategoriaProyecto}>
                      {cat.Categoria}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Nomenclatura</IonLabel>
                <IonInput value={nombreclatura} onIonChange={(e) => setNombreclatura(e.detail.value!)} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Responsable</IonLabel>
                <IonSelect
                  value={responsable}
                  placeholder="Selecciona un responsable"
                  onIonChange={(e) => setResponsable(Number(e.detail.value))}
                >
                  {responsables.map((resp) => (
                    <IonSelectOption key={resp.idUsuario} value={resp.idUsuario}>
                      {resp.Nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Comunidad</IonLabel>
                <IonSelect
                  value={idComunidad}
                  placeholder="Selecciona una comunidad"
                  onIonChange={(e) => setIdComunidad(e.detail.value)}
                >
                  {comunidades.map((com) => (
                    <IonSelectOption key={com.idComunidad} value={com.idComunidad}>
                      {com.nombre_comunidad}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Estado</IonLabel>
                <IonSelect
                  value={estado}
                  placeholder="Selecciona un estado"
                  onIonChange={(e) => setEstado(Number(e.detail.value))}
                >
                  {estados.map((est) => (
                    <IonSelectOption key={est.idestado} value={est.idestado}>
                      {est.Estadoproyecto}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Fecha de Inicio</IonLabel>
                <IonInput type="date" value={fechainicio} onIonChange={(e) => setFechaInicio(e.detail.value!)} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Fecha de Finalización</IonLabel>
                <IonInput type="date" value={fechaFinal} onIonChange={(e) => setFechaFinal(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonButton expand="full" onClick={proyectoAEditar ? handleEditProyecto : handleAddProyecto}>
              {proyectoAEditar ? 'Guardar Cambios' : 'Agregar Proyecto'}
            </IonButton>
            {/* <IonButton expand="full" onClick={handleAddProyecto}>
              Agregar Proyecto
            </IonButton> */}
            <IonButton expand="full" color="light" onClick={closeModal}>
              Cancelar
            </IonButton>

            <IonToast
              isOpen={showToast.show}
              onDidDismiss={() => setShowToast({ show: false, message: '' })}
              message={showToast.message}
              duration={2000}
            />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default RegistrarProyecto;

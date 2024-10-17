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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [responsables, setResponsables] = useState<Responsable[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
  const [categoria, setCategoria] = useState<number | undefined>();
  const [nombreclatura, setNombreclatura] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [responsable, setResponsable] = useState<number | undefined>();
  const [estado, setEstado] = useState<number | undefined>();
  const [fechainicio, setFechaInicio] = useState<string>('');
  const [fechaFinal, setFechaFinal] = useState<string>('');
  const [showToast, setShowToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const history = useHistory();

  useEffect(() => {
    fetchProyectos();
    fetchCategorias();
    fetchResponsables();
    fetchEstados();
  }, []);

  const fetchProyectos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proyectos');
      setProyectos(response.data);
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

  const openRegisterModal = () => setIsRegisterModalOpen(true);

  const openEditModal = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);

    setCategoria(proyecto.idCategoriaProyecto);
    setNombreclatura(proyecto.Nombreclatura);
    setNombre(proyecto.Nombre);
    setResponsable(proyecto.idUsuario);
    setEstado(proyecto.idestado);
    setFechaInicio(formatFecha(proyecto.FechaInicio, true));
    setFechaFinal(formatFecha(proyecto.FechaFinalizacion, true));

    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCategoria(undefined);
    setNombreclatura('');
    setNombre('');
    setResponsable(undefined);
    setEstado(undefined);
    setFechaInicio('');
    setFechaFinal('');
    setSelectedProyecto(null);
  };

  const handleAddProyecto = async () => {
    if (
      nombreclatura &&
      nombre &&
      responsable &&
      estado &&
      categoria &&
      fechainicio &&
      fechaFinal
    ) {
      const newProyecto = {
        idCategoriaProyecto: categoria,
        Nombreclatura: nombreclatura,
        Nombre: nombre,
        idUsuario: responsable,
        idestado: estado,
        FechaInicio: formatFecha(fechainicio),
        FechaFinalizacion: formatFecha(fechaFinal),
      };

      try {
        await axios.post('http://localhost:3000/RegistrarProyecto', newProyecto);
        fetchProyectos(); // Actualiza la lista de proyectos
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

  const handleEditProyecto = async () => {
    if (
      selectedProyecto &&
      nombreclatura &&
      nombre &&
      responsable &&
      estado &&
      categoria &&
      fechainicio &&
      fechaFinal
    ) {
      const updatedProyecto = {
        idCategoriaProyecto: categoria,
        Nombreclatura: nombreclatura,
        Nombre: nombre,
        idUsuario: responsable,
        idestado: estado,
        FechaInicio: formatFecha(fechainicio),
        FechaFinalizacion: formatFecha(fechaFinal),
      };

      try {
        await axios.put(`http://localhost:3000/proyectos/${selectedProyecto.idRegistrarProyecto}`, updatedProyecto);
        fetchProyectos(); // Actualiza la lista de proyectos
        setShowToast({ show: true, message: 'Proyecto actualizado con éxito.' });
        closeModal();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setShowToast({ show: true, message: 'Error al actualizar proyecto: ' + (error.response?.data?.error || error.message) });
        } else {
          setShowToast({ show: true, message: 'Error al actualizar proyecto: Ocurrió un error desconocido.' });
        }
      }
    } else {
      setShowToast({ show: true, message: 'Por favor, completa todos los campos.' });
    }
  };

  // Formatea la fecha en el formato correcto (yyyy-mm-dd o dd/mm/yyyy)
  // const formatFecha = (fecha: string, forDisplay: boolean = false) => {
  //   if (!fecha) return '';
  //   if (forDisplay) {
  //     const date = new Date(fecha);
  //     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
  //       .toString()
  //       .padStart(2, '0')}/${date.getFullYear()}`;
  //   } else {
  //     const [year, month, day] = fecha.split('-');
  //     return `${year}-${month}-${day}`;
  //   }
  // };

  const formatFecha = (fecha: string, forDisplay: boolean = false) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    if (forDisplay) {
      // Mostrar en formato dd/mm/yyyy
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    } else {
      // Para los inputs de tipo 'date' (formato yyyy-mm-dd)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  };
  

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
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Categoría</th>
                <th>Nomenclatura</th>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.idRegistrarProyecto}>
                  {/* <td>{proyecto.idRegistrarProyecto}</td> */}
                  <td>{proyecto.Categoria}</td>
                  <td>{proyecto.Nombreclatura}</td>
                  <td>{proyecto.Nombre}</td>
                  <td>{proyecto.Responsable}</td>
                  <td>{proyecto.Estado}</td>
                  <td>{formatFecha(proyecto.FechaInicio, true)}</td>
                  <td>{formatFecha(proyecto.FechaFinalizacion, true)}</td>
                  <td>
                    <IonButton
                      onClick={() => openEditModal(proyecto)}
                      fill="clear"
                      size="small"
                    >
                      Editar
                    </IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <IonLabel position="stacked" className="label">Categoría</IonLabel>
                <IonSelect
                  value={categoria}
                  placeholder="Selecciona una categoría"
                  onIonChange={(e) => setCategoria(e.detail.value)}
                >
                  {categorias.map((cat) => (
                    <IonSelectOption key={cat.idCategoriaProyecto} value={cat.idCategoriaProyecto}>
                      {cat.Categoria}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked" className="label">Nomenclatura</IonLabel>
                <IonInput
                  value={nombreclatura}
                  onIonChange={(e) => setNombreclatura(e.detail.value!)}
                  placeholder="Escribe la nomenclatura"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked" className="label">Nombre</IonLabel>
                <IonInput
                  value={nombre}
                  onIonChange={(e) => setNombre(e.detail.value!)}
                  placeholder="Escribe el nombre del proyecto"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked"className="label">Responsable</IonLabel>
                <IonSelect
                  value={responsable}
                  placeholder="Selecciona un responsable"
                  onIonChange={(e) => setResponsable(e.detail.value)}
                >
                  {responsables.map((res) => (
                    <IonSelectOption key={res.idUsuario} value={res.idUsuario}>
                      {res.Nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked" className="label">Estado</IonLabel>
                <IonSelect
                  value={estado}
                  placeholder="Selecciona un estado"
                  onIonChange={(e) => setEstado(e.detail.value)}
                >
                  {estados.map((est) => (
                    <IonSelectOption key={est.idestado} value={est.idestado}>
                      {est.Estadoproyecto}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked" className="label">Fecha de Inicio</IonLabel>
                <IonInput
                  value={fechainicio}
                  type="date"
                  onIonChange={(e) => setFechaInicio(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked"className="label">Fecha de Finalización</IonLabel>
                <IonInput
                  value={fechaFinal}
                  type="date"
                  onIonChange={(e) => setFechaFinal(e.detail.value!)}
                />
              </IonItem>
            </IonList>
            <div className="button-container"> 
            <IonButton expand="block" onClick={handleAddProyecto}>
              Registrar
            </IonButton>
            <IonButton expand="block" color="danger" onClick={closeModal}>
              Cancelar
            </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal para Editar Proyecto */}
        <IonModal isOpen={isEditModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Proyecto</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Categoría</IonLabel>
                <IonSelect
                  value={categoria}
                  placeholder="Selecciona una categoría"
                  onIonChange={(e) => setCategoria(e.detail.value)}
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
                <IonInput
                  value={nombreclatura}
                  onIonChange={(e) => setNombreclatura(e.detail.value!)}
                  placeholder="Escribe la nomenclatura"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  value={nombre}
                  onIonChange={(e) => setNombre(e.detail.value!)}
                  placeholder="Escribe el nombre del proyecto"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Responsable</IonLabel>
                <IonSelect
                  value={responsable}
                  placeholder="Selecciona un responsable"
                  onIonChange={(e) => setResponsable(e.detail.value)}
                >
                  {responsables.map((res) => (
                    <IonSelectOption key={res.idUsuario} value={res.idUsuario}>
                      {res.Nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Estado</IonLabel>
                <IonSelect
                  value={estado}
                  placeholder="Selecciona un estado"
                  onIonChange={(e) => setEstado(e.detail.value)}
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
                <IonInput
                  value={fechainicio}
                  type="date"
                  onIonChange={(e) => setFechaInicio(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Fecha de Finalización</IonLabel>
                <IonInput
                  value={fechaFinal}
                  type="date"
                  onIonChange={(e) => setFechaFinal(e.detail.value!)}
                />
              </IonItem>
            </IonList>
            <div className="button-container">
            <IonButton expand="block" onClick={handleEditProyecto}>
              Actualizar
            </IonButton>
            <IonButton expand="block" color="danger" onClick={closeModal}>
              Cancelar
            </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast.show}
          message={showToast.message}
          duration={3000}
          onDidDismiss={() => setShowToast({ show: false, message: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegistrarProyecto;

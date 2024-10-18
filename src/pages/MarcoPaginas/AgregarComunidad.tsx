import React, { useState } from "react";
import { IonPage, IonContent, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonRow, IonCheckbox,IonList,IonItem,IonSelect,IonSelectOption, IonInput,IonCol,IonGrid,IonAlert } from "@ionic/react";
//import { earthOutline, cogOutline, bookOutline, waterOutline, fitnessOutline, peopleOutline, leafOutline } from 'ionicons/icons';
import { add, bookOutline, cog, cogOutline, earthOutline, fitnessOutline, globeOutline, leafOutline, peopleOutline, waterOutline } from 'ionicons/icons';
import { FaRecycle } from "react-icons/fa";
import { PiCowFill, PiPlantFill} from "react-icons/pi";
function AgregarComunidades() {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [seccionActual, setSeccionActual] = useState('DatosGenerales'); // Por defecto, empieza en DatosGenerales
  // estructura de formularios
  let [Comunidad, setComunidad] = useState('');
  let [Municipio, setMunicipio] = useState(''); // campo para guardar el municipio
  let [Aldea, setAldea] = useState(''); // para la aldea
  let [Ubicacion, setUbicacion] = useState(''); // para la ubicacion
  let [PresidenteCOCODE, setPresidenteCOCODE] = useState('');
  let [TelefonoContacto, setTelefonoContacto] = useState('');
  let [OtroLider, setOtroLider] = useState('');
  let [TelefonoOtroLider, setTelefonoOtroLider] = useState('');
  let [Transporte, setTransporte] = useState('');
  let [NumeroFamilias, setNumeroFamilias] = useState('');
  let [NumeroViviendas, setNumeroViviendas] = useState('');
  let [NumeroPersonas, setNumeroPersonas] = useState('');
  let [CertezaJuridica, setCertezaJuridica] = useState('');  // Checkbox, true o false
  let [ConflictosTierra, setConflictosTierra] = useState('');
  let [DimensionesLotes, setDimensionesLotes] = useState('');
  let [DimensionesTrabajaderos, setDimensionesTrabajaderos] = useState('');
  let [TierraComunitaria, setTierraComunitaria] = useState('');
  let [Idiomas, setIdiomas] = useState('');
  let [FuentesEmpleo, setFuentesEmpleo] = useState('');
  let [Recreacion, setRecreacion] = useState('');
  let [PotencialTuristico, setPotencialTuristico] = useState('');
  let [EdificiosPublicos, setEdificiosPublicos] = useState('');
  let [Inseguridad, setInseguridad] = useState(false);  // Checkbox
  let [TipoInseguridad, setTipoInseguridad] = useState('');
  let [GruposDelincuenciales, setGruposDelincuenciales] = useState('');
  let [PersonasOtrosMunicipios, setPersonasOtrosMunicipios] = useState('');
  let [TipoTrabajo, setTipoTrabajo] = useState('');
  let [PersonasEEUU, setPersonasEEUU] = useState(false);  // Checkbox
  let [CantidadPersonasEEUU, setCantidadPersonasEEUU] = useState('');
  let [MenoresEEUU, setMenoresEEUU] = useState(false);  // Checkbox
  let [EdadTrabajoHombres, setEdadTrabajoHombres] = useState('');
  let [EdadTrabajoMujeres, setEdadTrabajoMujeres] = useState('');
  let [Ocupaciones, setOcupaciones] = useState('');
  let [Jubilados, setJubilados] = useState(false);  // Checkbox
  let [CantidadJubilados, setCantidadJubilados] = useState('');
  let [InstitucionJubilados, setInstitucionJubilados] = useState('');
  let [OcupacionesMujeres, setOcupacionesMujeres] = useState('');
  let [OcupacionesHombres, setOcupacionesHombres] = useState('');

  //variables para las nuevas paginas
  const [energiaElectrica, setEnergiaElectrica] = useState(false); // Checkbox
  const [tipoServicio, setTipoServicio] = useState('');            // Campo de texto
  const [calidadServicio, setCalidadServicio] = useState('');       // Campo de texto
  const [costosServicio, setCostosServicio] = useState('');         // Campo de texto
  const [prestadorServicio, setPrestadorServicio] = useState('');   // Campo de texto
  const [familiasConServicio, setFamiliasConServicio] = useState(''); // Campo de texto
  const [senalTelefono, setSenalTelefono] = useState(false);        // Checkbox
  const [senalInternet, setSenalInternet] = useState(false);        // Checkbox
  const [senalTV, setSenalTV] = useState(false);                    // Checkbox
  const [cable, setCable] = useState(false);                        // Checkbox
  const [prestadorServicios, setPrestadorServicios] = useState(''); // Campo de texto
  const [institucionesEducativas, setInstitucionesEducativas] = useState('');   // Campo de texto
  const [edificiosEducativos, setEdificiosEducativos] = useState('');           // Campo de texto
  const [constructorEdificios, setConstructorEdificios] = useState('');         // Campo de texto
  const [materialesConstruccion, setMaterialesConstruccion] = useState('');     // Campo de texto
  const [duenoTerreno, setDuenoTerreno] = useState('');                         // Campo de texto
  const [deseoPreparacion, setDeseoPreparacion] = useState(false);              // Checkbox
  const [limitantesEstudio, setLimitantesEstudio] = useState('');               // Campo de texto
  const [personasCarreraMedioH, setPersonasCarreraMedioH] = useState('');       // Campo de texto
  const [personasCarreraMedioM, setPersonasCarreraMedioM] = useState('');       // Campo de texto
  const [personasConcluyeronMedio, setPersonasConcluyeronMedio] = useState(''); // Campo de texto
  const [personasUniversidadH, setPersonasUniversidadH] = useState('');         // Campo de texto
  const [personasUniversidadM, setPersonasUniversidadM] = useState('');         // Campo de texto
  const [abandonoEstudios, setAbandonoEstudios] = useState(false);              // Checkbox
  const [carrerasNivelMedio, setCarrerasNivelMedio] = useState('');             // Campo de texto
  const [carrerasUniversidad, setCarrerasUniversidad] = useState('');           // Campo de texto
  const [aguaEntubada, setAguaEntubada] = useState(false);          // Checkbox
  const [pozo, setPozo] = useState(false);                          // Checkbox
  const [aguaLluvia, setAguaLluvia] = useState(false);              // Checkbox
  const [rio, setRio] = useState(false);                            // Checkbox
  const [laguna, setLaguna] = useState(false);                      // Checkbox
  const [estanque, setEstanque] = useState(false);                  // Checkbox
  const [compraAgua, setCompraAgua] = useState(false);              // Checkbox
  const [inodoroLavable, setInodoroLavable] = useState(false);      // Checkbox
  const [letrina, setLetrina] = useState(false);                    // Checkbox
  const [pozoVentilado, setPozoVentilado] = useState(false);        // Checkbox
  const [campoExcretas, setCampoExcretas] = useState(false);        // Checkbox
  const [manejoBasura, setManejoBasura] = useState('');             // Campo de texto
  const [tipoBasura, setTipoBasura] = useState('');                 // Campo de texto
  const [fuenteEnergiaLenia, setFuenteEnergiaLenia] = useState(false);  // Checkbox
  const [fuenteEnergiaGas, setFuenteEnergiaGas] = useState(false);      // Checkbox
  const [fuenteEnergiaCarbon, setFuenteEnergiaCarbon] = useState(false); // Checkbox
  const [fuenteEnergiaOtros, setFuenteEnergiaOtros] = useState('');      // Campo de texto
  const [estufaAhorradora, setEstufaAhorradora] = useState(false);   // Checkbox
  const [estufaGas, setEstufaGas] = useState(false);                 // Checkbox
  const [polleton, setPolleton] = useState(false);                   // Checkbox
  const [sueloCocina, setSueloCocina] = useState(false);             // Checkbox
  const [capacitacionesSaneamiento, setCapacitacionesSaneamiento] = useState(false); // Checkbox
  const [detalleCapacitaciones, setDetalleCapacitaciones] = useState('');  // Campo de texto
  const [polloCongelado, setPolloCongelado] = useState(false);  // Checkbox
  const [polloCriollo, setPolloCriollo] = useState(false);      // Checkbox
  const [cerdo, setCerdo] = useState(false);                    // Checkbox
  const [res, setRes] = useState(false);                        // Checkbox
  const [carneMonte, setCarneMonte] = useState(false);          // Checkbox
  const [pescado, setPescado] = useState(false);                // Checkbox
  const [maiz, setMaiz] = useState(false);                      // Checkbox
  const [frijol, setFrijol] = useState(false);                  // Checkbox
  const [verduras, setVerduras] = useState(false);              // Checkbox
  const [legumbres, setLegumbres] = useState(false);            // Checkbox
  const [pastas, setPastas] = useState(false);                  // Checkbox
  const [sopas, setSopas] = useState(false);                    // Checkbox
  const [arroz, setArroz] = useState(false);                    // Checkbox
  const [papa, setPapa] = useState(false);                      // Checkbox
  const [malanga, setMalanga] = useState(false);                // Checkbox
  const [camote, setCamote] = useState(false);                  // Checkbox
  const [yuca, setYuca] = useState(false);                      // Checkbox
  const [otroTuberculo, setOtroTuberculo] = useState('');       // Input de texto
  const [puestoSalud, setPuestoSalud] = useState(false);        // Checkbox
  const [frecuenciaDoctor, setFrecuenciaDoctor] = useState('');  // Input de texto
  const [hayEnfermero, setHayEnfermero] = useState(false);      // Checkbox
  const [centroConvergencia, setCentroConvergencia] = useState(false);  // Checkbox
  const [usoCentroConvergencia, setUsoCentroConvergencia] = useState('');  // Input de texto
  const [Emergencia, setEmergencia] = useState('');  // Input de texto
  const [tiposEmergencias, setTiposEmergencias] = useState('');  // Input de texto
  const [vacunasNinos, setVacunasNinos] = useState(false);      // Checkbox
  const [frecuenciaVacunacion, setFrecuenciaVacunacion] = useState('');  // Input de texto
  const [mayores60, setMayores60] = useState('');               // Input de texto
  const [personasCapacidadesDiferentes, setPersonasCapacidadesDiferentes] = useState(''); // Input de texto
  const [personasAbandono, setPersonasAbandono] = useState('');  // Input de texto
  const [ninos0a5, setNinos0a5] = useState('');                 // Input de texto
  const [ninos6a10, setNinos6a10] = useState('');               // Input de texto
  const [ninos11a15, setNinos11a15] = useState('');             // Input de texto
  const [ninos16a18, setNinos16a18] = useState('');             // Input de texto
  const [recienNacidos, setRecienNacidos] = useState('');        // Input de texto
  const [ninosMuertos, setNinosMuertos] = useState(false);      // Checkbox
  const [ninosDesnutridos, setNinosDesnutridos] = useState(false);  // Checkbox
  const [mujeresEmbarazadas, setMujeresEmbarazadas] = useState(''); // Input de texto
  const [embarazosAlAnio, setEmbarazosAlAnio] = useState('');     // Input de texto
  const [tipoEnfermedades, setTipoEnfermedades] = useState(''); // Input de texto
  const [numComadronas, setNumComadronas] = useState('');       // Input de texto
  const [numPromotoresSalud, setNumPromotoresSalud] = useState(''); // Input de texto
  const [numCuranderos, setNumCuranderos] = useState('');       // Input de texto
  const [botiquinComunitario, setBotiquinComunitario] = useState(false); // Checkbox
  const [jardinesMedicinales, setJardinesMedicinales] = useState(false); // Checkbox
  const [ventaMedicina, setVentaMedicina] = useState(false);    // Checkbox
  const [ventaBebidasAlcoholicas, setVentaBebidasAlcoholicas] = useState(false); // Checkbox
  const [numPuntosVentaBebidas, setNumPuntosVentaBebidas] = useState('');  // Input de texto
  const [tiposBebidasAlcoholicas, setTiposBebidasAlcoholicas] = useState(''); // Input de texto
  const [consumoTabaco, setConsumoTabaco] = useState(false);   // Checkbox
  const [otrosConsumo, setOtrosConsumo] = useState('');         // Input de texto
  // Pregunta 70 - Instituciones
  const [maga, setMaga] = useState(false);
  const [fodes, setFodes] = useState(false);
  const [mides, setMides] = useState(false);
  const [sesan, setSesan] = useState(false);

  // Pregunta 71 - Policía y comités
  const [llegaPolicia, setLlegaPolicia] = useState(false);
  const [comites, setComites] = useState(false);

  // Pregunta 72 y 73 - ONG
  const [ongList, setOngList] = useState([{ nombre: '', trabajo: '' }]);
  const addOng = () => {
    setOngList([...ongList, { nombre: '', trabajo: '' }]);
  };

  // Pregunta 74 - Religiones
  const [religion, setReligion] = useState('');

  interface Actor {
    nombre: string;
    aceptacion: string;
    importancia: string;
    presencia: string;
  }
  const [actors, setActors] = useState<Actor[]>([]);  // Definimos que el estado será un arreglo de objetos tipo Actor
  const addActor = (nombre: string) => {
    setActors([...actors, { nombre, aceptacion: '', importancia: '', presencia: '' }]);
  };

  const removeActor = (nombre: string) => {
    setActors(actors.filter(actor => actor.nombre !== nombre));
  };

  /* Tabla de pestaña agricultura*/
  const [rows, setRows] = useState([{ cultivo: '', area: '', rendimientos: '', destino: '', precio: '', siembra: '', cosecha: '' }]);

  // Función para agregar una nueva fila
  const addRow = () => {
    setRows([...rows, { cultivo: '', area: '', rendimientos: '', destino: '', precio: '', siembra: '', cosecha: '' }]);
  };

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };
  /*Fin tabla de agricultura*/ 


  /*Actividades Pecuarias*/
  const [rows2, setRows2] = useState([{ tipo: 'Aves', frecuencia: '', alimento: '', area: '', venta: '', precio: '', donde: '' },
    { tipo: 'Cerdos', frecuencia: '', alimento: '', area: '', venta: '', precio: '', donde: '' },
    { tipo: 'Vacas/toros', frecuencia: '', alimento: '', area: '', venta: '', precio: '', donde: '' }]);

// Función para agregar una nueva fila
const addRow2 = () => {
setRows2([...rows2, { tipo: '', frecuencia: '', alimento: '', area: '', venta: '', precio: '', donde: '' }]);
};

// Función para manejar cambios en los campos de entrada
const handleInputChange2 = (index: number, field: string, value: string) => {
const newRows = [...rows2];
newRows[index][field] = value;
setRows2(newRows);
};

const handleCheckboxChange2 = (index: number, field: string, value: boolean) => {
const newRows2 = [...rows2];
newRows2[index][field] = value;
setRows2(newRows2);
};
  /*Fin Actividades Pecuarias*/
   const [comercializacionProductos, setComercializacionProductos] = useState(''); // Campo de texto
   const [terrenoPropio, setTerrenoPropio] = useState(false);  // Checkbox
   const [terrenoPrestado, setTerrenoPrestado] = useState(false);  // Checkbox
   const [terrenoArrendado, setTerrenoArrendado] = useState(false);  // Checkbox
   const [costoArrendamiento, setCostoArrendamiento] = useState(''); // Campo de texto
   const [periodoArrendamiento, setPeriodoArrendamiento] = useState(''); // Campo de texto
   const [momentoSiembra, setMomentoSiembra] = useState('');  // Campo de texto
   const [plagasEnfermedades, setPlagasEnfermedades] = useState('');  // Campo de texto
   const [mesesPlagas, setMesesPlagas] = useState('');  // Campo de texto
   const [cultivosAnteriores, setCultivosAnteriores] = useState('');  // Campo de texto
   const [razonNoSiembra, setRazonNoSiembra] = useState('');  // Campo de texto
   const [nuevosCultivos, setNuevosCultivos] = useState('');  // Campo de texto
   const [sistemasProductivos, setSistemasProductivos] = useState('');  // Campo de texto
   const [accionesSequía, setAccionesSequía] = useState('');  // Campo de texto
   const [accionesLluvia, setAccionesLluvia] = useState('');  // Campo de texto
   const [perdidaCosechas, setPerdidaCosechas] = useState(false);  // Checkbox
   const [añoPerdidaCosechas, setAñoPerdidaCosechas] = useState('');  // Campo de texto
   const [causaPerdidaCosechas, setCausaPerdidaCosechas] = useState('');  // Campo de texto
   const [capacitacionesAgricultura, setCapacitacionesAgricultura] = useState(false);  // Checkbox
   const [tipoCapacitacion, setTipoCapacitacion] = useState('');  // Campo de texto
   const [organizacionCapacitacion, setOrganizacionCapacitacion] = useState('');  // Campo de texto
   const [actividadSinSiembra, setActividadSinSiembra] = useState('');  // Campo de texto
   const [usoPesticidas, setUsoPesticidas] = useState(false);  // Checkbox
   const [usoInsecticidas, setUsoInsecticidas] = useState(false);  // Checkbox
   const [usoHerbicidas, setUsoHerbicidas] = useState(false);  // Checkbox
   const [usoFungicidas, setUsoFungicidas] = useState(false);  // Campo de texto
   const [usoFertilizantes, setUsoFertilizantes] = useState(false);  // Campo de texto
   const [usoOtros, setUsoOtros] = useState('');  // Campo de texto

   const [alimentoAnimales, setAlimentoAnimales] = useState('');  // Campo de texto
   const [planesProfilacticos, setPlanesProfilacticos] = useState(false);  // Checkbox
   const [enfermedadesAnimales, setEnfermedadesAnimales] = useState('');  // Campo de texto
   const [mesesEnfermedad, setMesesEnfermedad] = useState('');  // Campo de texto
   const [capacitacionesAnimales, setCapacitacionesAnimales] = useState(false);  // Checkbox
   const [tipoCapacitacionAnimales, setTipoCapacitacionAnimales] = useState('');  // Campo de texto

   const [bosqueComunitario, setBosqueComunitario] = useState(false);  // Checkbox
   const [dimensionesBosque, setDimensionesBosque] = useState('');  // Campo de texto
   const [especiesArboles, setEspeciesArboles] = useState('');  // Campo de texto
   const [especiesPlantas, setEspeciesPlantas] = useState('');  // Campo de texto
   const [incentivosForestales, setIncentivosForestales] = useState(false);  // Checkbox
   const [bosquesPotenciales, setBosquesPotenciales] = useState('');  // Campo de texto
   const [viveros, setViveros] = useState(false);  // Checkbox
   const [reforestado, setReforestado] = useState(false);  // Checkbox
   const [areaReforestada, setAreaReforestada] = useState('');  // Campo de texto
   const [impulsorReforestacion, setImpulsorReforestacion] = useState('');  // Campo de texto
   const [duenoTierraBosque, setDuenoTierraBosque] = useState('');  // Campo de texto
   const [duenosMotosierras, setDuenosMotosierras] = useState(false);  // Checkbox
   const [talaParaCultivar, setTalaParaCultivar] = useState(false);  // Checkbox
   const [rozasQuemas, setRozasQuemas] = useState('');  // Campo de texto
   const [incendiosForestales, setIncendiosForestales] = useState(false);  // Checkbox
   const [razonIncendios, setRazonIncendios] = useState('');  // Campo de texto
   const [areaIncendio, setAreaIncendio] = useState('');  // Campo de texto
   const [fechaIncendio, setFechaIncendio] = useState('');  // Campo de texto
   const [fuentesAgua, setFuentesAgua] = useState(false);  // Checkbox
   const [numNacimientos, setNumNacimientos] = useState('');  // Campo de texto
   const [duenoTierraFuentes, setDuenoTierraFuentes] = useState('');  // Campo de texto
   const [accionesConservacionAgua, setAccionesConservacionAgua] = useState('');  // Campo de texto
   const [numPozos, setNumPozos] = useState('');  // Campo de texto
   const [numRios, setNumRios] = useState('');  // Campo de texto
   const [numLagunas, setNumLagunas] = useState('');  // Campo de texto
   const [otrasFuentesAgua, setOtrasFuentesAgua] = useState('');  // Campo de texto
   const [proyectoMedioAmbiental, setProyectoMedioAmbiental] = useState(false);  // Checkbox
   const [accionesProyecto, setAccionesProyecto] = useState('');  // Campo de texto
   const [accionesConservacionAmbiente, setAccionesConservacionAmbiente] = useState('');  // Campo de texto
   const [animalesSilvestres, setAnimalesSilvestres] = useState('');  // Campo de texto
   const [animalesPorTemporada, setAnimalesPorTemporada] = useState('');  // Campo de texto
   const [plantasExtintas, setPlantasExtintas] = useState('');  // Campo de texto
   const [plantasDificiles, setPlantasDificiles] = useState('');  // Campo de texto
   const [desastreNatural, setDesastreNatural] = useState(false);  // Checkbox
   const [anioDesastre, setAnioDesastre] = useState('');  // Campo de texto
   const [tipoDesastre, setTipoDesastre] = useState('');  // Campo de texto
   const [respuestaDesastre, setRespuestaDesastre] = useState('');  // Campo de texto
   const [colred, setColred] = useState(false);  // Checkbox
   const [otrasInstituciones, setOtrasInstituciones] = useState('');  // Campo de texto
   const [amenazaDesastre, setAmenazaDesastre] = useState('');  // Campo de texto

  // Función para enviar los datos al backend
  const handleGuardarComunidad = async () => {
    // Verificar la sección actual y validar los campos requeridos
    if (seccionActual === 'DatosGenerales') {
      // Validar campos obligatorios de Datos Generales
      if (!Comunidad || !Municipio || !Aldea || !Ubicacion || !PresidenteCOCODE || !TelefonoContacto) {
        setShowValidationAlert(true);
        return;
      }
      // Construir los datos específicos de Datos Generales
      const data = {
        nombre_comunidad: Comunidad,
        nombre_municipio: Municipio,
        nombre_aldea: Aldea,
        ubicacion_real: Ubicacion,
        presidente_cocode: PresidenteCOCODE,
        telefono_contacto1: TelefonoContacto,
        otro_lider: OtroLider,
        telefono_contacto2: TelefonoOtroLider,
        tipo_transporte: Transporte,
        numero_familias: parseInt(NumeroFamilias, 10),
        numero_viviendas: parseInt(NumeroViviendas, 10),
        numero_personas: parseInt(NumeroPersonas, 10),
        certeza_juridica_tierra: CertezaJuridica,
        conflictos_tierra: ConflictosTierra,
        dimension_lotes: DimensionesLotes,
        dimension_trabajadores: DimensionesTrabajaderos,
        tierra_comunitaria: TierraComunitaria,
        idiomas_comunidad: Idiomas,
        fuentes_empleo: FuentesEmpleo,
        recreacion_comunidad: Recreacion,
        potencial_turistico: PotencialTuristico,
        tipo_edificios_publicos: EdificiosPublicos,
        hay_inseguridad: Inseguridad ? 1 : 0,
        tipo_inseguridad: Inseguridad ? TipoInseguridad : null,
        grupos_delincuenciales: Inseguridad ? GruposDelincuenciales : null,
        personas_otro_lugar: parseInt(PersonasOtrosMunicipios, 10),
        ocupacion_otro_lugar: TipoTrabajo,
        personas_en_eeuu: PersonasEEUU ? 1 : 0,
        cantidad_personas_eeuu: PersonasEEUU ? parseInt(CantidadPersonasEEUU, 10) : null,
        menores_en_eeuu: MenoresEEUU ? 1 : 0,
        edad_empieza_trabajar_hombres: parseInt(EdadTrabajoHombres, 10),
        edad_empieza_trabajar_mujeres: parseInt(EdadTrabajoMujeres, 10),
        tipo_empleo: Ocupaciones,
        existen_jubilados: Jubilados ? 1 : 0,
        cantidad_jubilados: Jubilados ? parseInt(CantidadJubilados, 10) : null,
        institucion_jubilados: Jubilados ? InstitucionJubilados : null,
        ocupaciones_tradicionales_mujeres: OcupacionesMujeres,
        ocupaciones_tradicionales_hombres: OcupacionesHombres
      };
  
      // Guardar los datos
      await guardarDatosEnBackend(data);
      
    } else if (seccionActual === 'Servicios') {
      // Validar campos obligatorios de Servicios
      if (!tipoServicio || !calidadServicio || !costosServicio || !prestadorServicio) {
        setShowValidationAlert(true);
        return;
      }
      // Construir los datos específicos de Servicios
      const data = {
        energia_electrica: energiaElectrica,
        tipo_servicio: tipoServicio,
        calidad_servicio: calidadServicio,
        costos_servicio: costosServicio,
        prestador_servicio: prestadorServicio,
        familias_con_servicio: familiasConServicio,
        senal_telefono: senalTelefono ? 1 : 0,
        senal_internet: senalInternet ? 1 : 0,
        senal_tv: senalTV ? 1 : 0,
        cable: cable ? 1 : 0,
        prestador_servicios: prestadorServicios
      };
  
      // Guardar los datos
      await guardarDatosEnBackend(data);
    } else {
      // Si la sección no es reconocida, mostrar alerta de validación
      setShowValidationAlert(true);
      return;
    }
  };
  
  // Función para enviar los datos al backend
  const guardarDatosEnBackend = async (data: any) => {
    try {
      const response = await fetch('http://localhost:3000/comunidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        setShowSuccessAlert(true);
        // Limpieza de los campos después de guardar
        limpiarCampos();
      } else {
        alert('Error al registrar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar los datos');
    }
  };
  
  // Función para limpiar los campos
  const limpiarCampos = () => {
    setComunidad('');
    setMunicipio('');
    setAldea('');
    setUbicacion('');
    setPresidenteCOCODE('');
    setTelefonoContacto('');
    setOtroLider('');
    setTelefonoOtroLider('');
    setTransporte('');
    setNumeroFamilias('');
    setNumeroViviendas('');
    setNumeroPersonas('');
    setCertezaJuridica('');
    setConflictosTierra('');
    setDimensionesLotes('');
    setDimensionesTrabajaderos('');
    setTierraComunitaria('');
    setIdiomas('');
    setFuentesEmpleo('');
    setRecreacion('');
    setPotencialTuristico('');
    setEdificiosPublicos('');
    setInseguridad(false);
    setTipoInseguridad('');
    setGruposDelincuenciales('');
    setPersonasOtrosMunicipios('');
    setTipoTrabajo('');
    setPersonasEEUU(false);
    setCantidadPersonasEEUU('');
    setMenoresEEUU(false);
    setEdadTrabajoHombres('');
    setEdadTrabajoMujeres('');
    setOcupaciones('');
    setJubilados(false);
    setCantidadJubilados('');
    setInstitucionJubilados('');
    setOcupacionesMujeres('');
    setOcupacionesHombres('');
    setEnergiaElectrica(false);
    setTipoServicio('');
    setCalidadServicio('');
    setCostosServicio('');
    setPrestadorServicio('');
    setFamiliasConServicio('');
    setSenalTelefono(false);
    setSenalInternet(false);
    setSenalTV(false);
    setCable(false);
    setPrestadorServicios('');
  };
  


  return (
    <IonPage className="pg">
      <h1 className='TituloPagina'>Crear comunidad</h1>
      <IonContent>
        <IonTabs className="tabs">
          <IonTab tab="DatosGenerales">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Información General</h2>
              </IonRow>  
              {/* Preguntas independientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">1. Nombre de la comunidad:</h3>
                <input onChange={e => setComunidad(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              {/* Nuevos campos*/}
              <IonRow className="FilaTextBox">
                <IonList>
                  <IonItem>
                    <IonSelect
                      className="ListBox"
                      placeholder="Seleccionar Municipio"
                      cancelText="Cancelar"
                      onIonChange={e => setMunicipio(e.detail.value)} // Captura el valor seleccionado
                    >
                      <IonSelectOption value="Cobán">Cobán</IonSelectOption>
                      <IonSelectOption value="Chisec">Chisec</IonSelectOption>
                      <IonSelectOption value="Carchá">Carchá</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">3. Aldea:</h3>
                <input onChange={e => setAldea(e.target.value || '')} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">4. Ubicación:</h3>
                <input onChange={e => setUbicacion(e.target.value || '')} type="text" className='TextBox' />
              </IonRow>


              <IonRow className="FilaTextBox">
                <h3 className="labelForm">5. Nombre del presidente de COCODE:</h3>
                <input onChange={e => setPresidenteCOCODE(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">6. Teléfono de contacto:</h3>
                <input onChange={e => setTelefonoContacto(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">7. Nombre de otro líder:</h3>
                <input onChange={e => setOtroLider(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">8. Teléfono de contacto:</h3>
                <input onChange={e => setTelefonoOtroLider(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">9. Tipo de transporte desde y hacia la comunidad:</h3>
                <input onChange={e => setTransporte(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">10. Número de familias:</h3>
                <input onChange={e => setNumeroFamilias(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">11. Número de viviendas:</h3>
                <input onChange={e => setNumeroViviendas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">12. Número de personas:</h3>
                <input onChange={e => setNumeroPersonas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">13. Certeza jurídica de la tierra comunitaria:</h3>
                <input onChange={e => setCertezaJuridica(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">14. Conflictos relacionados con acceso o tenencia de la tierra (invasiones, desalojos):</h3>
                <input onChange={e => setConflictosTierra(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">15. Dimensiones de los lotes:</h3>
                <input onChange={e => setDimensionesLotes(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">16. Dimensiones de los trabajaderos:</h3>
                <input onChange={e => setDimensionesTrabajaderos(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">17. ¿Cuánta tierra comunitaria hay?:</h3>
                <input onChange={e => setTierraComunitaria(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">18. Idiomas que se hablan en la comunidad:</h3>
                <input onChange={e => setIdiomas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">19. Fuentes de empleo en la comunidad:</h3>
                <input onChange={e => setFuentesEmpleo(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">20. Recreación en la comunidad:</h3>
                <input onChange={e => setRecreacion(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">21. ¿Qué tipo de potencial turístico tiene la comunidad?:</h3>
                <input onChange={e => setPotencialTuristico(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">22. Tipo de edificios públicos en la comunidad:</h3>
                <input onChange={e => setEdificiosPublicos(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              {/* Preguntas dependientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">23. ¿Hay inseguridad?</h3>
                <IonCheckbox className="CheckBox" checked={Inseguridad} onIonChange={(e) => setInseguridad(e.detail.checked)} />
                {Inseguridad && (
                  <>
                    <h3 className="labelForm">Tipo de inseguridad:</h3>
                    <input onChange={e => setTipoInseguridad(e.target.value)} type="text" className='TextBoxPeq' />
                  </>
                )}
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Grupos delincuenciales:</h3>
                <input onChange={e => setGruposDelincuenciales(e.target.value)} type="text" className='TextBoxPeq' />
              </IonRow>

              {/* Preguntas relacionadas */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">24. ¿Cuántas personas trabajan en otros municipios o departamentos?:</h3>
                <input onChange={e => setPersonasOtrosMunicipios(e.target.value)} type="text" className='TextBoxPeq' />
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setTipoTrabajo(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">25. ¿Hay personas en EE. UU.?</h3>
                <IonCheckbox className="CheckBox" checked={PersonasEEUU} onIonChange={(e) => setPersonasEEUU(e.detail.checked)} />
                {PersonasEEUU && (
                  <>
                    <h3 className="labelForm">¿Cuántas?</h3>
                    <input onChange={e => setCantidadPersonasEEUU(e.target.value)} type="text" className='TextBoxPeq' />
                    <h3 className="labelForm">¿Hay menores de edad en EE. UU.?</h3>
                    <IonCheckbox className="CheckBox" checked={MenoresEEUU} onIonChange={(e) => setMenoresEEUU(e.detail.checked)} />
                  </>
                )}
              </IonRow>

              {/* Preguntas con múltiples campos */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">26. ¿A qué edad empiezan a trabajar en la comunidad?</h3>
                <h3 className="labelForm">Hombres:</h3>
                <input onChange={e => setEdadTrabajoHombres(e.target.value)} type="text" className='TextBoxPeq' />
                <h3 className="labelForm">Mujeres:</h3>
                <input onChange={e => setEdadTrabajoMujeres(e.target.value)} type="text" className='TextBoxPeq' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setOcupaciones(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              {/* Jubilados */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">27. ¿Existen jubilados en la comunidad?</h3>
                <IonCheckbox className="CheckBox" checked={Jubilados} onIonChange={(e) => setJubilados(e.detail.checked)} />
                {Jubilados && (
                  <>
                    <h3 className="labelForm">¿Cuántos?</h3>
                    <input onChange={e => setCantidadJubilados(e.target.value)} type="text" className='TextBox' />
                    <h3 className="labelForm">¿De cuál institución?</h3>
                    <input onChange={e => setInstitucionJubilados(e.target.value)} type="text" className='TextBox' />
                  </>
                )}
              </IonRow>

              {/* Ocupaciones tradicionales */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">28. Ocupaciones tradicionales más importantes de las mujeres:</h3>
                <input onChange={e => setOcupacionesMujeres(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Ocupaciones tradicionales más importantes de los hombres:</h3>
                <input onChange={e => setOcupacionesHombres(e.target.value)} type="text" className='TextBox' />
              </IonRow>
            </div>
          </IonTab>
          
          {/* Inician las nuevas ---------------------------------*/}
          {/* Tab de Servicios */}
          <IonTab tab="Servicios">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Servicios</h2>
                <h3 style={{color: "GrayText", fontSize: "14px", paddingLeft: "10px"}}>(Los campos subrayados son obligatorios)</h3>
              </IonRow>                              

               {/* Pregunta 30: ¿Hay energía eléctrica? y Tipo(s) de servicio */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">30. ¿Hay energía eléctrica?</h3>
                <IonCheckbox
                  checked={energiaElectrica}
                  onIonChange={(e) => setEnergiaElectrica(e.target.checked)}
                />
                <h3 className="labelForm">Tipo(s) de servicio:</h3>
                <input
                  onChange={(e) => setTipoServicio(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 31: Calidad del servicio y Costos del servicio */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">31. Calidad del servicio:</h3>
                <input
                  onChange={(e) => setCalidadServicio(e.target.value)}
                  type="text"
                  className="TextBox"
                />
                <h3 className="labelForm">Costos del servicio:</h3>
                <input
                  onChange={(e) => setCostosServicio(e.target.value)}
                  type="text"
                  className="TextBoxPeq"
                />
              </IonRow>

              {/* Pregunta 32: ¿Quién presta el servicio? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">32. ¿Quién presta el servicio?</h3>
                <input
                  onChange={(e) => setPrestadorServicio(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 33: ¿Cuántas familias cuentan con el servicio? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">33. ¿Cuántas familias cuentan con el servicio?</h3>
                <input
                  onChange={(e) => setFamiliasConServicio(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 34: Señal de teléfono, Señal de internet, Señal de TV, Cable */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">34. Señal de teléfono:</h3>
                <IonCheckbox
                  checked={senalTelefono}
                  onIonChange={(e) => setSenalTelefono(e.target.checked)}
                />
                <h3 className="labelForm">Señal de internet:</h3>
                <IonCheckbox
                  checked={senalInternet}
                  onIonChange={(e) => setSenalInternet(e.target.checked)}
                />
                <h3 className="labelForm">Señal de TV:</h3>
                <IonCheckbox
                  checked={senalTV}
                  onIonChange={(e) => setSenalTV(e.target.checked)}
                />
                <h3 className="labelForm">Cable:</h3>
                <IonCheckbox
                  checked={cable}
                  onIonChange={(e) => setCable(e.target.checked)}
                />
              </IonRow>

              {/* Pregunta 35: ¿Quién(es) prestan el servicio? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">35. ¿Quién(es) prestan el servicio?</h3>
                <input
                  onChange={(e) => setPrestadorServicios(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>
            </div>
          </IonTab>

          {/* Tab de Educación */}
          <IonTab tab="Educacion">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Educación</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>

              {/* Pregunta 31: ¿Qué Instituciones educativas están presentes en la comunidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">31. ¿Qué Instituciones educativas están presentes en la comunidad?</h3>
                <input
                  onChange={(e) => setInstitucionesEducativas(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 32: ¿Cuáles edificios educativos existen en la comunidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">32. ¿Cuáles edificios educativos existen en la comunidad?</h3>
                <input
                  onChange={(e) => setEdificiosEducativos(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 33: ¿Quién los construyó? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">33. ¿Quién los construyó?</h3>
                <input
                  onChange={(e) => setConstructorEdificios(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 34: ¿Con qué materiales se construyeron los edificios educativos en la comunidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">34. ¿Con qué materiales se construyeron los edificios educativos en la comunidad?</h3>
                <input
                  onChange={(e) => setMaterialesConstruccion(e.target.value)}
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 35: ¿Quién es el dueño del terreno donde se ubica el edificio educativo? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">35. ¿Quién es el dueño del terreno donde se ubica el edificio educativo?</h3>
                <input
                  onChange={(e) => setDuenoTerreno(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 36: ¿Considera usted que a los estudiantes les gustaría seguir preparándose? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">36. ¿Considera usted que a los estudiantes les gustaría seguir preparándose?</h3>
                <IonCheckbox
                  checked={deseoPreparacion}
                  onIonChange={(e) => setDeseoPreparacion(e.target.checked)}
                />
              </IonRow>

              {/* Pregunta 37: ¿Qué limitantes considera usted que existen para que las personas puedan seguir estudiando? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">37. ¿Qué limitantes considera usted que existen para que las personas puedan seguir estudiando?</h3>
                <input
                  onChange={(e) => setLimitantesEstudio(e.target.value)}
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 38: ¿Cuántas personas están estudiando una carrera de nivel medio? H M */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">38. ¿Cuántas personas están estudiando una carrera de nivel medio?</h3>
                <h3 className="labelForm">Hombres:</h3>
                <input
                  onChange={(e) => setPersonasCarreraMedioH(e.target.value)}
                  type="text"
                  className="TextBoxPeq"
                />
                <h3 className="labelForm">Mujeres:</h3>
                <input
                  onChange={(e) => setPersonasCarreraMedioM(e.target.value)}
                  type="text"
                  className="TextBoxPeq"
                />
              </IonRow>

              {/* Pregunta 39: ¿Cuántas personas han concluido sus estudios de nivel medio? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">39. ¿Cuántas personas han concluido sus estudios de nivel medio?</h3>
                <input
                  onChange={(e) => setPersonasConcluyeronMedio(e.target.value)}
                  type="text"
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 40: ¿Cuántas personas estudian en alguna universidad? H M */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">40. ¿Cuántas personas estudian en alguna universidad?</h3>
                <h3 className="labelForm">Hombres:</h3>
                <input
                  onChange={(e) => setPersonasUniversidadH(e.target.value)}
                  type="text"
                  className="TextBoxPeq"
                />
                <h3 className="labelForm">Mujeres:</h3>
                <input
                  onChange={(e) => setPersonasUniversidadM(e.target.value)}
                  type="text"
                  className="TextBoxPeq"
                />
              </IonRow>

              {/* Pregunta 41: ¿Existen personas de la comunidad que abandonaron sus estudios universitarios? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">41. ¿Existen personas de la comunidad que abandonaron sus estudios universitarios?</h3>
                <IonCheckbox
                  checked={abandonoEstudios}
                  onIonChange={(e) => setAbandonoEstudios(e.target.checked)}
                />
              </IonRow>

              {/* Pregunta 42: ¿Cuáles son las carreras más comunes que estudian en el nivel medio? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">42. ¿Cuáles son las carreras más comunes que estudian en el nivel medio?</h3>
                <input
                  onChange={(e) => setCarrerasNivelMedio(e.target.value)}
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 43: ¿Cuáles son las carreras más comunes que estudian en la universidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">43. ¿Cuáles son las carreras más comunes que estudian en la universidad?</h3>
                <input
                  onChange={(e) => setCarrerasUniversidad(e.target.value)}
                  className="TextBox"
                />
              </IonRow>
            </div>
          </IonTab>
            
            {/* Tab agua y saneamiento */}
          <IonTab tab="Agua&Sane">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Agua y Saneamiento</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>

              {/* Pregunta 44: ¿Cómo se abastece de agua la comunidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">44. ¿Cómo se abastece de agua la comunidad?</h3>
              </IonRow>
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Agua entubada</h3>
                <IonCheckbox
                  checked={aguaEntubada}
                  onIonChange={(e) => setAguaEntubada(e.target.checked)}
                />
                <h3 className="labelForm">Pozo</h3>
                <IonCheckbox
                  checked={pozo}
                  onIonChange={(e) => setPozo(e.target.checked)}
                />
                <h3 className="labelForm">Agua de lluvia</h3>
                <IonCheckbox
                  checked={aguaLluvia}
                  onIonChange={(e) => setAguaLluvia(e.target.checked)}
                />
                <h3 className="labelForm">Río</h3>
                <IonCheckbox
                  checked={rio}
                  onIonChange={(e) => setRio(e.target.checked)}
                />
                <h3 className="labelForm">Laguna</h3>
                <IonCheckbox
                  checked={laguna}
                  onIonChange={(e) => setLaguna(e.target.checked)}
                />
                <h3 className="labelForm">Estanque</h3>
                <IonCheckbox
                  checked={estanque}
                  onIonChange={(e) => setEstanque(e.target.checked)}
                />
                <h3 className="labelForm">Compra</h3>
                <IonCheckbox
                  checked={compraAgua}
                  onIonChange={(e) => setCompraAgua(e.target.checked)}
                />
              </IonRow>

              {/* Pregunta 45: Manejo de excretas */}
                <IonRow className="FilaTextBox">
                <h3 className="labelForm">45. Manejo de excretas:</h3>                  
                </IonRow>

                <IonRow class="FilaTextBox">
                <h3 className="labelForm">Inodoro lavable</h3>
                <IonCheckbox
                  checked={inodoroLavable}
                  onIonChange={(e) => setInodoroLavable(e.target.checked)}
                />
                <h3 className="labelForm">Letrina</h3>
                <IonCheckbox
                  checked={letrina}
                  onIonChange={(e) => setLetrina(e.target.checked)}
                />
                <h3 className="labelForm">Pozo ventilado</h3>
                <IonCheckbox
                  checked={pozoVentilado}
                  onIonChange={(e) => setPozoVentilado(e.target.checked)}
                />
                <h3 className="labelForm">Campo</h3>
                <IonCheckbox
                  checked={campoExcretas}
                  onIonChange={(e) => setCampoExcretas(e.target.checked)}
                />
              </IonRow>

              {/* Pregunta 46: ¿Cómo se maneja la basura? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">46. ¿Cómo se maneja la basura?</h3>
                <input
                  onChange={(e) => setManejoBasura(e.target.value)}
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 47: ¿Qué tipo de basura se ve en la comunidad? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">47. ¿Qué tipo de basura se ve en la comunidad?</h3>
                <input
                  onChange={(e) => setTipoBasura(e.target.value)}
                  className="TextBox"
                />
              </IonRow>

              {/* Pregunta 48: Fuente de energía calórica para cocinar */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">48. Fuente de energía calórica para cocinar alimentos:</h3>
              </IonRow>
              <IonRow className="FilaTextBox">                  
                <h3 className="labelForm">Leña</h3>
                <IonCheckbox
                  checked={fuenteEnergiaLenia}
                  onIonChange={(e) => setFuenteEnergiaLenia(e.target.checked)}
                />
                <h3 className="labelForm">Gas</h3>
                <IonCheckbox
                  checked={fuenteEnergiaGas}
                  onIonChange={(e) => setFuenteEnergiaGas(e.target.checked)}
                />
                <h3 className="labelForm">Carbón</h3>
                <IonCheckbox
                  checked={fuenteEnergiaCarbon}
                  onIonChange={(e) => setFuenteEnergiaCarbon(e.target.checked)}
                />
              
                <h3 className="labelForm">Otros:</h3>      
                <input
                  onChange={(e) => setFuenteEnergiaOtros(e.target.value)}
                  type="text"
                  className="TextBox"
                  />              
              </IonRow>

              {/* Pregunta 49: ¿En donde cocina? */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">49. ¿En dónde cocina?</h3>
              </IonRow>
              <IonRow className="FilaTextBox">                  
                <h3 className="labelForm"> Estufa ahorradora</h3>
                <IonCheckbox
                  checked={estufaAhorradora}
                  onIonChange={(e) => setEstufaAhorradora(e.target.checked)}
                />
                <h3 className="labelForm">Estufa a gas</h3>
                <IonCheckbox
                  checked={estufaGas}
                  onIonChange={(e) => setEstufaGas(e.target.checked)}
                />
                <h3 className="labelForm">Polletón</h3>
                <IonCheckbox
                  checked={polleton}
                  onIonChange={(e) => setPolleton(e.target.checked)}
                />
                <h3 className="labelForm">Suelo</h3>
                <IonCheckbox
                  checked={sueloCocina}
                  onIonChange={(e) => setSueloCocina(e.target.checked)}
                /> 
              </IonRow>

              {/* Pregunta 52: ¿Hubo o hay capacitaciones sobre saneamiento ambiental? */}
              
              {capacitacionesSaneamiento && (
                  <>
                    {/* Pregunta 52.1: ¿De qué se trata o trató? */}
                    <IonRow className="FilaTextBox">
                      <h3 className="labelForm">¿De qué se trata o trató?</h3>
                      <input
                        onChange={(e) => setDetalleCapacitaciones(e.target.value)}
                        className="TextBox"
                      />
                    </IonRow>
                  </>
              )}
            </div>
          </IonTab>
                
          {/* Tab de Salud y Nutrición */}
          <IonTab tab="Salud&Nut">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Salud y Nutrición</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>
                {/* Pregunta 53 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">53. Consumo de alimentos:</h3>
              </IonRow>
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Pollo congelado</h3>
                <IonCheckbox checked={polloCongelado} onIonChange={e => setPolloCongelado(e.target.checked)} />
                <h3 className="labelForm">Pollo criollo</h3>
                <IonCheckbox checked={polloCriollo} onIonChange={e => setPolloCriollo(e.target.checked)} />
                <h3 className="labelForm">Cerdo</h3>
                <IonCheckbox checked={cerdo} onIonChange={e => setCerdo(e.target.checked)} />
                <h3 className="labelForm">Res</h3>
                <IonCheckbox checked={res} onIonChange={e => setRes(e.target.checked)} />
                <h3 className="labelForm">Carne de monte</h3>
                <IonCheckbox checked={carneMonte} onIonChange={e => setCarneMonte(e.target.checked)} />
                <h3 className="labelForm">Pescado</h3>
                <IonCheckbox checked={pescado} onIonChange={e => setPescado(e.target.checked)} />
    
                <h3 className="labelForm">Maíz</h3>
                <IonCheckbox checked={maiz} onIonChange={e => setMaiz(e.target.checked)} />
                <h3 className="labelForm">Frijol</h3>
                <IonCheckbox checked={frijol} onIonChange={e => setFrijol(e.target.checked)} />
                <h3 className="labelForm">Verduras</h3>
                <IonCheckbox checked={verduras} onIonChange={e => setVerduras(e.target.checked)} />
                <h3 className="labelForm">Legumbres</h3>
                <IonCheckbox checked={legumbres} onIonChange={e => setLegumbres(e.target.checked)} />
                <h3 className="labelForm">Pastas</h3>
                <IonCheckbox checked={pastas} onIonChange={e => setPastas(e.target.checked)} />
  
                <h3 className="labelForm">Sopas</h3>
                <IonCheckbox checked={sopas} onIonChange={e => setSopas(e.target.checked)} />
                <h3 className="labelForm">Arroz</h3>
                <IonCheckbox checked={arroz} onIonChange={e => setArroz(e.target.checked)} />
                <h3 className="labelForm">Tubérculos/raíces</h3>
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Papa</h3>
                <IonCheckbox checked={papa} onIonChange={e => setPapa(e.target.checked)} />
                <h3 className="labelForm">Malanga</h3>
                <IonCheckbox checked={malanga} onIonChange={e => setMalanga(e.target.checked)} />
                <h3 className="labelForm">Camote</h3>
                <IonCheckbox checked={camote} onIonChange={e => setCamote(e.target.checked)} />
                <h3 className="labelForm">Yuca</h3>
                <IonCheckbox checked={yuca} onIonChange={e => setYuca(e.target.checked)} />
                <h3 className="labelForm">Otro</h3>
                <input type="text" value={otroTuberculo} onChange={e => setOtroTuberculo(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Pregunta 54 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">54. ¿Hay puesto de salud?</h3>
                <IonCheckbox checked={puestoSalud} onIonChange={e => setPuestoSalud(e.target.checked)} />
                <h3 className="labelForm">¿Cada cuánto llega doctor/a?</h3>
                <input type="text" value={frecuenciaDoctor} onChange={e => setFrecuenciaDoctor(e.target.value!)} className="TextBox" />
              </IonRow>
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">¿Hay enfermero/a?</h3>
                <IonCheckbox checked={hayEnfermero} onIonChange={e => setHayEnfermero(e.target.checked)} />
                <h3 className="labelForm">¿Hay Centro de Convergencia?</h3>
                <IonCheckbox checked={centroConvergencia} onIonChange={e => setCentroConvergencia(e.target.checked)} />
                <h3 className="labelForm">¿Para qué se usa?</h3>
                <input type="text" value={usoCentroConvergencia} onChange={e => setUsoCentroConvergencia(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Preguntas adicionales */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">55. ¿Qué se hace en caso de emergencia?</h3>
                <input type="text" value={Emergencia} onChange={e => setEmergencia(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">56. ¿Qué tipos de emergencias ocurren?</h3>
                <input type="text" value={tiposEmergencias} onChange={e => setTiposEmergencias(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">57. ¿Llegan del centro de salud a vacunar a los niños y niñas?</h3>
                <IonCheckbox checked={vacunasNinos} onIonChange={e => setVacunasNinos(e.target.checked)} />
                
                {vacunasNinos && (
                  <>
                    <h3 className="labelForm">¿Con qué frecuencia?</h3>
                    <input type="text" value={frecuenciaVacunacion} onChange={e => setFrecuenciaVacunacion(e.target.value!)} className="TextBox" />
                  </>
                )}
              </IonRow>

              {/* Continuación del resto de preguntas */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">58. ¿Cuántos mayores de 60 años hay en la comunidad?</h3>
                <input type="text" value={mayores60} onChange={e => setMayores60(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">59. ¿Cuántas personas con capacidades diferentes hay en la comunidad?</h3>
                <input type="text" value={personasCapacidadesDiferentes} onChange={e => setPersonasCapacidadesDiferentes(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              {/* Pregunta final */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">60. ¿Cuántas personas en situación de abandono hay en la comunidad?</h3>
                <input type="text" value={personasAbandono} onChange={e => setPersonasAbandono(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">61. ¿Cuántos niños/as?</h3>
              </IonRow>
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">De 0 a 5 años</h3>
                <input type="text" value={ninos0a5} onChange={e => setNinos0a5(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">6 a 10</h3>
                <input type="text" value={ninos6a10} onChange={e => setNinos6a10(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">11 a 15</h3>
                <input type="text" value={ninos11a15} onChange={e => setNinos11a15(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">16 a 18</h3>
                <input type="text" value={ninos16a18} onChange={e => setNinos16a18(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              {/* Pregunta 62 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">62. ¿Cuántos recién nacidos hay en la comunidad?</h3>
                <input type="text" value={recienNacidos} onChange={e => setRecienNacidos(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              {/* Pregunta 63 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">63. ¿Ha muerto alguno?</h3>
                <IonCheckbox checked={ninosMuertos} onIonChange={e => setNinosMuertos(e.target.checked)} />
                <h3 className="labelForm">¿Hay niños desnutridos?</h3>
                <IonCheckbox checked={ninosDesnutridos} onIonChange={e => setNinosDesnutridos(e.target.checked)} />
              </IonRow>

              {/* Pregunta 64 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">64. ¿Cuántas mujeres embarazadas hay ahora?</h3>
                <input type="text" value={mujeresEmbarazadas} onChange={e => setMujeresEmbarazadas(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">¿Cuántos embarazos hay al año?</h3>
                <input type="text" value={embarazosAlAnio} onChange={e => setEmbarazosAlAnio(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              {/* Pregunta 65 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">65. ¿Qué tipo de enfermedades padecen las personas en la comunidad?</h3>
                <input type="text" value={tipoEnfermedades} onChange={e => setTipoEnfermedades(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Pregunta 66 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">66. ¿Cuántas comadronas?</h3>
                <input type="text" value={numComadronas} onChange={e => setNumComadronas(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">¿Cuántos promotores de salud?</h3>
                <input type="text" value={numPromotoresSalud} onChange={e => setNumPromotoresSalud(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">¿Curanderos?</h3>
                <input type="text" value={numCuranderos} onChange={e => setNumCuranderos(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              {/* Pregunta 67 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">67. ¿Hay botiquín comunitario?</h3>
                <IonCheckbox checked={botiquinComunitario} onIonChange={e => setBotiquinComunitario(e.target.checked)} />
                <h3 className="labelForm">¿Jardines medicinales?</h3>
                <IonCheckbox checked={jardinesMedicinales} onIonChange={e => setJardinesMedicinales(e.target.checked)} />
                <h3 className="labelForm">¿Venta de medicina?</h3>
                <IonCheckbox checked={ventaMedicina} onIonChange={e => setVentaMedicina(e.target.checked)} />
              </IonRow>

              {/* Pregunta 68 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">68. ¿Hay venta de bebidas alcohólicas?</h3>
                <IonCheckbox checked={ventaBebidasAlcoholicas} onIonChange={e => setVentaBebidasAlcoholicas(e.target.checked)} />
                <h3 className="labelForm">¿Cuántas?</h3>
                <input type="text" value={numPuntosVentaBebidas} onChange={e => setNumPuntosVentaBebidas(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">                
                <h3 className="labelForm">¿Tipo de bebidas?</h3>
                <input type="text" value={tiposBebidasAlcoholicas} onChange={e => setTiposBebidasAlcoholicas(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Pregunta 69 */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">69. ¿Se consume (mucho) tabaco (cigarrillos) en la comunidad?</h3>
                <IonCheckbox checked={consumoTabaco} onIonChange={e => setConsumoTabaco(e.target.checked)} />
                <h3 className="labelForm">Otros</h3>
                <input type="text" value={otrosConsumo} onChange={e => setOtrosConsumo(e.target.value!)} className="TextBox" />
              </IonRow>
            </div>            
          </IonTab>

          {/* Tab de Mapa de Actores */}
          <IonTab tab="MapadeActores">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Mapa de Actores</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">70. ¿Qué instituciones están presentes en la comunidad?</h3>
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">MAGA</h3>
                <IonCheckbox
                  checked={maga}
                  onIonChange={(e) => {
                    setMaga(e.detail.checked);
                    if (e.detail.checked) {
                      addActor('MAGA');
                    } else {
                      removeActor('MAGA');
                    }
                  }}
                />
                <h3 className="labelForm">FODES</h3>
                <IonCheckbox
                  checked={fodes}
                  onIonChange={(e) => {
                    setFodes(e.detail.checked);
                    if (e.detail.checked) {
                      addActor('FODES');
                    } else {
                      removeActor('FODES');
                    }
                  }}
                />
                <h3 className="labelForm">MIDES</h3>
                <IonCheckbox
                  checked={mides}
                  onIonChange={(e) => {
                    setMides(e.detail.checked);
                    if (e.detail.checked) {
                      addActor('MIDES');
                    } else {
                      removeActor('MIDES');
                    }
                  }}
                />
                <h3 className="labelForm">SESAN</h3>
                <IonCheckbox
                  checked={sesan}
                  onIonChange={(e) => {
                    setSesan(e.detail.checked);
                    if (e.detail.checked) {
                      addActor('SESAN');
                    } else {
                      removeActor('SESAN');
                    }
                  }}
                />
              </IonRow>
                
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">71. ¿Llega la Policía a la comunidad?</h3>
                <IonCheckbox
                  checked={llegaPolicia}
                  onIonChange={(e) => {
                    setLlegaPolicia(e.detail.checked);
                    if (e.detail.checked) {
                      addActor('Policía');
                    } else {
                      removeActor('Policía');
                    }
                  }}
                />
                <h3 className="labelForm">¿Existen otros comités?</h3>
                <IonCheckbox checked={comites} onIonChange={e => setComites(e.target.checked)} />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">72. ¿Cuáles ONG´s están presentes en la comunidad?</h3>
              </IonRow>
                {ongList.map((ong, index) => (
                  <IonRow key={index} className="FilaTextBox">
                    <IonInput
                      type="text"
                      placeholder="Nombre ONG"
                      value={ong.nombre}
                      onIonChange={(e) => {
                        const newOngList = [...ongList];
                        newOngList[index].nombre = e.detail.value!;
                        setOngList(newOngList);
                        if (e.detail.value) {
                          addActor(e.detail.value!);
                        } else {
                          removeActor(ong.nombre);
                        }
                      }}
                    />
                    <IonInput
                    style={{ marginbottom: "10px" }}
                      type="text"
                      placeholder="Trabajo en la comunidad"
                      value={ong.trabajo}
                      onIonChange={(e) => {
                        const newOngList = [...ongList];
                        newOngList[index].trabajo = e.detail.value!;
                        setOngList(newOngList);
                      }}
                    />
                  </IonRow>
                ))}
                <IonButton onClick={addOng}>Añadir ONG</IonButton>

                <IonRow className="FilaTextBox">
                  <h3 className="labelForm">73. Mapeo de actores</h3>
                  <table className="TablaActores">
                    <thead className="FilaTabla">
                      <tr>
                        <th>Nombre del actor</th>
                        <th>Aceptación en la comunidad (alta, media, baja)</th>
                        <th>Importancia en la comunidad (alta, media, baja)</th>
                        <th>Presencia en la comunidad (alta, media, baja)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actors.map((actor, index) => (
                        <tr key={index}>
                          <td className="celda">{actor.nombre}</td>
                          <td className="celda">
                            <IonSelect
                              value={actor.aceptacion}
                              onIonChange={(e) => {
                                const newActors = [...actors];
                                newActors[index].aceptacion = e.detail.value!;
                                setActors(newActors);
                              }}
                            >
                              <IonSelectOption value="alta">Alta</IonSelectOption>
                              <IonSelectOption value="media">Media</IonSelectOption>
                              <IonSelectOption className="celda" value="baja">Baja</IonSelectOption>
                            </IonSelect>
                          </td>
                          <td className="celda">
                            <IonSelect
                              value={actor.importancia}
                              onIonChange={(e) => {
                                const newActors = [...actors];
                                newActors[index].importancia = e.detail.value!;
                                setActors(newActors);
                              }}
                            >
                              <IonSelectOption value="alta">Alta</IonSelectOption>
                              <IonSelectOption value="media">Media</IonSelectOption>
                              <IonSelectOption value="baja">Baja</IonSelectOption>
                            </IonSelect>
                          </td>
                          <td>
                            <IonSelect
                              value={actor.presencia}
                              onIonChange={(e) => {
                                const newActors = [...actors];
                                newActors[index].presencia = e.detail.value!;
                                setActors(newActors);
                              }}
                            >
                              <IonSelectOption value="alta">Alta</IonSelectOption>
                              <IonSelectOption value="media">Media</IonSelectOption>
                              <IonSelectOption value="baja">Baja</IonSelectOption>
                            </IonSelect>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </IonRow>
            </div>
          </IonTab>

          {/* Tab de Agricultura */}
          <IonTab tab="Agricultura">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Agricultura</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>

            <IonRow className="FilaTextBox">
              <h3 className="labelForm">74. ¿Qué cultivos existen en la comunidad?</h3>
              </IonRow>
              <IonRow className="FilaTextBox">  
              <IonGrid>
                <IonRow>
                  <IonCol>Tipo de Cultivo</IonCol>
                  <IonCol>Área Promedio Cultivada</IonCol>
                  <IonCol>Rendimientos</IonCol>
                  <IonCol>Destino (Consumo/Venta)</IonCol>
                  <IonCol>Precios de Venta</IonCol>
                  <IonCol>Mes de Siembra</IonCol>
                  <IonCol>Mes de Cosecha</IonCol>
                </IonRow>

                {rows.map((row, index) => (
                  <IonRow key={index}>
                    <IonCol>
                      <IonInput
                        value={row.cultivo}
                        placeholder="Tipo de Cultivo"
                        onIonChange={(e) => handleInputChange(index, 'cultivo', e.detail.value!)}
                        />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.area}
                        placeholder="Área Cultivada"
                        onIonChange={(e) => handleInputChange(index, 'area', e.detail.value!)}
                      />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.rendimientos}
                        placeholder="Rendimientos"
                        onIonChange={(e) => handleInputChange(index, 'rendimientos', e.detail.value!)}
                      />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.destino}
                        placeholder="Destino"
                        onIonChange={(e) => handleInputChange(index, 'destino', e.detail.value!)}
                        />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.precio}
                        placeholder="Precio de Venta"
                        onIonChange={(e) => handleInputChange(index, 'precio', e.detail.value!)}
                      />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.siembra}
                        placeholder="Mes de Siembra"
                        onIonChange={(e) => handleInputChange(index, 'siembra', e.detail.value!)}
                        />
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={row.cosecha}
                        placeholder="Mes de Cosecha"
                        onIonChange={(e) => handleInputChange(index, 'cosecha', e.detail.value!)}
                      />
                    </IonCol>
                  </IonRow>
                ))}
                  <IonRow>
                    <IonCol>
                      <IonButton  color='secondary' onClick={addRow}><IonIcon slot="start" icon={add}></IonIcon>Agregar Fila</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonRow>

              {/*Preguntas*/}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">75. ¿Dónde comercializan los productos?</h3>
                <input type="text" value={comercializacionProductos} onChange={e => setComercializacionProductos(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">76. ¿El terreno donde se cultiva es?</h3>
                <IonCheckbox checked={terrenoPropio} onIonChange={e => setTerrenoPropio(e.target.checked)} /> Propio
                <IonCheckbox checked={terrenoPrestado} onIonChange={e => setTerrenoPrestado(e.target.checked)} /> Prestado
                <IonCheckbox checked={terrenoArrendado} onIonChange={e => setTerrenoArrendado(e.target.checked)} /> Arrendado
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">77. ¿Costo del arrendamiento?</h3>
                <input type="text" value={costoArrendamiento} onChange={e => setCostoArrendamiento(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">Período</h3>
                <input type="text" value={periodoArrendamiento} onChange={e => setPeriodoArrendamiento(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">78. ¿Cómo saben en qué momento sembrar?</h3>
                <input type="text" value={momentoSiembra} onChange={e => setMomentoSiembra(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">79. ¿Cuáles son las principales plagas y enfermedades de los cultivos?</h3>
                <input type="text" value={plagasEnfermedades} onChange={e => setPlagasEnfermedades(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">80. ¿Cuáles son los meses en que aparecen las plagas y enfermedades?</h3>
                <input type="text" value={mesesPlagas} onChange={e => setMesesPlagas(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">81. ¿Recuerda algunos cultivos que sembraban y que ahora ya no se siembran?</h3>
                <input type="text" value={cultivosAnteriores} onChange={e => setCultivosAnteriores(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">82. ¿Por qué ya no se siembran?</h3>
                <input type="text" value={razonNoSiembra} onChange={e => setRazonNoSiembra(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">83. ¿Hay nuevos cultivos en la comunidad?</h3>
                <input type="text" value={nuevosCultivos} onChange={e => setNuevosCultivos(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">84. Sistemas productivos tradicionales:</h3>
                <input type="text" value={sistemasProductivos} onChange={e => setSistemasProductivos(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">85. ¿Qué se hace con los cultivos cuando hay sequía?</h3>
                <input type="text" value={accionesSequía} onChange={e => setAccionesSequía(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">86. ¿Qué se hace con los cultivos cuando hay mucha lluvia?</h3>
                <input type="text" value={accionesLluvia} onChange={e => setAccionesLluvia(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Pregunta dependiente */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">87. ¿Algunos años se han perdido las cosechas?</h3>
                <IonCheckbox className="CheckBox" checked={perdidaCosechas} onIonChange={(e) => setPerdidaCosechas(e.detail.checked)} />
                {perdidaCosechas && (
                  <>
                    <h3 className="labelForm">¿En qué año?</h3>
                    <input type="text" value={añoPerdidaCosechas} onChange={e => setAñoPerdidaCosechas(e.target.value!)} className="TextBoxPeq" />
                    <h3 className="labelForm">¿A causa de qué?</h3>
                    <input type="text" value={causaPerdidaCosechas} onChange={e => setCausaPerdidaCosechas(e.target.value!)} className="TextBox" />
                  </>
                )}
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">88. ¿Han recibido capacitaciones sobre agricultura?</h3>
                <IonCheckbox checked={capacitacionesAgricultura} onIonChange={(e) => setCapacitacionesAgricultura(e.target.checked)} />
                {capacitacionesAgricultura && (
                  <>
                    <h3 className="labelForm">¿Qué tipo?</h3>
                    <input type="text" value={tipoCapacitacion} onChange={e => setTipoCapacitacion(e.target.value!)} className="TextBoxPeq" />
                  </>
                )}
                
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">89. ¿Qué organización las imparte o impartió?</h3>
                <input type="text" value={organizacionCapacitacion} onChange={e => setOrganizacionCapacitacion(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">90. ¿Qué actividad realiza cuando no hay siembra ni cosecha?</h3>
                <input type="text" value={actividadSinSiembra} onChange={e => setActividadSinSiembra(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">91. Uso de productos químicos:</h3>
                <h3 className="labelForm">Pesticidas</h3>
                <IonCheckbox checked={usoPesticidas} onIonChange={e => setUsoPesticidas(e.target.checked)} /> 
                <h3 className="labelForm">Insecticidas</h3>
                <IonCheckbox checked={usoInsecticidas} onIonChange={e => setUsoInsecticidas(e.target.checked)} /> 
                <h3 className="labelForm">Herbicidas</h3>
                <IonCheckbox checked={usoHerbicidas} onIonChange={e => setUsoHerbicidas(e.target.checked)} />
                <h3 className="labelForm">Fungicidas</h3>
                <IonCheckbox checked={usoFungicidas} onIonChange={e => setUsoFungicidas(e.target.checked)} />
                <h3 className="labelForm">Fertilizantes</h3>
                <IonCheckbox checked={usoFertilizantes} onIonChange={e => setUsoFertilizantes(e.target.checked)} />
                <h3 className="labelForm">Otros:</h3>
                <input type="text" value={usoOtros} onChange={e => setUsoOtros(e.target.value!)} className="TextBox" />
              </IonRow>

            </div>
          </IonTab>

          {/* Tab de Actividades Pecuarias */}
          <IonTab tab="ActividadesPec">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Actividades Pecuarias</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>
              <h3 className="labelForm">92. Actividades</h3>
              <IonGrid>
                <IonRow>
                  <IonCol>Tipo de Producción</IonCol>
                  <IonCol>Frecuencia en la Crianza (años, meses, semanas)</IonCol>
                  <IonCol>Tipo de Alimento que Consume</IonCol>
                  <IonCol>En qué Área se Crían</IonCol>
                  <IonCol>Venta</IonCol>
                  <IonCol>Precio de Venta</IonCol>
                  <IonCol>Donde se Venden</IonCol>
                </IonRow>

                  {rows2.map((row, index) => (
                    <IonRow key={index}>
                      <IonCol>
            <IonInput
              value={row.tipo}
              placeholder="Tipo de Producción"
              onIonChange={(e) => handleInputChange(index, 'tipo', e.detail.value!)}
            />
          </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.frecuencia}
                          placeholder="Frecuencia"
                          onIonChange={(e) => handleInputChange(index, 'frecuencia', e.detail.value!)}
                        />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.alimento}
                          placeholder="Alimento"
                          onIonChange={(e) => handleInputChange(index, 'alimento', e.detail.value!)}
                        />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.area}
                          placeholder="Área"
                          onIonChange={(e) => handleInputChange(index, 'area', e.detail.value!)}
                        />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.venta}
                          placeholder="Venta"
                          onIonChange={(e) => handleInputChange(index, 'venta', e.detail.value!)}
                        />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.precio}
                          placeholder="Precio"
                          onIonChange={(e) => handleInputChange(index, 'precio', e.detail.value!)}
                        />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={row.donde}
                          placeholder="Donde se Venden"
                          onIonChange={(e) => handleInputChange(index, 'donde', e.detail.value!)}
                        />
                      </IonCol>
                    </IonRow>
                  ))}
                <IonRow>
                  <IonCol>
                    <IonButton color="secondary"  onClick={addRow2}><IonIcon slot="start" icon={add}></IonIcon>Agregar Fila</IonButton>
                  </IonCol>
                </IonRow>
             </IonGrid>

              {/*Preguntas*/}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">93. ¿Cómo se consigue el alimento para los animales?</h3>
                <input type="text" value={alimentoAnimales} onChange={e => setAlimentoAnimales(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">94. ¿Se implementan planes profilácticos?</h3>
                <IonCheckbox
                  checked={planesProfilacticos}
                  onIonChange={e => setPlanesProfilacticos(e.target.checked)}
                />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">95. ¿Qué enfermedades les afectan?</h3>
                <input type="text" value={enfermedadesAnimales} onChange={e => setEnfermedadesAnimales(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">96. ¿En qué meses se enferman?</h3>
                <input type="text" value={mesesEnfermedad} onChange={e => setMesesEnfermedad(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">97. ¿Reciben capacitaciones?</h3>
                <IonCheckbox
                  checked={capacitacionesAnimales}
                  onIonChange={e => setCapacitacionesAnimales(e.target.checked)}
                />
                {capacitacionesAnimales && (
                  <>
                    <h3 className="labelForm">¿De qué tipo?</h3>
                    <input type="text" value={tipoCapacitacionAnimales} onChange={e => setTipoCapacitacionAnimales(e.target.value!)} className="TextBox" />
                  </>
                )}
              </IonRow>
            </div>
          </IonTab>

          {/* Tab de Ecología */}
          <IonTab tab="Ecologia">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Ecología</h2>
                <h3 style={{ color: "GrayText", fontSize: "14px", paddingLeft: "10px" }}>
                  (Los campos subrayados son obligatorios)
                </h3>
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">99. ¿Hay algún bosque comunitario?</h3>
                <IonCheckbox checked={bosqueComunitario} onIonChange={(e) => setBosqueComunitario(e.target.checked)} />
                <h3 className="labelForm">¿Qué dimensiones tiene?</h3>
                <input type="text" value={dimensionesBosque} onChange={e => setDimensionesBosque(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">100. ¿Qué especies de árboles tiene?</h3>
                <input type="text" value={especiesArboles} onChange={e => setEspeciesArboles(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">101. ¿Qué otras especies de plantas tienen?</h3>
                <input type="text" value={especiesPlantas} onChange={e => setEspeciesPlantas(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">102. ¿Existen un programa de incentivos forestales?</h3>
                <IonCheckbox checked={incentivosForestales} onIonChange={(e) => setIncentivosForestales(e.target.checked)} />
                <h3 className="labelForm">¿Bosques potenciales para incentivos forestales?</h3>
                <input type="text" value={bosquesPotenciales} onChange={e => setBosquesPotenciales(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">103. ¿Hay viveros?</h3>
                <IonCheckbox checked={viveros} onIonChange={(e) => setViveros(e.target.checked)} />
                <h3 className="labelForm">¿Han reforestado?</h3>
                <IonCheckbox checked={reforestado} onIonChange={(e) => setReforestado(e.target.checked)} />
                <h3 className="labelForm">Área:</h3>
                <input type="text" value={areaReforestada} onChange={e => setAreaReforestada(e.target.value!)} className="TextBoxPeq" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">104. ¿Quién la impulsó?</h3>
                <input type="text" value={impulsorReforestacion} onChange={e => setImpulsorReforestacion(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">105. ¿Quién es el dueño de la tierra donde hay bosque?</h3>
                <input type="text" value={duenoTierraBosque} onChange={e => setDuenoTierraBosque(e.target.value!)} className="TextBox" />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">106. ¿Hay personas que son dueñas de motosierras en la comunidad?</h3>
                <IonCheckbox checked={duenosMotosierras} onIonChange={(e) => setDuenosMotosierras(e.target.checked)} />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">107. ¿Se tala para cultivar?</h3>
                <IonCheckbox checked={talaParaCultivar} onIonChange={(e) => setTalaParaCultivar(e.target.checked)} />
                <h3 className="labelForm">¿Se hacen rozas o quemas?</h3>
                <input type="text" value={rozasQuemas} onChange={e => setRozasQuemas(e.target.value!)} className="TextBox" />
              </IonRow>

              {/* Preguntas dependientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">108. ¿Han ocurrido incendios forestales?</h3>
                <IonCheckbox checked={incendiosForestales} onIonChange={(e) => setIncendiosForestales(e.detail.checked)} />
                {incendiosForestales && (
                  <>
                    <h3 className="labelForm">¿Por qué razón?</h3>
                    <input type="text" value={razonIncendios} onChange={e => setRazonIncendios(e.target.value!)} className="TextBoxPeq" />
                    <h3 className="labelForm">¿Qué área?</h3>
                    <input type="text" value={areaIncendio} onChange={e => setAreaIncendio(e.target.value!)} className="TextBoxPeq" />
                    <h3 className="labelForm">¿Cuándo?</h3>
                    <input type="text" value={fechaIncendio} onChange={e => setFechaIncendio(e.target.value!)} className="TextBoxPeq" />
                  </>
                )}
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">110. ¿Hay fuentes de agua?</h3>
                <IonCheckbox checked={fuentesAgua} onIonChange={(e) => setFuentesAgua(e.target.checked)} />
                <h3 className="labelForm">¿Cuántos nacimientos?</h3>
                <input type="text" value={numNacimientos} onChange={e => setNumNacimientos(e.target.value!)} className="TextBoxPeq" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">111. ¿Quién es el propietario de la tierra en donde están las fuentes de agua o nacimientos?</h3>
                <input type="text" value={duenoTierraFuentes} onChange={e => setDuenoTierraFuentes(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">112. ¿Qué acciones se realizan para conservar las fuentes de agua?</h3>
                <input type="text" value={accionesConservacionAgua} onChange={e => setAccionesConservacionAgua(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">113. ¿Cuántos pozos?</h3>
                <input type="text" value={numPozos} onChange={e => setNumPozos(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">¿Cuántos ríos hay cerca?</h3>
                <input type="text" value={numRios} onChange={e => setNumRios(e.target.value!)} className="TextBoxPeq" />
                <h3 className="labelForm">¿Cuántas lagunas?</h3>
                <input type="text" value={numLagunas} onChange={e => setNumLagunas(e.target.value!)} className="TextBoxPeq" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">114. Otras fuentes de agua</h3>
                <input type="text" value={otrasFuentesAgua} onChange={e => setOtrasFuentesAgua(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">115. ¿Hubo algún proyecto medio ambiental?</h3>
                <IonCheckbox checked={proyectoMedioAmbiental} onIonChange={(e) => setProyectoMedioAmbiental(e.target.checked)} />
                <h3 className="labelForm">¿Qué se hizo?</h3>
                <input type="text" value={accionesProyecto} onChange={e => setAccionesProyecto(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">116. ¿Qué acciones se realizan para conservar el medio ambiente?</h3>
                <input type="text" value={accionesConservacionAmbiente} onChange={e => setAccionesConservacionAmbiente(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">117. ¿Cuáles animales silvestres se ven?</h3>
                <input type="text" value={animalesSilvestres} onChange={e => setAnimalesSilvestres(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">118. ¿Cuáles animales se ven por temporadas?</h3>
                <input type="text" value={animalesPorTemporada} onChange={e => setAnimalesPorTemporada(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">119. ¿Qué plantas ya no existen en la comunidad?</h3>
                <input type="text" value={plantasExtintas} onChange={e => setPlantasExtintas(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">120. ¿Qué plantas son difíciles de ver ahora?</h3>
                <input type="text" value={plantasDificiles} onChange={e => setPlantasDificiles(e.target.value!)} className="TextBox" />
              </IonRow>
              
              {/* Preguntas dependientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">121. ¿La comunidad ha sido afectada por algún desastre natural?</h3>
                <IonCheckbox checked={desastreNatural} onIonChange={(e) => setDesastreNatural(e.detail.checked)} />
                {desastreNatural && (
                  <>
                    <h3 className="labelForm">¿En qué año?</h3>
                    <input type="text" value={anioDesastre} onChange={e => setAnioDesastre(e.target.value!)} className="TextBoxPeq" />
                    <h3 className="labelForm">¿Qué tipo de desastre ha ocurrido?</h3>
                    <input type="text" value={tipoDesastre} onChange={e => setTipoDesastre(e.target.value!)} className="TextBoxPeq" />
                  </>
                )}
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">122. ¿Cómo se responde ante un desastre?</h3>
                <input type="text" value={respuestaDesastre} onChange={e => setRespuestaDesastre(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">123. ¿Hay COLRED?</h3>
                <IonCheckbox checked={colred} onIonChange={(e) => setColred(e.target.checked)} />
                <h3 className="labelForm">Otras instituciones de atención a desastres</h3>
                <input type="text" value={otrasInstituciones} onChange={e => setOtrasInstituciones(e.target.value!)} className="TextBox" />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">124. ¿Qué amenaza de desastre existe en la comunidad?</h3>
                <input type="text" value={amenazaDesastre} onChange={e => setAmenazaDesastre(e.target.value!)} className="TextBox" />
              </IonRow>
              
              </div>
            </IonTab>      
                        {/* Hasta aca ---------------------------------*/}
              
                        <IonTabBar className="TabBarConf" slot="top">
                          <IonTabButton tab="DatosGenerales" onClick={() => setSeccionActual('DatosGenerales')}> <IonIcon size="large" icon={earthOutline} /> </IonTabButton>
                          <IonTabButton tab="Servicios" onClick={() => setSeccionActual('Servicios')}> <IonIcon size="large" icon={cogOutline} /> </IonTabButton>
                          <IonTabButton tab="Educacion"> <IonIcon size="large" icon={bookOutline} /> </IonTabButton>
                          <IonTabButton tab="Agua&Sane"> <IonIcon size="large" icon={waterOutline} /> </IonTabButton>
                          <IonTabButton tab="Salud&Nut"> <IonIcon size="large" icon={fitnessOutline} /> </IonTabButton>
                          <IonTabButton tab="MapadeActores"> <IonIcon size="large" icon={peopleOutline} /> </IonTabButton>
                          <IonTabButton tab="Agricultura"> <PiPlantFill size={28}   /> </IonTabButton>
                          <IonTabButton tab="ActividadesPec"><PiCowFill size={28} /></IonTabButton>
                          <IonTabButton tab="Ecologia"><FaRecycle size={25} /></IonTabButton>
          </IonTabBar>

        </IonTabs>
      </IonContent>

      <IonRow>
        <IonButton className="Boton" color="success" onClick={handleGuardarComunidad}>Guardar</IonButton>
        <IonButton className="Boton" color="danger">Cancelar</IonButton>
      </IonRow>
      
      {/* Alerta de validación */}
      <IonAlert
        isOpen={showValidationAlert}
        onDidDismiss={() => setShowValidationAlert(false)}
        header={'Campos incompletos'}
        message={'Por favor, completa todos los campos obligatorios'}
        buttons={['Aceptar']}
      />

      <IonAlert
        isOpen={showSuccessAlert}
        onDidDismiss={() => setShowSuccessAlert(false)}
        header={'Registro Exitoso'}
        message={'La comunidad ha sido registrada correctamente.'}
        buttons={['Aceptar']}
      />
    </IonPage>

  );
}

export default AgregarComunidades;
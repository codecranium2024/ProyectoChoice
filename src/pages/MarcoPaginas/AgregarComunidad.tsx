import React from "react";
import {IonSelectOption, IonSelect,IonText,IonPage,IonHeader,IonTab,IonContent,IonTabBar,IonTabButton,IonTabs,IonToolbar,IonTitle,IonIcon,IonButton, IonRow,IonCheckbox,IonList,IonItem} from "@ionic/react";
import './../../components/MarcoComp/style.css';
import { bookOutline, cog, cogOutline, earthOutline, fitnessOutline, globeOutline, leafOutline, peopleOutline, waterOutline } from 'ionicons/icons';
import { useState } from "react";
/* Basic CSS for apps built with Ionic */

function AgregarComunidades() {
  let [Comunidad, setComunidad] = useState('Comunidad')
  let [Municipio, setMunicipio] = useState('Municipio');
  let [Aldea, setAldea] = useState('Aldea');
  let [PresidenteCOCODE, setPresidenteCOCODE] = useState('Presidente de COCODE');
  let [TelefonoContacto, setTelefonoContacto] = useState('Teléfono de contacto');
  let [OtroLider, setOtroLider] = useState('Otro líder');
  let [TelefonoOtroLider, setTelefonoOtroLider] = useState('Teléfono de contacto otro líder');
  let [Transporte, setTransporte] = useState('Tipo de transporte');
  let [NumeroFamilias, setNumeroFamilias] = useState('Número de familias');
  let [NumeroViviendas, setNumeroViviendas] = useState('Número de viviendas');
  let [NumeroPersonas, setNumeroPersonas] = useState('Número de personas');
  let [CertezaJuridica, setCertezaJuridica] = useState('Certeza jurídica de la tierra');
  let [ConflictosTierra, setConflictosTierra] = useState('Conflictos de acceso o tenencia');
  let [DimensionesLotes, setDimensionesLotes] = useState('Dimensiones de los lotes');
  let [DimensionesTrabajaderos, setDimensionesTrabajaderos] = useState('Dimensiones de los trabajaderos');
  let [TierraComunitaria, setTierraComunitaria] = useState('Cantidad de tierra comunitaria');
  let [Idiomas, setIdiomas] = useState('Idiomas que se hablan en la comunidad');
  let [FuentesEmpleo, setFuentesEmpleo] = useState('Fuentes de empleo');
  let [Recreacion, setRecreacion] = useState('Recreación en la comunidad');
  let [PotencialTuristico, setPotencialTuristico] = useState('Potencial turístico');
  let [EdificiosPublicos, setEdificiosPublicos] = useState('Edificios públicos');
  let [Inseguridad, setInseguridad] = useState<boolean>(false); 
  let [TipoInseguridad, setTipoInseguridad] = useState('Tipo de inseguridad');
  let [GruposDelincuenciales, setGruposDelincuenciales] = useState('Grupos delincuenciales');
  let [PersonasOtrosMunicipios, setPersonasOtrosMunicipios] = useState('Personas que trabajan en otros municipios');
  let [TipoTrabajo, setTipoTrabajo] = useState('Tipo de trabajo');
  let [PersonasEEUU, setPersonasEEUU] = useState<boolean>(false); 
  let [CantidadPersonasEEUU, setCantidadPersonasEEUU] = useState('Cantidad de personas en EE. UU.');
  let [MenoresEEUU, setMenoresEEUU] = useState<boolean>(false); 
  let [EdadTrabajoHombres, setEdadTrabajoHombres] = useState('Edad de trabajo hombres');
  let [EdadTrabajoMujeres, setEdadTrabajoMujeres] = useState('Edad de trabajo mujeres');
  let [Ocupaciones, setOcupaciones] = useState('Ocupaciones en las que trabajan');
  let [Jubilados, setJubilados] = useState<boolean>(false); 
  let [CantidadJubilados, setCantidadJubilados] = useState('Cantidad de jubilados');
  let [InstitucionJubilados, setInstitucionJubilados] = useState('Institución de jubilados');
  let [OcupacionesMujeres, setOcupacionesMujeres] = useState('Ocupaciones tradicionales de mujeres');
  let [OcupacionesHombres, setOcupacionesHombres] = useState('Ocupaciones tradicionales de hombres');
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





  return (
    <IonPage className="pg">
      <h1 className='TituloPagina'>Crear comunidad</h1>
      <IonContent>
        <IonTabs className="tabs">
          <IonTab tab="DatosGenerales">
            <div className="PanelSecundario">
              <IonRow className="FilaTextBox">
                <h2 className="TituloN2">Información General</h2>
                <h3 style={{color: "GrayText", fontSize: "14px", paddingLeft: "10px"}}>(Los campos subrayados son obligatorios)</h3>
              </IonRow>

              {/* Preguntas independientes */}
              <IonRow className="FilaTextBox">
                <h3 style={{textDecoration: "underline"}} className="labelForm">1. Nombre de la comunidad:</h3>
                <input onChange={e => setComunidad(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <IonList>
                <IonItem>
                  <IonSelect className="ListBox" placeholder="Seleccionar" cancelText="Cancelar">
                    <div slot="label" style={{textDecoration: "underline"}}>2. Municipio:</div>
                      <IonSelectOption value="1">Cobán</IonSelectOption>
                      <IonSelectOption value="2">Chisec</IonSelectOption>
                      <IonSelectOption value="3">Carchá</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>

                <h3 className="labelForm">3. Aldea:</h3>
                <input onChange={e => setAldea(e.target.value)} type="text" className='TextBox'/>
              </IonRow>

              <div>
                <h3 className="labelForm" style={{textDecoration: "underline"}}>4. Ubicación bicación</h3>
                <div className="Mapa">
                  <IonText className="TextoMapa">Mapa</IonText>
                </div>
              </div>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm" style={{textDecoration: "underline"}}>5. Nombre del presidente de COCODE:</h3>
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
                <IonCheckbox className="CheckBox" checked={Inseguridad} onIonChange={(e) => setInseguridad(e.target.checked)}/>
                {Inseguridad && (
                  <>
                    <h3 className="labelForm">Tipo de inseguridad:</h3>
                    <input onChange={e => setTipoInseguridad(e.target.value)} type="text" className='TextBox' />
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
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setTipoTrabajo(e.target.value)} type="text" className='TextBox' />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">25. ¿Hay personas que están en EE. UU.?</h3>
                <IonCheckbox className="CheckBox" checked={PersonasEEUU} onIonChange={(e) => setPersonasEEUU(e.target.checked)}/>
                {PersonasEEUU && (
                  <>
                    <h3 className="labelForm">¿Cuántas?</h3>
                    <input onChange={e => setCantidadPersonasEEUU(e.target.value)} type="text" className='TextBoxPeq' />
                    <h3 className="labelForm">¿Hay menores de edad en EE. UU.?</h3>
                    <IonCheckbox className="CheckBox" checked={MenoresEEUU} onIonChange={(e) => setMenoresEEUU(e.target.checked)}/>
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
                <IonCheckbox className="CheckBox" checked={Jubilados} onIonChange={(e) => setJubilados(e.target.checked)}/>
                  </IonRow>
                  <IonRow className="FilaTextBox">  
                {Jubilados && (
                  <>
                    <h3 className="labelForm">¿Cuántos?</h3>
                    <input onChange={e => setCantidadJubilados(e.target.value)} type="text" className='TextBoxPeq' />
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
                <h3 className="labelForm">29. Ocupaciones tradicionales más importantes de los hombres:</h3>
                <input onChange={e => setOcupacionesHombres(e.target.value)} type="text" className='TextBox' />
              </IonRow>
            </div>
          </IonTab>
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
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">52. ¿Hubo o hay capacitaciones sobre saneamiento ambiental?</h3>
                <IonCheckbox
                  checked={capacitacionesSaneamiento}
                  onIonChange={(e) => setCapacitacionesSaneamiento(e.target.checked)}
                />
              </IonRow>
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
            </div>
          </IonTab>

          {/*Pestañas*/} 
          <IonTabBar className="TabBarConf" slot="top">
            <IonTabButton tab="DatosGenerales"> <IonIcon size="large" icon={earthOutline} /> </IonTabButton>
            <IonTabButton tab="Servicios"> <IonIcon size="large" icon={cogOutline} /> </IonTabButton>
            <IonTabButton tab="Educacion"> <IonIcon size="large" icon={bookOutline} /> </IonTabButton>
            <IonTabButton tab="Agua&Sane"> <IonIcon size="large" icon={waterOutline} /> </IonTabButton>
            <IonTabButton tab="Salud&Nut"> <IonIcon size="large" icon={fitnessOutline} /> </IonTabButton>
            <IonTabButton tab="MapadeActores"> <IonIcon size="large" icon={peopleOutline} /> </IonTabButton>
            <IonTabButton tab="Agricultura"> <IonIcon size="large" icon={leafOutline} /> </IonTabButton>
            <IonTabButton tab="ActividadesPec"> <IonIcon size="large" icon={cogOutline} /> </IonTabButton>
            <IonTabButton tab="Ecologia"> <IonIcon size="large" icon={cogOutline} /> </IonTabButton>
          </IonTabBar>

        </IonTabs>    
      </IonContent>

      <IonRow>
        <IonButton className="Boton" color="success">Guardar</IonButton>   
        <IonButton className="Boton" color="danger">Cancelar</IonButton>   
      </IonRow>
    </IonPage>
  );
}
export default AgregarComunidades;
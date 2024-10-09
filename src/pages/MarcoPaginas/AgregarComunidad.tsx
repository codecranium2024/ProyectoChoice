import React, { useState } from "react";
import { IonPage, IonContent, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonRow, IonCheckbox } from "@ionic/react";
import { earthOutline, cogOutline, bookOutline, waterOutline, fitnessOutline, peopleOutline, leafOutline } from 'ionicons/icons';

function AgregarComunidades() {
  // Variables de estado para todos los campos
  let [Comunidad, setComunidad] = useState('');
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

  // Función para enviar los datos al backend
const handleGuardarComunidad = async () => {
  const data = {
    nombre_comunidad: Comunidad,
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

  // Verificar los datos antes de enviar
  console.log('Datos a enviar:', data);

  try {
    const response = await fetch('http://localhost:3000/comunidad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Comunidad registrada con éxito');
      // Limpiar todos los campos de texto y checkbox
      setComunidad('');
      setPresidenteCOCODE('');
      setTelefonoContacto('');
      setOtroLider('');
      setTelefonoOtroLider('');
      setTransporte('');
      setNumeroFamilias('');
      setNumeroViviendas('');
      setNumeroPersonas('');
      setCertezaJuridica('');  // Si el campo es texto, limpiar a cadena vacía
      setConflictosTierra('');
      setDimensionesLotes('');
      setDimensionesTrabajaderos('');
      setTierraComunitaria('');
      setIdiomas('');
      setFuentesEmpleo('');
      setRecreacion('');
      setPotencialTuristico('');
      setEdificiosPublicos('');
      setInseguridad(false);  // Reiniciar checkbox a desmarcado
      setTipoInseguridad('');
      setGruposDelincuenciales('');
      setPersonasOtrosMunicipios('');
      setTipoTrabajo('');
      setPersonasEEUU(false);  // Reiniciar checkbox a desmarcado
      setCantidadPersonasEEUU('');
      setMenoresEEUU(false);  // Reiniciar checkbox a desmarcado
      setEdadTrabajoHombres('');
      setEdadTrabajoMujeres('');
      setOcupaciones('');
      setJubilados(false);  // Reiniciar checkbox a desmarcado
      setCantidadJubilados('');
      setInstitucionJubilados('');
      setOcupacionesMujeres('');
      setOcupacionesHombres('');
    } else {
      alert('Error al registrar la comunidad');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al registrar la comunidad');
  }
};


  return (
    <IonPage className="pg">
      <h1 className='TituloPagina'>Crear comunidad</h1>
      <IonContent>
        <IonTabs className="tabs">
          <IonTab tab="DatosGenerales">
            <div className="PanelSecundario">
              <h2 className="TituloN2">Información General</h2>

              {/* Preguntas independientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">1. Nombre de la comunidad:</h3>
                <input onChange={e => setComunidad(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">2. Nombre del presidente de COCODE:</h3>
                <input onChange={e => setPresidenteCOCODE(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">3. Teléfono de contacto:</h3>
                <input onChange={e => setTelefonoContacto(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">4. Nombre de otro líder:</h3>
                <input onChange={e => setOtroLider(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">5. Teléfono de contacto:</h3>
                <input onChange={e => setTelefonoOtroLider(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">6. Tipo de transporte desde y hacia la comunidad:</h3>
                <input onChange={e => setTransporte(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">7. Número de familias:</h3>
                <input onChange={e => setNumeroFamilias(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">8. Número de viviendas:</h3>
                <input onChange={e => setNumeroViviendas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">9. Número de personas:</h3>
                <input onChange={e => setNumeroPersonas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">10. Certeza jurídica de la tierra comunitaria:</h3>
                <input onChange={e => setCertezaJuridica(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">11. Conflictos relacionados con acceso o tenencia de la tierra (invasiones, desalojos):</h3>
                <input onChange={e => setConflictosTierra(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">12. Dimensiones de los lotes:</h3>
                <input onChange={e => setDimensionesLotes(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">13. Dimensiones de los trabajaderos:</h3>
                <input onChange={e => setDimensionesTrabajaderos(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">14. ¿Cuánta tierra comunitaria hay?:</h3>
                <input onChange={e => setTierraComunitaria(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">15. Idiomas que se hablan en la comunidad:</h3>
                <input onChange={e => setIdiomas(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">16. Fuentes de empleo en la comunidad:</h3>
                <input onChange={e => setFuentesEmpleo(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">17. Recreación en la comunidad:</h3>
                <input onChange={e => setRecreacion(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">18. ¿Qué tipo de potencial turístico tiene la comunidad?:</h3>
                <input onChange={e => setPotencialTuristico(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">19. Tipo de edificios públicos en la comunidad:</h3>
                <input onChange={e => setEdificiosPublicos(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              {/* Preguntas dependientes */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">20. ¿Hay inseguridad?</h3>
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
                <h3 className="labelForm">21. ¿Cuántas personas trabajan en otros municipios o departamentos?:</h3>
                <input onChange={e => setPersonasOtrosMunicipios(e.target.value)} type="text" className='TextBoxPeq' />
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setTipoTrabajo(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">22. ¿Hay personas en EE. UU.?</h3>
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
                <h3 className="labelForm">23. ¿A qué edad empiezan a trabajar en la comunidad?</h3>
                <h3 className="labelForm">Hombres:</h3>
                <input onChange={e => setEdadTrabajoHombres(e.target.value)} type="text" className='TextBox' />
                <h3 className="labelForm">Mujeres:</h3>
                <input onChange={e => setEdadTrabajoMujeres(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setOcupaciones(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              {/* Jubilados */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">24. ¿Existen jubilados en la comunidad?</h3>
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
                <h3 className="labelForm">25. Ocupaciones tradicionales más importantes de las mujeres:</h3>
                <input onChange={e => setOcupacionesMujeres(e.target.value)} type="text" className='TextBox' />
              </IonRow>

              <IonRow className="FilaTextBox">
                <h3 className="labelForm">Ocupaciones tradicionales más importantes de los hombres:</h3>
                <input onChange={e => setOcupacionesHombres(e.target.value)} type="text" className='TextBox' />
              </IonRow>
            </div>
          </IonTab>

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
        <IonButton className="Boton" color="success" onClick={handleGuardarComunidad}>Guardar</IonButton>
        <IonButton className="Boton" color="danger">Cancelar</IonButton>
      </IonRow>
    </IonPage>
  );
}

export default AgregarComunidades;

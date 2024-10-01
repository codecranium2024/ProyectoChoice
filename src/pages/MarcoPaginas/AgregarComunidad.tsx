import React from "react";
import {IonSelectOption, IonSelect,IonText,IonPage,IonHeader,IonTab,IonContent,IonTabBar,IonTabButton,IonTabs,IonToolbar,IonTitle,IonIcon,IonButton, IonRow,IonCheckbox} from "@ionic/react";
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

              <IonSelect placeholder="Seleccionar un municipio">
                <div slot="label">
                  <h3 className="labelForm">2. Municipio</h3>
                </div>
                <IonSelectOption value="0">Cobán</IonSelectOption>
                <IonSelectOption value="1">Chisec</IonSelectOption>
                <IonSelectOption value="2">Carchá</IonSelectOption>
              </IonSelect>

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
                <IonCheckbox className="CheckBox" checked={Inseguridad} onIonChange={(e) => setInseguridad(e.detail.checked)}/>
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
                <h3 className="labelForm">21. ¿Cuántas personas trabajan en otros municipios o departamentos?:</h3>
                <input onChange={e => setPersonasOtrosMunicipios(e.target.value)} type="text" className='TextBoxPeq' />
                <h3 className="labelForm">¿En qué?</h3>
                <input onChange={e => setTipoTrabajo(e.target.value)} type="text" className='TextBox' />
              </IonRow>
              
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">22. ¿Hay personas que están en EE. UU.?</h3>
                <IonCheckbox className="CheckBox" checked={PersonasEEUU} onIonChange={(e) => setPersonasEEUU(e.detail.checked)}/>
                {PersonasEEUU && (
                  <>
                    <h3 className="labelForm">¿Cuántas?</h3>
                    <input onChange={e => setCantidadPersonasEEUU(e.target.value)} type="text" className='TextBoxPeq' />
                    <h3 className="labelForm">¿Hay menores de edad en EE. UU.?</h3>
                    <IonCheckbox className="CheckBox" checked={MenoresEEUU} onIonChange={(e) => setMenoresEEUU(e.detail.checked)}/>
                  </>
                )}
              </IonRow>
              
              {/* Preguntas con múltiples campos */}
              <IonRow className="FilaTextBox">
                <h3 className="labelForm">23. ¿A qué edad empiezan a trabajar en la comunidad?</h3>
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
                <h3 className="labelForm">24. ¿Existen jubilados en la comunidad?</h3>
                <IonCheckbox className="CheckBox" checked={Jubilados} onIonChange={(e) => setJubilados(e.detail.checked)}/>
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
        <IonButton className="Boton" color="success">Guardar</IonButton>   
        <IonButton className="Boton" color="danger">Cancelar</IonButton>   
      </IonRow>
    </IonPage>
  );
}
export default AgregarComunidades;
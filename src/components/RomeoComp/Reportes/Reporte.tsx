import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { IonButton } from '@ionic/react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';
import 'chart.js/auto';
import './Reporte.css';

interface DataState {
  labels: string[];
  habitantes: number[];
  proyectos: number[];
  servicios: Record<string, number>;
}

const Reporte: React.FC = () => {
  const [data, setData] = useState<DataState>({
    labels: [],
    habitantes: [],
    proyectos: [],
    servicios: {},
  });

  // Datos simulados
  const comunidadesSimuladas = [
    { comunidad: 'Comunidad A', habitantes: 1200, proyectos: 5, servicios: ['Educación', 'Salud', 'Transporte'] },
    { comunidad: 'Comunidad B', habitantes: 800, proyectos: 2, servicios: ['Educación', 'Salud'] },
    { comunidad: 'Comunidad C', habitantes: 1500, proyectos: 8, servicios: ['Transporte'] },
    { comunidad: 'Comunidad D', habitantes: 900, proyectos: 3, servicios: ['Educación', 'Transporte'] },
  ];

  useEffect(() => {
    // Simula la obtención de datos
    const comunidades = comunidadesSimuladas;

    const labels = comunidades.map((comunidad) => comunidad.comunidad);
    const habitantes = comunidades.map((comunidad) => comunidad.habitantes);
    const proyectos = comunidades.map((comunidad) => comunidad.proyectos);
    const servicios = comunidades.reduce((acc: Record<string, number>, comunidad) => {
      comunidad.servicios.forEach((servicio) => {
        acc[servicio] = (acc[servicio] || 0) + 1; // Cuenta la cantidad de cada servicio
      });
      return acc;
    }, {});

    setData({
      labels,
      habitantes,
      proyectos,
      servicios,
    });
  }, []);

  const generarPDF = () => {
    const pdf = new jsPDF();
    // Genera el PDF aquí
    pdf.save('reporte.pdf');
  };

  const generarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { Comunidad: 'Comunidad', Habitantes: 'Habitantes', Proyectos: 'Proyectos' },
      ...data.labels.map((label, index) => ({
        Comunidad: label,
        Habitantes: data.habitantes[index],
        Proyectos: data.proyectos[index],
      })),
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    XLSX.writeFile(workbook, 'reporte.xlsx');
  };

  // Configuración de las gráficas
  const opcionesBarras = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const opcionesPie = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="grafica-container">
      <h2>Gráfica por Habitantes</h2>
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: 'Habitantes',
              data: data.habitantes,
              backgroundColor: 'rgba(75,192,192,0.4)',
            },
          ],
        }}
        options={opcionesBarras as any}
      />

      <h2>Gráfica por Proyectos</h2>
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: 'Proyectos',
              data: data.proyectos,
              backgroundColor: 'rgba(153,102,255,0.6)',
            },
          ],
        }}
        options={opcionesBarras as any}
      />

      <h2>Gráfica Circular por Servicios</h2>
      <Pie
        data={{
          labels: Object.keys(data.servicios),
          datasets: [
            {
              label: 'Servicios',
              data: Object.values(data.servicios),
              backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(75,192,192,0.6)'],
            },
          ],
        }}
        options={opcionesPie as any}
      />

      <IonButton onClick={generarPDF}>Descargar PDF</IonButton>
      <IonButton onClick={generarExcel}>Descargar Excel</IonButton>
    </div>
  );
};

export default Reporte;

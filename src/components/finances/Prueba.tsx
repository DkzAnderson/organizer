import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

export const Prueba = () => {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        /*
        const values = [
            { name: "Básicos", value: 50 },
            { name: "Personal", value: 30 },
            { name: "Inversiones", value: 20 },
        ];
        */
       const values = [
            { name: 'Alimentos' , value: 350},
            { name: 'Alquiler' , value: 280},
            { name: 'Celular' , value: 60},
            { name: 'Transporte' , value: 40},
       ]

        const ctx = document.getElementById("domito") as HTMLCanvasElement | null;
        if (!ctx) return;

        // Destruir el gráfico anterior si existe
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const config: ChartConfiguration = {
            type: "pie", // "pie" si prefieres un gráfico de pastel
            data: {
                labels: values.map(item => item.name), // Usamos los nombres
                datasets: [
                    {
                        label: "Gasto mensual",
                        data: values.map(item => item.value), // Usamos los valores numéricos
                        backgroundColor: ["#C8851E","#19AE58", "#231E9F",  "#C2BABA"], // Colores para cada sección
                        borderColor: "transparent", // Borde blanco
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true, // Se adapta al tamaño del contenedor
                maintainAspectRatio: false
            }
        };

        /*
        const config: ChartConfiguration = {
            type: "doughnut", // "pie" si prefieres un gráfico de pastel
            data: {
                labels: values.map(item => item.name), // Usamos los nombres
                datasets: [
                    {
                        label: "Distribución de presupuesto",
                        data: values.map(item => item.value), // Usamos los valores numéricos
                        backgroundColor: ["#0901E2", "#15ACB2", "#19AE58"], // Colores para cada sección
                        borderColor: "transparent", // Borde blanco
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true, // Se adapta al tamaño del contenedor
                maintainAspectRatio: false
            }
        };
*/
        chartRef.current = new Chart(ctx, config);
    }, []);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="grid justify-center gap-2 w-[70%]">
                <p className="text-center text-white">
                    Distribución de gastos personales
                </p>

                <canvas id="domito" className="max-w-72 max-h-72 p-2 rounded-lg border border-white"></canvas>
            </div>
            
        </div>
    );
};
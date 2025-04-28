import { TableValues } from "../../types/Finances";
import { useEffect, useRef, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";


interface Props {
    name: string;
    data: TableValues[]
    config: ChartConfiguration
}

export const Table: React.FC< Props > = ({name,data, config}) => {
    
    const [showGraphics,setGraphics] = useState(false);
    const chartRef = useRef<Chart | null>(null);
    const [total,setTotal] = useState(0)

    const styles = {
        main: `w-full relative flex flex-col gap-5 items-center justify-center ${showGraphics ? 'max-h-96': 'max-h-12 text-start'} transition-all ease-linear duration-300`,
        title: `absolute top-2 flex text-xl cursor-pointer text-[var(--txt)] font-bold ${showGraphics ? 'underline': '-translate-x-20 '} transition-all ease-linear duration-300`,
        content: `mt-16 grid justify-center gap-2 rounded-lg p-4 border-[var(--rd)] ${showGraphics ? 'max-h-96 w-full border-2' : 'w-0 max-h-0 max-w-0'} transition-all ease-linear duration-300 overflow-hidden`,
        graphicTitle: 'text-center text-white',
        canva: `${showGraphics ? 'max-w-62 max-h-62' : 'max-w-0 max-h-0'} p-2 rounded-lg border border-white `,
        bottomBox: 'flex gap-2 font-bold text-[var(--txt)]',
        total: 'underline'
    }

    useEffect(() => {
        if(data){
            let i = 0;
            data.forEach(element => {
                i+= element.value;
            });
            setTotal(i);
        }

        const ctx = document.getElementById("Tabla") as HTMLCanvasElement | null;
        if (!ctx) return;

        // Destruir el gráfico anterior si existe
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, config);
    }, []);
  
    return (
        <div className={styles.main}>
            <button 
                className={styles.title}
                onClick={()=>setGraphics(!showGraphics)}
            >
                {name}
            </button>

            <div className={styles.content}>

                <canvas id="Tabla" className={styles.canva}></canvas>
                <span className={styles.bottomBox}>
                    Total: 
                    <b className={styles.total}>{total}/s</b>
                </span>
            </div>
            
        </div>
  )
}

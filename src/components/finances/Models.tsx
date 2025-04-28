import { ChartConfiguration } from "chart.js/auto";
import { TableValues } from "../../types/Finances";
import { NavBar } from "../navBar/NavBar";
import { Table } from "./Table";
/*
const PresupuestoMensual: BudgetProps = {

    expectedIncome: 1200,

    expectedPayment: {
        rent: 280,
        food  : 320, 
        phone :  60,
        transport :  40,
        savings : 200,
        emergency: 100,
    },

    available: 500,
    usable    : 200 // restando los ahorros.
}

*/
export const Models = () => {

    const AccountModel: TableValues[] = [
        {name: 'Alquiler', value: 280},
        {name: 'Alimentación', value: 260},
        {name: 'Celular', value: 60},
    ]

    const AccountModelConfig : ChartConfiguration = {
        type: "pie", // "pie" si prefieres un gráfico de pastel
        data: {
            labels: AccountModel.map(value => value.name), // Usamos los nombres
            datasets: [
                {
                    label: "Gasto mensual",
                    data: AccountModel.map(value => value.value), // Usamos los valores numéricos
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
    }
/*
    const Options = [
        {}
    ]
*/
    const styles = {
        main: 'w-full min-h-screen bg-[var(--st)] dark:bg-[var(--st)]',
        content: 'flex flex-col w-full pt-24 px-4'
    }

  return (
    <section className={styles.main}>
        <NavBar/>
        <div className={styles.content}>
                <div className="w-full flex flex-col">
                    <li className="flex flex-col gap-4 w-full p-2 bg-[var(--nd)] rounded-lg list-none transition-all ease-linear duration-300">
                        <div className='w-full flex'>
                            <Table
                                name={'Gastos personales'}
                                data={AccountModel}
                                config={AccountModelConfig}
                            />
                        </div>
                    </li>
                </div>
        </div>
    </section>
  )
}

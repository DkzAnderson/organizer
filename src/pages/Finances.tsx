import { Link } from "react-router";
import { NavBar } from "../components/navBar/NavBar";


/*

Costos comunes
- Empanadas  4s
- Arepas     7s
- Gaseosa    3s
- Queso     28s 1kg
- 



    Modulo para el manejo de finanzas personales

    - Visualizar datos de :
        dinero actual
            - despues de pagos y ahorros
        pagos mensuales
            - celular / internet
            - comida
            - alquiler
            - otros
            - personal
        ahorros
            - cuentas de ahorro con nombre para visualizar 
            de que es el ahorro
        balance total 
            - sumar todos los pagos mensuales
            - sumar todas las cuentas de ahorro
            - restar entre si
            - mostrar en una tabla

*/
interface OptionsProps {
    name: string;
    url: string; 
    icon: string
}

const options: OptionsProps[] = [
    {
        name: 'Balance de cuentas',
        url: '',
        icon: ''
    },
    {
        name: 'Cuentas de ahorro',
        url: '',
        icon: ''
    },
    {
        name: 'Modelo de cuenta',
        url: '/finances/models',
        icon: ''
    }
]



export const Finances = () => {
  return (
      <section className="relative flex flex-col w-full min-h-screen bg-[var(--st)] dark:bg-[var(--st)] pt-20">
        <NavBar/>
          <ul className="flex flex-col dark:text-[var(--txt)] text-[var(--txt)] w-full p-2 text-lg font-bold gap-2">
              {options.map((account, i) => (
                  <li key={i}>
                      <Link
                          className="flex items-center p-2 bg-[var(--nd)] dark:bg-[var(--nd)] rounded-lg h-12"
                          to={account.url}
                      >
                          <h1>
                              {account.name}
                          </h1>
                          <span>
                              {account.icon}
                          </span>
                      </Link>
                  </li>
              ))}
          </ul>

      </section>

  )
}

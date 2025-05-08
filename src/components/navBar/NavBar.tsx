import { Link } from "react-router";
import { ButtonIcon } from "./ButtonIcon"
import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";

interface menuOptionsProps {
  name: string;
  url: string;
  icon: string;
}



export const NavBar = () => {

  const [menuIsOpen, setMenu] = useState(false);
  const { toggleTheme } = useTheme();

  const menuOptions: menuOptionsProps[] = [
    {
      name: 'Notas',
      url: '/notes',
      icon: ''
    },
    {
      name: 'Finanzas',
      url : '/finances',
      icon: ''
    }
  ]

  const changeTheme = ()=> {
    toggleTheme();
    setMenu(false);
  }

  return (
    <section className="fixed z-50 flex flex-col top-0 left-0 w-full min-h-16 bg-gradient-to-br from-[var(--nd)] to-[var(--th)]">
      <button 
        className="size-16 p-2"
        onClick={()=> setMenu(!menuIsOpen)}
      >
        <ButtonIcon menuState={menuIsOpen}/>
      </button>

      <ul className={`w-full ${menuIsOpen ? 'max-h-62' : 'max-h-0'} transition-all ease-in-out duration-500 overflow-hidden  flex flex-col gap-2 py-2`}>
        {menuOptions.map((option,i)=>(
          <li key={i}>
            <Link
              to={option.url}
              className="flex relative group h-16 p-2 items-center text-lg font-bold bg-[var(--st)]/50 hover:bg-transparent transition-all ease-linear duration-500"
            >
              <div className="absolute z-0 rounded-lg size-full bg-gradient-to-br from-[var(--rd)]/75 skew-x-20 translate-x-[-110%] group-hover:translate-x-[0%] transition-all ease-linear duration-500">

              </div>
              <h1 className="pl-2 z-10 dark:text-[var(--txt)] text-[var(--txt)]">
                {option.name}
              </h1>
            </Link>
          </li>
        ))}

        <button 
          onClick={changeTheme}
          className="flex relative group h-16 items-center text-lg font-bold bg-[var(--st)]/50 hover:bg-transparent transition-all ease-linear duration-500 cursor-pointer"
        >
          <div className="absolute z-0 rounded-lg size-full bg-gradient-to-br from-[var(--rd)]/75 skew-x-20 translate-x-[-110%] group-hover:translate-x-[0%] transition-all ease-linear duration-500">

          </div>
          <h1 className="p-2 z-10 cursor-pointer dark:text-[var(--txt)] text-[var(--txt)] ">
            Cambiar tema
          </h1>
        </button>
      </ul>
    </section>
  )
}

import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";

interface Props{
    //saveNote : Function;
    newNote: Function
    backToHome: Function;
}

export const NavButton: React.FC<Props> = ({newNote, backToHome}) => {

    const [showOptions, setShow] = useState(false);

  return (
    <div
        className='fixed  z-50 size-20 rounded-full bg-[var(--rd)] dark:bg-[var(--rd)] bottom-20 right-10 duration-300'

    >
        <button 
            className='relative flex size-full items-center justify-center '
            onClick={()=>setShow(!showOptions)}
        >
            <TiThMenu className='text-4xl text-[var(--txt)] dark:text-[var(--txt)]'/>
            <ul className={`absolute overflow-hidden ${showOptions ? 'h-20 -top-20' : 'h-0 top-0'} flex flex-col gap-4 w-32 right-0 transition-all ease-in-out duration-500`}>
                <button className='text-[var(--txt)] dark:text-[var(--txt)] bg-[var(--th)] dark:bg-[var(--th)] rounded-full'
                    onClick={()=>backToHome(false)}
                >
                    Inicio
                </button>
                <button className='text-[var(--txt)] dark:text-[var(--txt)] bg-[var(--th)] dark:bg-[var(--th)]  rounded-full'
                    onClick={()=>newNote()}
                >
                    Nueva nota
                </button>
            </ul>
        </button>
    </div>
  )
}

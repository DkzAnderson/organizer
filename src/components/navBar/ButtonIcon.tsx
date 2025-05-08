import React from 'react'

interface Props {
    menuState: boolean;
}

export const ButtonIcon: React.FC< Props > = ({menuState}) => {


  return (
    <div className='size-full flex relative cursor-pointer'>
        {/* top */}
        <span className={`absolute transition-all ease-in-out duration-500 ${menuState ? 'left-0.5 top-6 rotate-45' : 'left-0.5 top-3'}  h-2 w-[90%] bg-[var(--th)] dark:bg-[var(--th)] rounded-full`}></span>
        {/* middle */}
        <span className={`absolute transition-all ease-in-out duration-500 ${menuState ? 'size-0' : ' w-[90%] h-2'} left-0.5 top-6 bg-[var(--th)] dark:bg-[var(--th)] rounded-full`}></span>
        {/* bottom */}
        <span className={`absolute transition-all ease-in-out duration-500 ${menuState ? 'left-0.5 bottom-4 -rotate-45' : 'left-0.5 bottom-1'}  h-2 w-[90%] bg-[var(--th)] dark:bg-[var(--th)] rounded-full`}></span>
    </div>
  )
}

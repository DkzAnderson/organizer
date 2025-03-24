import { createContext, ReactNode, useContext, useState } from "react";




export interface User {
    name: string;
    email: string;
    /*
        Revisar que más datos
        serán necesarios.
    */
}

interface UserContextType{
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> =({children})=>{
    const [user,setUser] = useState<User | null>(null);

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('Error de contexto');
    }

    return context;
}
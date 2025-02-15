import React, {createContext, useContext, useState, ReactNode, Children} from 'react'

//User model to global
interface User {
  id: string
  name?: string
  age?: number
}

interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error('Deve ser utilizado dentro de um UserProvider')
    }
    return context
}

export const UserProvider = ({ children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}


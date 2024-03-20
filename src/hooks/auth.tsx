import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import Swal from 'sweetalert2';
const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
    const [data, setData] = useState<{ user: string | null, token: string | null }>({ user: null, token: null });

    async function signIn({ email, password }: any) {
        try {
            const response = await api.post('/login', { email, password })
            const { user, token } = response.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token })
        } catch (error: any) {
            console.log(error)
            if (error.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else if (error.response) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Não Foi Possivel fazer Login",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error)
            }

        }
    }

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setData({
            token: null,
            user: null
        })
    }

    function updateProfile({ user }: any): any {
        try {
            console.log(user)
        } catch (error: any) {
            if (error.response) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Não Foi Possivel Atualizar o perfil",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error)
            }

        }
    }

    async function validateToken(oldToken: string | null) {
        try {
            if (!oldToken) {
                throw new Error('Token não encontrado');
            }
            // Faça a chamada para validar o token no servidor
            const response = await api.post('/validateToken', { token: oldToken });
            // Se o token ainda for válido, atualize os dados do usuário
            const { user, token } = response.data;
            setData({ user, token });
        } catch (error: any) {
            // console.log(error)
            signOut()
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({
                token: token,
                user: JSON.parse(user)
            })
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        validateToken(token);
    }, []);


    return (
        <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    return context
}
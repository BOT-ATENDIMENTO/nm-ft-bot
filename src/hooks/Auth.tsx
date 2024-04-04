import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AuthService from "../services/api";
import { ToastContainer, toast } from "react-toastify";

interface AuthContextData {
  user?: UserProps;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut?: () => void;
  signUp?: (credentials: SignUpProps) => Promise<void>;
  updateProfile?: (data: any) => void;
  token?: TokenProps;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type TokenProps = {
  token: string;
};

export interface SignInProps {
  email: string;
  password: string;
}

type SignUpProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const [token, setToken] = useState<TokenProps>();

  // Login
  async function signIn({ email, password }: SignInProps) {
    console.log("entrou", email, password);
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast.success("Logado com sucesso!");
      setUser(user);
      setToken(token);
    } catch (error: any) {
      if (error) {
        console.log(error);
        toast.error(error.response.data);
      } else if (error.message) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("Não Foi Possivel fazer Login");
      }
    }
  }

  // function signOut() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setData({
  //     token: null,
  //     user: null,
  //   });
  // }

  // function updateProfile({ user }: any): any {
  //   try {
  //     console.log(user);
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       toast.error(error.response.data);
  //     } else {
  //       toast.error("Não Foi Possivel Atualizar o perfil");
  //     }
  //   }
  // }

  async function validateToken(oldToken: string | null) {
    try {
      if (!oldToken) {
        throw new Error("Token não encontrado");
      }
      // Faça a chamada para validar o token no servidor
      const response = await AuthService.validateToken({
        oldToken,
      });
      // Se o token ainda for válido, atualize os dados do usuário
      const { user, token } = response.data;
      setToken(token);
      setUser(user);
    } catch (error: any) {
      console.log(error);
      // signOut();
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUser(JSON.parse(user));
      setToken({
        token: token,
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    validateToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

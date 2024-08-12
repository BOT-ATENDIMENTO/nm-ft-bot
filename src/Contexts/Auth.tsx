import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/api";
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

export interface SignUpProps {
  email: string;
  password: string;
  name: string;
  phone: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [token, setToken] = useState<TokenProps>({ token: "" });

  // Login
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await AuthService.login(email, password);
      console.log("response", response);
      const { user, token } = await response;
      console.log("user", user);
      console.log("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast.success("Logado com sucesso!");
      setUser(user);
      setToken(token);
      navigate("/home");
    } catch (error: any) {
      if (error) {
        console.log("err", error);
        toast.error("Não Foi Possivel fazer Login");
      }
    }
  }
  //  cadastrar
  async function signUp({ email, password, name, phone }: SignUpProps) {
    const data = {
      email,
      password,
      name,
      phone,
    };
    try {
      const response = await AuthService.register(data);
      toast.success("Cadastrado com sucesso!");
      navigate("/login");
    } catch (error: any) {
      console.log("err", error);
      if (error) {
        console.log("err", error);
        toast.error("Não Foi Possivel fazer Cadastro");
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

  async function validateToken() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const oldToken = token;
    var oldUser = user ? JSON.parse(user) : null;

    if (Array.isArray(oldUser)) {
      oldUser.map((r) => {
        return { id: r.id, email: r.email };
      });
    } else {
      console.log("oldUser não é um array");
    }

    try {
      if (!oldToken) {
        throw new Error("Token não encontrado");
      }
      // Faça a chamada para validar o token no servidor
      const response = await AuthService.validateToken(oldToken, oldUser);
      // Se o token ainda for válido, atualize os dados do usuário
      const { user, token } = response;
      setToken(token);
      setUser(user);
    } catch (error: any) {
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
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signUp,
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

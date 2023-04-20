import { Container, LoginForm, RegisterSection } from "./style";

import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../schemas";

// assets
import logo from "../../assets/logo.svg";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";

// interfaces
import { ILogin } from "../../interfaces/Login";

import { Id, toast } from "react-toastify";

import { AxiosRequest } from "../../classes/axios";
import { Colors } from "../../utils";

function Login() {
    const TOAST_CONTAINER_TIME_TO_CLOSE = 3000;

    const navigate: NavigateFunction = useNavigate();

    function navigateToRegisterPage() {
        navigate("/register");
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: yupResolver(userLoginSchema),
    });

    async function onSubmitFunction(data: ILogin): Promise<void> {
        const toastPopUp: Id = toast.loading("Entrando...");

        const { email, password } = data;
        const res: any = await AxiosRequest.loginRequest(email, password);

        if (res.status != 200) {
            toast.update(toastPopUp, {
                render: "Login falhou",
                type: "error",
                isLoading: false,
                autoClose: TOAST_CONTAINER_TIME_TO_CLOSE,
            });
        } else {
            toast.update(toastPopUp, {
                render: "Login completo",
                type: "success",
                isLoading: false,
                autoClose: TOAST_CONTAINER_TIME_TO_CLOSE,
            });
        }
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <LoginForm onSubmit={handleSubmit(onSubmitFunction)}>
                <h2>Login</h2>
                <Input
                    name="email"
                    label="Email"
                    placeholder="Digite seu email aqui"
                    register={register}
                    errors={errors}
                />
                <Input
                    name="password"
                    label="Senha"
                    placeholder="Digite sua senha aqui"
                    type="password"
                    register={register}
                    errors={errors}
                />
                <Button
                    background={Colors.colorPrimary}
                    hoverBackground={Colors.colorPrimary50}
                    color={Colors.white}
                >
                    Entrar
                </Button>
                <RegisterSection>
                    <span onClick={navigateToRegisterPage}>
                        Ainda não possuí uma conta?
                    </span>
                    <Button
                        clickFunction={navigateToRegisterPage}
                        background={Colors.grey1}
                        hoverBackground={Colors.grey2}
                        color={Colors.white}
                    >
                        Cadastre-se
                    </Button>
                </RegisterSection>
            </LoginForm>
        </Container>
    );
}

export default Login;

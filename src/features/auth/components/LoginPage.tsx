import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthForm from "./AuthForm";
import { useLogin } from "../hooks/mutations/useLogin";
import { TOKEN_COOKIE_NAME, TOKEN_EXPIRY_DAYS } from "../hooks/useAuth";
import Cookies from "js-cookie";
import { DEFAULT_REDIRECT, ROLE_REDIRECTS } from "../utils/redirect";
import { useAuthContext } from "../hooks/AuthContext";

const image = "/login_picture.jpg";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const loginMutation = useLogin();
  const { updateUserState } = useAuthContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      // Store the token
      Cookies.set(TOKEN_COOKIE_NAME, response.token.token, {
        expires: TOKEN_EXPIRY_DAYS,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      });

      setSubmitSuccess(true);
      form.reset();

      updateUserState(response.user);

      const userRole = response.user?.role?.role || "";
      const normalizedRole = userRole.toLowerCase();
      const redirectPath = ROLE_REDIRECTS[normalizedRole] || DEFAULT_REDIRECT;
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthForm<FormValues>
      title="Login"
      description="Enter your details to login to your account"
      fields={[
        {
          label: "Email",
          type: "email",
          id: "email",
          placeholder: "johndoe@gmail.com",
          name: "email",
          col: 2,
        },
        {
          label: "Password",
          type: "password",
          id: "password",
          placeholder: "••••••••",
          name: "password",
          col: 2,
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
      image={image}
      buttonText="Login"
      forgotPassword={false}
      redirectText="Don't have an account? "
      redirectButton="Register"
      redirectLink="/register"
      reverseGrid={false}
      successMessage={
        submitSuccess ? "Login successful! Redirecting..." : undefined
      }
    />
  );
}

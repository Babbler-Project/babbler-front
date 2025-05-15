import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./AuthForm";

const image = "/login_picture.jpg";

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onError = useCallback((errors: FormErrors) => {
    console.error(errors);
  }, []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      setIsLoading(true);
      try {
        console.log("Form submitted with values:", values);
      } catch (error) {
        console.error("Error during form submission:", error);
        onError({ email: { message: "An error occurred" } });
      }
      setIsLoading(false);
      login();
      navigate("/");
    },
    [login, navigate, onError],
  );

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
          placeholder: "",
          name: "password",
          col: 2,
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={isLoading}
      image={image}
      buttonText="Login"
      forgotPassword={false}
      redirectText="Didn't have an account? "
      redirectButton="Register"
      redirectLink="/register"
      reverseGrid={false}
    />
  );
}

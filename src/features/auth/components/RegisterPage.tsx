import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthForm from "./AuthForm";
import { useRegister } from "../hooks/mutations/useRegister";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME, TOKEN_EXPIRY_DAYS } from "../hooks/useAuth";
import { useAuthContext } from "../hooks/AuthContext";
import { DEFAULT_REDIRECT, ROLE_REDIRECTS } from "../utils/redirect";

const image = "/register_picture.jpg";

const ROLE_IDS = {
  USER: 1,
  SPEAKER: 3,
};

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email must be a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(32, {
        message: "Password must be less than 32 characters",
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)",
        },
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    isSpeaker: z.boolean().default(false),
    speakerFirstName: z.string().optional(),
    speakerLastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.isSpeaker || !!data.speakerFirstName, {
    message: "First name is required for speakers",
    path: ["speakerFirstName"],
  })
  .refine((data) => !data.isSpeaker || !!data.speakerLastName, {
    message: "Last name is required for speakers",
    path: ["speakerLastName"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const registerMutation = useRegister();
  const { updateUserState } = useAuthContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      isSpeaker: false,
      speakerFirstName: "",
      speakerLastName: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const isSpeakerValue = form.watch("isSpeaker");

  const onSubmit = async (values: FormValues) => {
    try {
      const registerData = {
        email: values.email,
        password: values.password,
        roleId: values.isSpeaker ? ROLE_IDS.SPEAKER : ROLE_IDS.USER,
        ...(values.isSpeaker && {
          firstName: values.speakerFirstName,
          lastName: values.speakerLastName,
        }),
      };

      const response = await registerMutation.mutateAsync(registerData);

      const tokenValue = response.token?.token || response.token;

      Cookies.set(TOKEN_COOKIE_NAME, tokenValue, {
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
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthForm<FormValues>
      title="Register"
      description="Enter your details to create your account"
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
          col: 1,
        },
        {
          label: "Confirm Password",
          type: "password",
          id: "confirmPassword",
          placeholder: "••••••••",
          name: "confirmPassword",
          col: 1,
        },
        {
          label: "Register as a speaker",
          description:
            "Speakers can create and host presentations, workshops and speaking events",
          type: "switch",
          id: "isSpeaker",
          name: "isSpeaker",
          value: isSpeakerValue,
          onChange: (value) => {
            form.setValue("isSpeaker", value);
          },
          col: 2,
        },
        {
          label: "First name",
          type: "text",
          id: "speakerFirstName",
          placeholder: "John",
          name: "speakerFirstName",
          isHidden: !isSpeakerValue,
          col: 1,
        },
        {
          label: "Last name",
          type: "text",
          id: "speakerLastName",
          placeholder: "Doe",
          name: "speakerLastName",
          isHidden: !isSpeakerValue,
          col: 1,
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      isLoading={registerMutation.isPending}
      image={image}
      buttonText="Create account"
      forgotPassword={false}
      redirectText="Already have an account? "
      redirectButton="Log in"
      redirectLink="/login"
      reverseGrid={true}
      successMessage={
        submitSuccess
          ? "Account created successfully! Redirecting..."
          : undefined
      }
    />
  );
}

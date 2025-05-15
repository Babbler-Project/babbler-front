import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthForm from "./AuthForm";

const image = "/register_picture.jpg";

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  isSpeaker: boolean;
  speakerFirstName?: string;
  speakerLastName?: string;
};

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Email must be a valid email address." }),
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(32, {
        message: "Password must be less than 32 characters.",
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)",
        },
      ),
    confirmPassword: z.string().min(1, { message: "Required" }),
    isSpeaker: z.boolean(),
    speakerFirstName: z.string().optional(),
    speakerLastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.isSpeaker || !!data.speakerFirstName, {
    message: "First name is required if you are a speaker",
    path: ["speakerFirstName"],
  })
  .refine((data) => !data.isSpeaker || !!data.speakerLastName, {
    message: "Last name is required if you are a speaker",
    path: ["speakerLastName"],
  });

export default function RegisterPage() {
  // const navigate = useNavigate();
  // const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      console.log("Form submitted with values:", values);
    } catch (error) {
      console.error("Error during form submission:", error);
      onError({ email: { message: "An error occurred" } });
    }
    setIsLoading(false);
    // login();
    // navigate("/");
  };

  const onError = (errors: FormErrors) => {
    console.error(errors);
  };

  return (
    <AuthForm<FormValues>
      title="Register"
      description="Enter your details to register to your account"
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
          col: 1,
        },
        {
          label: "Confirm Password",
          type: "password",
          id: "confirmPassword",
          placeholder: "",
          name: "confirmPassword",
          col: 1,
        },
        {
          label: "Are you a speaker ?",
          description:
            "Speakers can create and host presentations, workshops and speaking events",
          type: "switch",
          id: "isSpeaker",
          placeholder: "",
          name: "isSpeaker",
          value: form.watch("isSpeaker"),
          onChange: (value) => form.setValue("isSpeaker", Boolean(value)),
          col: 2,
        },
        {
          label: "First name",
          type: "text",
          id: "speakerFirstName",
          placeholder: "John",
          name: "speakerFirstName",
          isHidden: form.watch("isSpeaker") === false,
          col: 1,
        },
        {
          label: "Last name",
          type: "text",
          id: "speakerLastName",
          placeholder: "Doe",
          name: "speakerLastName",
          isHidden: form.watch("isSpeaker") === false,
          col: 1,
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={isLoading}
      image={image}
      buttonText="Register"
      forgotPassword={false}
      redirectText="Have an account? "
      redirectButton="Login"
      redirectLink="/login"
      reverseGrid={true}
    />
  );
}

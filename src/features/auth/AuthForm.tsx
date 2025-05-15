import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface Field<V> {
  label: string;
  description?: string;
  type: string;
  id: string;
  placeholder: string;
  name: Path<V>;
  onChange?: (value: boolean) => void;
  value?: boolean;
  isHidden?: boolean;
  col?: number;
}

interface AuthFormProps<V extends FieldValues> {
  title: string;
  description: string;
  fields: Field<V>[];
  form: UseFormReturn<V>;
  onSubmit: (values: V) => void;
  onError: (errors: FieldErrors<V>) => void;
  isLoading: boolean;
  image: string;
  buttonText: string;
  forgotPassword?: boolean;
  redirectText: string;
  redirectButton: string;
  redirectLink: string;
  reverseGrid?: boolean;
}

export default function AuthForm<V extends FieldValues>({
  title,
  description,
  fields,
  form,
  onSubmit,
  onError,
  isLoading,
  image,
  buttonText,
  forgotPassword,
  redirectText,
  redirectButton,
  redirectLink,
  reverseGrid = false,
}: AuthFormProps<V>) {
  const orderClasses = reverseGrid ? "lg:order-last" : "lg:order-first";

  const passwordVisibilityRefs = useRef<{ [key: string]: boolean }>({});

  const togglePasswordVisibility = (id: string) => {
    passwordVisibilityRefs.current[id] = !passwordVisibilityRefs.current[id];
    setIsPasswordVisible({ ...passwordVisibilityRefs.current });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div
        className={`flex flex-col gap-4 p-6 md:p-10 relative ${orderClasses}`}
      >
        <div className="flex justify-center gap-2 md:justify-start absolute top-6 left-6">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary overflow-hidden text-primary-foreground">
              <img src="./babbler-logo.png" className="object-cover" />
            </div>
            Babbler
          </a>
        </div>
        <div className={`flex flex-1 items-center justify-center py-12`}>
          <div className="mx-auto grid w-[450px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="mx-auto grid w-[300px] text-balance text-muted-foreground">
                {description}
              </p>
            </div>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              {fields
                .filter((field) => !field.isHidden)
                .reduce((rows: Field<V>[][], field) => {
                  const lastRow = rows[rows.length - 1];
                  if (field.col === 2) {
                    rows.push([field]);
                  } else if (
                    !lastRow ||
                    lastRow.length === 2 ||
                    lastRow.some((f) => f.col === 2)
                  ) {
                    rows.push([field]);
                  } else {
                    lastRow.push(field);
                  }
                  return rows;
                }, [])
                .map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {row.map((field) => (
                      <div
                        key={field.id}
                        className={field.col === 2 ? "col-span-2" : ""}
                      >
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                ))}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {buttonText}
              </Button>
              {forgotPassword && (
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-card-foreground"
                >
                  Forgot password?
                </NavLink>
              )}
            </form>
            <div className="mt-4 text-center text-sm">
              {redirectText}
              <NavLink to={redirectLink} className="underline">
                {redirectButton}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={image}
          alt="Babbler picture"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );

  function renderField(field: Field<V>) {
    const inputProps = form.register(field.name);
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <div className="relative">
              <Input
                id={field.id}
                className="bg-background"
                type={
                  field.type === "password" && isPasswordVisible[field.id]
                    ? "text"
                    : field.type
                }
                placeholder={field.placeholder}
                {...inputProps}
              />
              {field.type === "password" && (
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => togglePasswordVisibility(field.id)}
                >
                  {isPasswordVisible[field.id] ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case "switch":
        return (
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm">
            <div className="flex flex-col gap-2">
              <Label className="cursor-pointer" htmlFor={field.id}>
                {field.label}
              </Label>
              <span className="text-muted-foreground font-normal text-sm">
                {field.description}
              </span>
            </div>
            <Switch
              id={field.id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
        );
      default:
        return null;
    }
  }
}

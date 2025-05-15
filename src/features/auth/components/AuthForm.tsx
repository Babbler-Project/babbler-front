import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
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
  isLoading: boolean;
  image: string;
  buttonText: string;
  forgotPassword?: boolean;
  redirectText: string;
  redirectButton: string;
  redirectLink: string;
  reverseGrid?: boolean;
  successMessage?: string;
}

export default function AuthForm<V extends FieldValues>({
  title,
  description,
  fields,
  form,
  onSubmit,
  isLoading,
  image,
  buttonText,
  forgotPassword,
  redirectText,
  redirectButton,
  redirectLink,
  reverseGrid = false,
  successMessage,
}: AuthFormProps<V>) {
  const orderClasses = reverseGrid ? "lg:order-last" : "lg:order-first";
  const { formState } = form;

  // Password visibility state management
  const [isPasswordVisible, setIsPasswordVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePasswordVisibility = (id: string) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Root-level form error
  const rootError = formState.errors.root?.message;

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

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="mx-auto grid w-[450px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="mx-auto grid w-[300px] text-balance text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {/* Root Error Message */}
            {rootError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{rootError as string}</AlertDescription>
              </Alert>
            )}

            {/* Form with validation errors */}
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                {isLoading ? "Processing..." : buttonText}
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
    const fieldError = formState.errors[field.name];

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
                className={`bg-background ${fieldError ? "border-red-500" : ""}`}
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
            {/* Error message for field */}
            {fieldError && (
              <p className="text-red-500 text-sm mt-1">
                {fieldError.message?.toString()}
              </p>
            )}
          </div>
        );
      case "switch":
        return (
          <div className="flex flex-col gap-2">
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
            {/* Error message for field */}
            {fieldError && (
              <p className="text-red-500 text-sm mt-1">
                {fieldError.message?.toString()}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  }
}

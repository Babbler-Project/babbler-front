import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--normal-description": "var(--muted-foreground)",
          "--success-bg": "var(--success-50, #ecfdf5)",
          "--success-text": "var(--success-900, #064e3b)",
          "--success-description": "var(--success-700, #047857)",
          "--success-border": "var(--success-200, #a7f3d0)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

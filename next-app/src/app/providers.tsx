import { ReactNode } from "react";
import { ClientProviders } from "./ClientProviders";

export function Providers({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}

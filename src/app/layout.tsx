import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/styled-components/registry";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ja">
    <StyledComponentsRegistry>
      <body>{children}</body>
    </StyledComponentsRegistry>
  </html>
);

export default RootLayout;

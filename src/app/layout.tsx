import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MASE.ZIP",
  description: "Mason Boulier's photography archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "gawstxn",
  description: "Personal website | gawstxn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Bookly",
  description: "Browse books and their ratings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

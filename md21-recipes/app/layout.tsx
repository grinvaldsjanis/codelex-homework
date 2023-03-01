import Link from "next/link";
// import "./globals.css";
import Header from "./header";
import styles from "./page.module.css"

export const metadata = {
  title: "Recipes app",
  description: "Recipes from all around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.background}>
        <Header />
        {children}
      </body>
    </html>
  );
}

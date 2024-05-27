import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";
import Header from "./components/Header";
import styles from './layout.module.scss'
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Память Якутии",
  description: 'Портал "Память Якутии"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={styles.layout}>
        <MantineProvider>
          <Header />
          <div className={styles.content}>
            {children}
          </div>
          <Footer />
        </MantineProvider>

      </body>
    </html>
  );
}

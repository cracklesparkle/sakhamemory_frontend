import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, Paper } from "@mantine/core";
import "../globals.scss";
import Header from "../components/Header";
import styles from './layout.module.scss'
import Footer from "../components/Footer";

export const metadata = {
  title: "Память Якутии",
  description: 'Портал "Память Якутии"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={styles.layout}>
        <div className={styles.content}>
          <MantineProvider withCssVariables>
            <Header />
            <Paper w={'100%'} h={'100%'} radius={'0 0 8 8'}>
              <div className={styles.content}>
                {children}
              </div>
            </Paper>
            <Footer />
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}

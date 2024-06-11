import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css';
import '../globals.scss'
import styles from '@/app/(root)/layout.module.scss'

export const metadata = {
  title: "Память Якутии",
  description: 'Портал "Память Якутии"',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <ColorSchemeScript/>
      </head>
      <body className={styles.layout}>
        <div className={styles.content}>
          <MantineProvider withCssVariables>
            {children}
          </MantineProvider>
        </div>
      </body>
    </html>
  )
}

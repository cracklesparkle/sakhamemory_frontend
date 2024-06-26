'use client'

import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import { ColorSchemeScript, Flex, Loader, MantineProvider, Paper } from "@mantine/core";
import "../globals.scss";
import Header from "../components/Header";
import styles from './layout.module.scss'
import Footer from "../components/Footer";
import { AdminNavbar } from "../components/Admin/AdminNavbar";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={styles.layout}>
        <div className={styles.content}>
          <MantineProvider withCssVariables>
            <Header />
            <SessionProvider>
              <AdminPageContent>
                {children}
              </AdminPageContent>
            </SessionProvider>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}

function AdminPageContent({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {
        // authenticated
      } else if (status === 'loading') {
        // Session is still loading
      } else {
        redirect('/auth/signin');
      }
    };

    fetchData();
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (status === 'loading') {
    return (
      <div className={styles.loader}>
        <Loader color="blue" />
      </div>
    )
  }

  return (
    <>
      {session &&
        <div className={styles.grid}>
          <AdminNavbar user={session.user.email} handleSignOut={handleSignOut} />
          <div style={{ overflowY: 'auto', width: '100%' }}>
            {children}
          </div>
        </div>
      }
    </>
  );
}
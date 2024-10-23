"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    background: {
      primary: "#FFFFFF",
      secondary: "#F7FAFC",
    },
    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
    },
    accent: {
      primary: "#3182CE",
      secondary: "#63B3ED",
    },
    outline: {
      dark: "#2D3748", // Dark blue color for outlines
      light: "#A0AEC0", // Lighter option for subtle outlines
    },
  },
  styles: {
    global: {
      body: {
        bg: "background.primary",
        color: "text.primary",
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        borderColor: "outline.dark",
        borderWidth: "1px",
        borderRadius: "md",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderWidth: "1px",
        borderRadius: "md",
        _focus: {
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        },
      },
      variants: {
        solid: {
          bg: "accent.primary",
          color: "white",
          borderColor: "outline.dark",
          _hover: {
            bg: "accent.secondary",
          },
        },
        outline: {
          bg: "transparent",
          color: "accent.primary",
          borderColor: "outline.dark",
          _hover: {
            bg: "accent.secondary",
            color: "white",
          },
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              {children}
            </QueryClientProvider>
          </SessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins  } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/layout/Navbar/Navbar";

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'MovieDrix',
    description: `Explore Movies and TV shows on MovieDrix`,
    keywords: ["movies", "movie", "tv shows", "tv", "find movies"],
    icons: { icon: "/MovieDrixLogo.png" },
    robots: {
        index: true,
        follow: true
    },
    metadataBase: new URL('https://movie-drix.vercel.app'),
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: 'MovieDrix',
        url: 'https://https://movie-drix.vercel.app',
        description: `Explore Movies and TV shows on MovieDrix`,
        type: 'website',
        images: [
            {
                url: '/MovieDrixOGLogo.png',
                width: 1200,
                height: 630,
                alt: "MovieDrix - Explore Movies and TV Shows",
            },
        ],
    },
}
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`
                    ${poppins.className} 
             
                    antialiased relative flex flex-col min-h-screen`
                }
            >
                <header className="sticky top-0 z-20 ">
                    <Navbar/>
                </header>
                <main className="flex-1 flex flex-col ">
                    {children}
                </main>
            </body>
        </html>
    );
}

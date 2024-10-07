import { Montserrat } from 'next/font/google'
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export const metadata = {
  metadataBase: new URL('https://localhost:3000'),
  title: "Игра «Комбинация»: окунитесь в музыку 90-х. Играть",
  description: "Спасите концерт легендарной группы и получите месяц мульти-подписки Wink.",
  openGraph: {
    title: 'Играю в «Комбинацию» и получаю промокод в Wink',
    description: 'Спасите концерт легендарной группы и получите месяц мульти-подписки Wink.',
    url: 'https://localhost:3000',
    siteName: 'Игра «Комбинация»: окунитесь в музыку 90-х. Играть',
    images: [
      {
        url: 'https://kombinatsiya-game.wink.ru/img/share.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://kombinatsiya-game.wink.ru/img/share-alt.jpg', // Must be an absolute URL
        width: 1800,
        height: 1600,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full min-h-full min-w-[320px]">
      <body
        className={`${montserrat.variable} h-full min-h-full min-w-[320px]`}
      >
        {children}
      </body>
    </html>
  );
}

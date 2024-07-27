import './globals.css';
import localFont from 'next/font/local';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

const plusJakartaSans = localFont({
  src: './PlusJakartaSans[wght].ttf',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'BijakUang',
  description: 'Allowing you to talk to your money.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen min-w-screen flex flex-col scroll-smooth">{children}</main>
      </body>
    </html>
  );
}

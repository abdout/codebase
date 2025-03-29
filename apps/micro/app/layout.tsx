export const metadata = {
  title: "Micros - Reusable Micro-Services",
  description: "Reusable micro-services components like invoice management and report generators.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-xl font-bold">Micros</h1>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-4">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Micros - Built on shadcn/ui
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 
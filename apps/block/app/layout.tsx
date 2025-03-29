export const metadata = {
  title: "Blocks - Reusable Component Blocks",
  description: "Reusable block components like auth, notifications, and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="border-b py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-xl font-bold">Blocks</h1>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-4">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Blocks - Built on shadcn/ui
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 
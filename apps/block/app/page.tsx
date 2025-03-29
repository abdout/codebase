export default function BlocksHomePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-6 text-4xl font-bold">Blocks</h1>
      <p className="mb-8 text-lg">
        Reusable block components like auth, notifications, and more.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for blocks */}
        <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Authentication</h2>
          <p className="text-gray-600">Sign-in, sign-up, and password reset flows.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Notifications</h2>
          <p className="text-gray-600">User notification systems and alerts.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
          <h2 className="mb-2 text-xl font-semibold">User Profiles</h2>
          <p className="text-gray-600">Profile management and settings.</p>
        </div>
      </div>
    </div>
  )
} 
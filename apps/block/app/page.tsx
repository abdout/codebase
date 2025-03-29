export default function BlocksHomePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Blocks</h1>
      <p className="text-lg mb-8">
        Reusable block components like auth, notifications, and more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for blocks */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Authentication</h2>
          <p className="text-gray-600">Sign-in, sign-up, and password reset flows.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">User notification systems and alerts.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">User Profiles</h2>
          <p className="text-gray-600">Profile management and settings.</p>
        </div>
      </div>
    </div>
  )
} 
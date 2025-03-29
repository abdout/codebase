export default function MicrosHomePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Micros</h1>
      <p className="text-lg mb-8">
        Reusable micro-services components like invoice management and report generators.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for micros */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Invoice Management</h2>
          <p className="text-gray-600">Complete invoice creation and management system.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Report Generator</h2>
          <p className="text-gray-600">Dynamic report generation and export tools.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">User Analytics</h2>
          <p className="text-gray-600">User behavior tracking and analytics dashboard.</p>
        </div>
      </div>
    </div>
  )
} 
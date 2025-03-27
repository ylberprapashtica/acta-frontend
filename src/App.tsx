import React from 'react'
import { TenantProvider } from './contexts/TenantContext'
import { TenantBanner } from './components/TenantBanner'

function App() {
  return (
    <TenantProvider>
      <div className="min-h-screen">
        <TenantBanner />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Acta</h1>
            <p className="text-xl text-gray-600">
              Your business management solution
            </p>
          </div>
        </div>
      </div>
    </TenantProvider>
  )
}

export default App

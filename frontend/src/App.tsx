import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Acta</h1>
                <p className="text-xl text-gray-600">
                  Your business management solution
                </p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

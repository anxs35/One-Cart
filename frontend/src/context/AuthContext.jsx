import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({ children }) {
  // Dynamically set server URL based on where the frontend is running
  // This assumes backend is running on port 8000 on the same host
  let serverUrl = `http://${window.location.hostname}:8000`;

  let value = {
    serverUrl
  }
  return (


    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>

    </div>
  )
}

export default AuthContext

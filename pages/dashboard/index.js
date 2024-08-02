import React from 'react'
import Dashboard from '../../src/components/Dashboard'
import withAuth from '../../src/auth'


 function Index() {
  return (
   <Dashboard/>
  )
}
export default withAuth(Index)

import React from 'react'
import UserTable from '../components/common/UserTable'

export const UserManagerment = () => {
  return (
    <div className="container mx-auto px-6 py-8">      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <UserTable/>
      </div>
    </div>
  )
}

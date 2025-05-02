import React, { Suspense } from 'react'
import Home from '@/components/HomePage'
import GenerList from '@/components/GenerList'

const page = () => {
  return (
    <>
    <Suspense fallback={ <div>Loading...</div> }>
      <Home/>
    </Suspense>
    </>
  )
}

export default page
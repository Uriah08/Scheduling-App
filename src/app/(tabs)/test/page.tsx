'use client'

import React from 'react'
import { useGetTestQuery } from '@/store/api'
import { Button } from '@/components/ui/button'

const TestPage = () => {
 const { data, isLoading} = useGetTestQuery()
  console.log(data);
  

  return (
    <div>

    </div>
  )
}

export default TestPage

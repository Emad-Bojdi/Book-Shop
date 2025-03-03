import DetailsPage from '@/components/template/DetailsPage'
import React from 'react'

const page = ({params}) => {
  console.log(params)
  return (
    <>
      <DetailsPage bookId={params.bookId}/>
    </>
  )
}

export default page

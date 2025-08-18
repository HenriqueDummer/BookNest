import BookCollection from '@/components/BookCollection'
import { useEffect } from 'react'

const Home = () => {

  return (
    <>
      <BookCollection status="all" title="All" />
    </>
  )
}

export default Home
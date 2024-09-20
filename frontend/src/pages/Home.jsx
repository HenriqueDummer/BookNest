import BookCollection from '@/components/BookCollection'

import { ToastContainer } from 'react-toastify'

const Home = () => {

  return (
    <>
      <ToastContainer />
      <BookCollection status="all" title="All" />
    </>
  )
}

export default Home
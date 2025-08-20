import BookCollection from '@/components/BookCollection'  

const MyBooks = () => {

  return (
    <>
      <BookCollection status="all" title="All" isPublic={false}/>
    </>
  )

}

export default MyBooks
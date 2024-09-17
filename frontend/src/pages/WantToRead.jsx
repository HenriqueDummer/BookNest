import React from 'react'
import { getBooksByStatus } from '../util/http'
import { useQuery } from '@tanstack/react-query'

import Book from '../components/Book'
import BookCollection from '../components/BookCollection'

const WantToRead = () => {
      return (
        <BookCollection title={"Want to read"}  status={"want_to_read"} />
      )
}

export default WantToRead
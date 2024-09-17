import React from 'react'
import { getBooksByStatus } from '../util/http'
import { useQuery } from '@tanstack/react-query'

import Book from '../components/Book'
import BookCollection from '../components/BookCollection'

const Reading = () => {
      return (
        <BookCollection title={"Currently reading"} status={"reading"} />
      )
}

export default Reading
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllBooks } from '../util/http'
import Book from '../components/Book'
import BookCollection from '@/components/BookCollection'

const Home = () => {

  return (
    <BookCollection status="all" title="All" />
  )
}

export default Home
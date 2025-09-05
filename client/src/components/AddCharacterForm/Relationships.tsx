import React from 'react'
import { Button } from '../ui/button'
import { IoIosAdd } from "react-icons/io";

const Relationships = () => {
  return (
    <div>
      <Button variant={"ghost"} className='w-full !py-2'>
        <IoIosAdd size={24} />
        Add character
      </Button>
    </div>
  )
}

export default Relationships
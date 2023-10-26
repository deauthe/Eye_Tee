import CategoryCard from '@/components/CategoryCard'
import Wrapper from '@/components/Wrapper'
import React from 'react'
import ProductCard from '@/components/ProductCard'
const categories = () => {
  return (
    <div>
       <Wrapper>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0'>

            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6 px-5 md:px-0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
            <ProductCard />
          ))}
        </div>

   
       </Wrapper>
    </div>
  )
}

export default categories
import React from 'react'
import Image from 'next/image'
const Designers = ({data}) => {
  console.log(data);
  return ( 
    <div className='relative w-[10em]  mt-[6em]'>
        <div className='overflow-hidden rounded-lg w-[8em] shadow-lg'>
            <Image src="/Design.webp" alt='Design_' width={200} height={200}/>
        </div>
        <div className='overflow-hidden rounded-lg w-[4em] absolute -top-[20%] right-[5%] border-4 border-[#f0eded]   '>
            <Image src="/Designer.jpg" alt='Designer_' width={200} height={200}/>
        </div>
    </div>
  )
}

export default Designers


export async function getStaticProps(params) {
  const apiUrl = 'http://localhost:8080/api/designs/getProducts';
  const response = await fetch(apiUrl, {
    headers: {
      'x-api-key': 'token',
    },
  });
  const data = await response.json();

  console.log('Fetched data:', data); // Add this line for debugging

  return {
    props: {
      data,
    },
  };
}

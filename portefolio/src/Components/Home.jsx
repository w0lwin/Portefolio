
import React, { useState,useEffect} from 'react';
import Loading from './Loading';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }




  return (
    <div className="mx-4 my-4 border-white border-2" >
          <div>
            <h1 className="text-3xl text-white font-bold " >Téo Bacher</h1>
            <h6 className='text-white'>Devellopper fullstack</h6>
          </div>
      </div>
  );
};

export default Home;


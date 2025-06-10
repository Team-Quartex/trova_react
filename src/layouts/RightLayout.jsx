import React, { useEffect, useState } from 'react'
import SuggestCardS from '../components/SuggestCardS'
import { fetchSuggetions } from '../services/suggesionUsers';

const RightLayout = () => {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const fetchUsers = async() =>{
      try {
        const data = await fetchSuggetions();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  },[]);
  return (
    <div className='w-[20vw] h-screen flex flex-col'>
        <div className='h-2/3 w-full py-2'>
            <h1 className='mx-1.5 font-bold text-lg'>Suggesions</h1>
            <div className='overflow-y-auto h-11/12 w-11/12 mx-auto p-1'>
                {users.map((data,i)=>(
                  <SuggestCardS key={i} name={data.name} username={data.username} img={data.image} />
                ))}
            </div>
        </div>
        <div className='h-1/3 w-full  rounded-2xl p-2'>
          <img src="images/banner.jpeg" className='w-full h-full object-cover rounded-2xl' alt="" />
        </div>
    </div>
  )
}
export default RightLayout

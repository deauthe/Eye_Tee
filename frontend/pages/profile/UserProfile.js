import DesignPattern from "@/components/DesignPattern";
import Wrapper from "@/components/Wrapper";
import React from "react";
import Image from "next/image";
import profile from "../../public/lady.jpg";
import NextModel from "@/components/NextModel";
import {BsPiggyBank} from 'react-icons/bs';
import wish from '../../public/wish.png';
import art from '../../public/art.png';
import EditProfile from "@/components/EditProfile";
const UserProfile = () => {
  return (
    <Wrapper>
     <div className="bg-[#f7d59c] h-[11em] relative mb-[60px]">
        <div className="overflow-hidden rounded-full inline-block absolute bottom-[-40px] left-[20px]">
          <Image src={profile} alt="profile" width={170} height={170} />
        </div>
        <div className=" font-[500] bg-black hover:bg-black hover:text-white transition-all duration-300 rounded-full absolute right-[210px] bottom-[-15px] text-white">
        <EditProfile/>
        </div>


       <button className=" text-white font-[500] flex items-center justify-center gap-1 bg-blue-400 rounded-full py-2 px-4 absolute right-[40px] bottom-[-15px]">
     Total Earning 
     <BsPiggyBank/>
       </button>
        <div className="absolute left-[200px] top-[70px]">
          <h3 className="font-[600] text-3xl"> Samanvay Arya</h3>
          <p>@asamanvay</p>
          <div className="flex gap-4">
            <p>
              <span className="mr-2 font-[700]">300</span>Followers
            </p>
            <p>
              <span className="mr-2 font-[700]">300</span>Following
            </p>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-10 mb-10 ">
        <div className="bg-white/80  px-10 py-5 shadow rounded-md flex flex-col gap-3 items-center">
          <Image src={art} width={100} alt="img"></Image>
          <button className="font-[600] text-white bg-black rounded-full px-4 py-2 ">Sell Your Art</button>
        </div>

        <div  className="bg-white/80  px-10 py-5 shadow rounded-md flex flex-col gap-3 items-center">
          <Image src={wish} width={100} alt="img"></Image>
          <button className="font-[600] text-white bg-black rounded-full px-4 py-2 ">Wish List</button>
        </div>



      </div>

      
    </Wrapper>
  );
};

export default UserProfile;

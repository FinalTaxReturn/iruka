import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { H1 } from './Headings';

type TopBarProps = {
  title: string;
};

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-white shadow-md z-50'>
      <div className='container mx-auto px-5 py-4 grid grid-cols-3 items-center'>
        <div></div>
        <H1 className='text-center whitespace-nowrap'>{title}</H1>
        <div className='relative w-8 h-8 justify-self-end'></div>
      </div>
    </div>
  );
};

export default TopBar;

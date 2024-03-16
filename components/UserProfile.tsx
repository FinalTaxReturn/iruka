import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';

import Image from 'next/image';
export type Account = {
  name: string;
  username: string;
  avatarUrl: string;
  following: boolean;
};

const UserProfile = ({ account }: { account: Account }) => {
  return (
    <Card className='my-5'>
      <CardHeader>
        <div className='flex'>
          <Avatar>
            <Image alt='' width={40} height={40} src={account.avatarUrl} />
          </Avatar>
          <div className='flex flex-col ml-2'>
            <span className='font-bold'>{account.name}</span>
            <span className='text-sm text-gray-500'>{account.username}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserProfile;

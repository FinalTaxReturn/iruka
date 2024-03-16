import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import UserProfile from '@/components/UserProfile';
import { accounts } from './data/accounts';
import BottomMenuBar from '@/components/BottomBar';
import { H1, H2, H3 } from '@/components/Headings';
import TopBar from '@/components/TopBar';

export default async function Page({ params }: { params: { roomId: string } }) {
  if (params.roomId.length !== 6) {
    redirect('/');
  }

  const result =
    await sql`SELECT * FROM rooms WHERE roomid = ${params.roomId.toUpperCase()}`;

  if (result.rowCount === 0) {
    redirect('/');
  }

  return (
    <>
      <TopBar title={`Room: ${params.roomId}`} />
      <div className='py-20'>
        <H2>近くのアカウント</H2>
        {accounts.map((account) => (
          <UserProfile key={account.id} account={account} />
        ))}
        <BottomMenuBar />
      </div>
    </>
  );
}

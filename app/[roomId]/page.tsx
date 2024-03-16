import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { Nya } from '@/components/nya';
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
        <Nya />
      </div>
    </>
  );
}

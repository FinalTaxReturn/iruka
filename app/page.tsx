import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

export default function Home() {
  async function generateRandomString(length: number) {
    'use server';
    // 大文字英数字の文字列
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const createRoom = async () => {
    'use server';
    let roomId;
    do {
      roomId = await generateRandomString(6);
      const result = await sql`SELECT * FROM rooms WHERE roomid = ${roomId}`;
      if (result.rowCount === 0) {
        break;
      }
    } while (false);

    await sql`INSERT INTO rooms (roomid) VALUES (${roomId})`;

    redirect(`/${roomId}/share`);
  };

  const action = async (formData: FormData) => {
    'use server';
    const roomId = formData.get('room-id');

    if (/^[A-Z0-9]{6}$/.test(roomId?.toString()?.toUpperCase() ?? '')) {
      redirect(`/${roomId}`);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-6'>iruka</h1>
      <div className='space-y-16'>
        <form action={createRoom}>
          <button
            onClick={createRoom}
            className='w-full py-2 px-4 bg-neutral-200 rounded-full text-gray-700 focus:outline-none'
          >
            ルームを作る
          </button>
        </form>
        <form className='space-y-4' action={action}>
          <input
            type='text'
            name='room-id'
            className='w-full py-2 px-4 bg-neutral-100 rounded-full text-gray-700 focus:outline-none border-8 border-neutural-100'
            placeholder='Room IDを入力...'
          />
          <button
            type='submit'
            className='w-full py-2 px-4 bg-neutral-200 rounded-full text-gray-700 focus:outline-none'
          >
            ルームに参加
          </button>
        </form>
      </div>
    </main>
  );
}

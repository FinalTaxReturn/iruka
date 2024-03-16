import { QRCode } from '@/components/qrcode';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-2xl font-bold mb-6'>
          https://iruka.vercel.app/{params.roomId}
        </h1>
        <QRCode url={`https://iruka.vercel.app/${params.roomId}`} />
      </main>
    </>
  );
}

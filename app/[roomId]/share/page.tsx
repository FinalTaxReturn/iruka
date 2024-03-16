export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <>
      <h1>{params.roomId}</h1>
    </>
  );
}

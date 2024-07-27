export default async function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  return <>User ID: {userId}</>;
}

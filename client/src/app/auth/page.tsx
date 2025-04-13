import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Auth() {
  const cookieStore = await cookies(); // ✅ No await needed
  const token = cookieStore.get('_Tt')?.value;

  if (!token) redirect('/login');

  return <div>Hello, you're logged in!</div>;
}

import UserProfile from '@/components/UserProfile';
import { accounts } from './data/accounts';
import BottomMenuBar from '@/components/BottomBar';
import { H1, H2, H3 } from '@/components/Headings';
import TopBar from '@/components/TopBar';

export default async function Page() {
  return (
    <>
      <TopBar title='Room Name' />
      <H2>近くのアカウント</H2>
      {accounts.map((account) => (
        <UserProfile key={account.id} account={account} />
      ))}
      <BottomMenuBar />
    </>
  );
}

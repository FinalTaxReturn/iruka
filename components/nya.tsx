'use client';

import UserProfile, { Account } from '@/components/UserProfile';

import BottomMenuBar from '@/components/BottomBar';
import { H1, H2, H3 } from '@/components/Headings';
import { useState } from 'react';

export const Nya = () => {
  const [accounts, setAccount] = useState<Account[]>([]);
  const call = (a: Account[]) => {
    setAccount(a);
  };
  const reset = () => {
    setAccount([]);
  };
  return (
    <>
      <H2>近くのアカウント</H2>
      {accounts.map((account: Account, index) => (
        <UserProfile key={index} account={account} />
      ))}
      <BottomMenuBar call={call} reset={reset} />
    </>
  );
};

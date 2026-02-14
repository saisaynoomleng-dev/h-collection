import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import React from 'react';

const UserPersonalInformationPage = () => {
  return (
    <div>
      UserPersonalInformationPage
      <Button asChild>
        <SignOutButton />
      </Button>
    </div>
  );
};

export default UserPersonalInformationPage;

'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

export default function DocumentsPage() {
  const { user } = useUser();
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className="mr-2 size-4" />
        Create a note
      </Button>
    </div>
  );
}

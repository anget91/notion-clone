import { Button } from '@/components/ui/button';
import Logo from './logo';

export default function Footer() {
  return (
    <footer className="z-50 flex w-full items-center bg-background p-6 dark:bg-neutral-800">
      <Logo />
      <div className="flex w-full justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}

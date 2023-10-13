import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="relative h-full">
      <div className="h-full">
        <header className="h-[60px] border-b border-white/10">
          <nav className="h-full px-4">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="w-full h-full ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

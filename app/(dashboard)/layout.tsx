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
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-white/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="my-4 text-xl">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
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

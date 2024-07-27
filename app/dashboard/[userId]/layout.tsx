import SideNav from '@/components/ui/nav/side-nav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <div className="w-1/4 min-h-screen p-4 flex flex-col items-center gap-8">
        <SideNav />
      </div>
      <div className="w-3/4 min-h-screen p-4 bg-emerald-500">{children}</div>
    </div>
  );
}
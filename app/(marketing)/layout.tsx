import Navbar from './_components/navbar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-neutral-800">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}

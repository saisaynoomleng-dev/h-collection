import MainHeader from '@/components/shared/MainHeader';

export default function FrontEndLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <MainHeader />
      {children}
    </main>
  );
}

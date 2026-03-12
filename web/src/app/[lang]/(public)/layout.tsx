export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>SkyGym Navbar</header>

      <main>{children}</main>

      <footer>SkyGym Footer</footer>
    </>
  );
}

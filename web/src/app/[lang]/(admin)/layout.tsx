export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '250px' }}>Admin Sidebar</aside>

      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}

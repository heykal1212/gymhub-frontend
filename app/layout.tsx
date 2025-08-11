export const metadata = { title: 'GymHub', description: 'GymHub PWA' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, Arial, sans-serif', margin: 0 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0 }}>GymHub</h1>
            <nav style={{ display: 'flex', gap: 12 }}>
              <a href="/">Home</a>
              <a href="/members">Members</a>
              <a href="/attendance">Attendance</a>
            </nav>
          </header>
          {children}
          <footer style={{ marginTop: 48, fontSize: 12, color: '#777' }}>© GymHub</footer>
        </div>
      </body>
    </html>
  );
}

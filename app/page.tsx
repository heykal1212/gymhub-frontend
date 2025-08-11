'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL as string;

export default function Home() {
  const [status, setStatus] = useState<string>('Loading…');
  useEffect(() => {
    fetch(API + '/').then(r => r.json()).then(j => setStatus(JSON.stringify(j))).catch(e => setStatus('Error: ' + e));
  }, []);
  return (
    <main>
      <h2>API Health</h2>
      <pre style={{ background:'#f6f8fa', padding:12, borderRadius:6 }}>{status}</pre>

      <h2 style={{ marginTop: 24 }}>Quick Start</h2>
      <ol>
        <li>Set <code>NEXT_PUBLIC_API_URL</code> in Vercel to your Railway API.</li>
        <li>Use the <a href="/members">Members</a> page to add a user.</li>
      </ol>
    </main>
  );
}

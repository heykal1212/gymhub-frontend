'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL as string;

type Entry = { id:string; userId:string; deviceId:string; checkinAt:number; checkoutAt:number|null };

export default function Attendance() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [userId, setUserId] = useState('');
  const [deviceId, setDeviceId] = useState('door1');
  const [busy, setBusy] = useState(false);

  const load = () => fetch(API + '/attendance').then(r => r.json()).then(setEntries);
  useEffect(() => { load(); }, []);

  const checkin = async () => {
    setBusy(true);
    await fetch(API + '/attendance/checkin', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, deviceId })
    });
    setBusy(false); setUserId(''); load();
  };

  const checkout = async () => {
    setBusy(true);
    await fetch(API + '/attendance/checkout', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId })
    });
    setBusy(false); setUserId(''); load();
  };

  const fmt = (ms:number|null) => ms ? new Date(ms).toLocaleString() : '—';

  return (
    <main>
      <h2>Attendance</h2>

      <div style={{ display:'grid', gap:8, maxWidth:420, marginBottom:16 }}>
        <input placeholder="User ID" value={userId} onChange={e=>setUserId(e.target.value)} />
        <input placeholder="Device ID" value={deviceId} onChange={e=>setDeviceId(e.target.value)} />
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={checkin} disabled={busy || !userId}>{busy?'…':'Check-in'}</button>
          <button onClick={checkout} disabled={busy || !userId}>{busy?'…':'Checkout'}</button>
        </div>
      </div>

      <table style={{ borderCollapse:'collapse', width:'100%' }}>
        <thead><tr><th>User</th><th>Door</th><th>Check-in</th><th>Checkout</th></tr></thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.id}><td><code>{e.userId}</code></td><td>{e.deviceId}</td><td>{fmt(e.checkinAt)}</td><td>{fmt(e.checkoutAt)}</td></tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

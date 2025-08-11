'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL as string;

type User = { id: string; name: string; email: string; role: string };

export default function Members() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [busy, setBusy] = useState(false);

  const load = () => fetch(API + '/users').then(r => r.json()).then(setUsers);

  useEffect(() => { load(); }, []);

  const add = async () => {
    setBusy(true);
    await fetch(API + '/users', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    });
    setName(''); setEmail(''); setRole('member'); setBusy(false); load();
  };

  return (
    <main>
      <h2>Members</h2>

      <div style={{ display:'grid', gap:8, maxWidth: 420, marginBottom: 16 }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="member">member</option>
          <option value="staff">staff</option>
          <option value="trainer">trainer</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={add} disabled={busy || !name || !email}>{busy ? 'Saving…' : 'Add Member'}</button>
      </div>

      <table style={{ borderCollapse:'collapse', width:'100%' }}>
        <thead>
          <tr><th style={{textAlign:'left'}}>Name</th><th style={{textAlign:'left'}}>Email</th><th>Role</th><th>ID</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.email}</td><td style={{textAlign:'center'}}>{u.role}</td><td><code>{u.id}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

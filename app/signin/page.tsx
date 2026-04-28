"use client";
export default function SignIn() {
  return (
    <div className="container" style={{ maxWidth: '500px', margin: '120px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Sign In</h1>
        <p style={{ marginBottom: '32px', color: '#5A4A3A' }}>Account system coming soon. For now, you can continue as guest.</p >
        <button className="btn-primary" onClick={() => window.location.href = '/'}>Continue as Guest</button>
      </div>
    </div>
  );
}
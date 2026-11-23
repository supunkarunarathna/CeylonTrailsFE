export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', padding: '60px 0' }}>
      <span className="loading-spinner" />
      <span className="text-muted">{label}</span>
    </div>
  );
}

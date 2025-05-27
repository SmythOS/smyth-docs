export default function Spacer({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const map = { sm: 'my-6', md: 'my-16', lg: 'my-24' };
  return <div className={map[size]} />;
}

export default function Spacer({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const map = { sm: '1.5rem', md: '4rem', lg: '6rem' };
  return <div style={{ margin: `${map[size]} 0` }} />;
}

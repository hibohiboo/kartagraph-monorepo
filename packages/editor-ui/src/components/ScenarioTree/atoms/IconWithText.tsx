// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function IconWithText({ icon, text }: { icon: any; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {icon}
      {text}
    </span>
  );
}

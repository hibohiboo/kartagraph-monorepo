export function EllipsisText({ text }: { text: string }) {
  return (
    <span
      style={{
        width: '20rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
      }}
      title={text}
    >
      {text}
    </span>
  );
}

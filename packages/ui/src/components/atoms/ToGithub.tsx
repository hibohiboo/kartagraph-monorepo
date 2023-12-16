import { FaGithub } from 'react-icons/fa6';
export default function ToGithub() {
  return (
    <a
      href="https://github.com/hibohiboo/kartagraph-monorepo"
      target="_blank"
      style={{
        color: '#fff',
        marginLeft: '0.5rem',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <FaGithub />
    </a>
  );
}

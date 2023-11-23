import { readDataUrl } from '@kartagraph-editor/domain/fileSystem/imageFile/fileReader';
import { validImageFile } from '@kartagraph-editor/domain/fileSystem/imageFile/validate';
import { fileAtom } from '@kartagraph-editor/store/fileSystem/atoms';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

function FilePreviewer() {
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [file] = useAtom(fileAtom);
  useEffect(() => {
    (async function read() {
      if (!file) {
        setType('');
        return;
      }
      if (
        file.type.startsWith('text/') ||
        file.type === 'application/json' ||
        file.name.endsWith('.md')
      ) {
        const text = await file.text();
        setText(text);
        setType('text');
        return;
      }
      try {
        if (file.type.startsWith('image/') && (await validImageFile(file))) {
          const text = await readDataUrl(file);
          setText(text);
          setType('image');
          return;
        }
      } catch (e) {
        console.log(e);
      }
      setType('unknown');
    })();
  });
  if (type === 'text') {
    return <pre>{text}</pre>;
  }
  if (type === 'image') {
    return <img src={text} alt="preview" />;
  }
  if (type === 'unknown') {
    return <div>プレビュー未対応のファイル形式です。{file?.type}</div>;
  }
  return <></>;
}

export default FilePreviewer;

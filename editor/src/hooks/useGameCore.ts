import { coreAtom } from '@kartagraph-editor/store/worker/gameCore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import json from '../data/scenario.json';

export const useGameCoreHooks = () => {
  const [, setMessage] = useAtom(coreAtom);
  useEffect(() => {
    setMessage({ command: 'initScenario', payload: JSON.stringify(json) });
  }, []);
  return {};
};

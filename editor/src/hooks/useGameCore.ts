import { getUserIdAtom } from '@kartagraph-editor/store/auth/authAtom';
import { coreAtom } from '@kartagraph-editor/store/worker/gameCore';
import { InitScenarioCommannd } from '@kartagraph-worker/types';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import json from '../data/scenario.json';

export const useGameCoreHooks = () => {
  const [, setMessage] = useAtom(coreAtom);
  const [userId] = useAtom(getUserIdAtom);
  useEffect(() => {
    const initCommand: InitScenarioCommannd = {
      command: 'initScenario',
      payload: { scenarioJson: JSON.stringify(json), userId: userId! },
    };
    setMessage(initCommand);
  }, []);
  return {};
};

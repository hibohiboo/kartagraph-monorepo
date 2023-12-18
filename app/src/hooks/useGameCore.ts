import { getUserIdAtom } from '@kartagraph-app/store/auth/authAtom';
import { coreAtom } from '@kartagraph-app/store/worker/gameCore';
import { InitScenarioCommannd } from '@kartagraph-worker/types';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const useGameCoreHooks = (json: string) => {
  const [, setMessage] = useAtom(coreAtom);
  const [userId] = useAtom(getUserIdAtom);
  useEffect(() => {
    const initCommand: InitScenarioCommannd = {
      command: 'initScenario',
      payload: { scenarioJson: json, userId: userId! },
    };
    setMessage(initCommand);
  }, [json, setMessage, userId]);
  return {};
};

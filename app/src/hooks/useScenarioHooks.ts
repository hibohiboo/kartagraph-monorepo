import { sceneAtom } from '@kartagraph-app/store/scenario/game';
import { useAtom } from 'jotai';
export const useScenarioHooks = () => {
  const [scene] = useAtom(sceneAtom);
  return {
    previewData: {
      frame: scene,
      cards: scene.cards,
    },
  };
};

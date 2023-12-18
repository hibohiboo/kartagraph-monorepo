import { TagHistory } from '@kartagraph-types/index';
import { InitScenarioCommannd, Scenario } from '@kartagraph-worker/types';
import { selectTargetScene, setCurrentUserId, setScenario } from '../store';

const createScenario = (json: string) => {
  const scenario = JSON.parse(json) as Scenario;
  return {
    ...scenario,
    scenes: scenario.scenes.map((scene) => ({
      ...scene,
      events: scene.events.flatMap((event) => {
        // TODO: リファクタしたい
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((event.type as any) === 'messages') {
          const textsLastIndex = event.data.texts.length - 1;
          return event.data.texts.map((text: string, i: number) => ({
            id: i === 0 ? event.id : `${event.id}-${i}`,
            type: 'message',
            data: { text, image: event.data.image },
            next: i === textsLastIndex ? event.next : `${event.id}-${i + 1}`,
          }));
        }
        return [event];
      }),
    })),
  };
};

export const initScenario = (
  commandPayload: InitScenarioCommannd['payload'],
) => {
  setCurrentUserId(commandPayload.userId);
  const scenarioJson = commandPayload.scenarioJson;
  const scenario: Scenario = createScenario(scenarioJson);
  setScenario(scenario);
  const tagHistory: TagHistory = {
    scenarioId: scenario.id,
    tags: [{ tagName: '開始', tagType: 'scenario' }],
    userId: commandPayload.userId,
  };
  fetch(`/v1/api/tags`, {
    method: 'PUT',
    body: JSON.stringify(tagHistory),
  });
  const payload = selectTargetScene(scenario.firstSceneId);

  return {
    command: 'initScenario',
    payload,
  };
};

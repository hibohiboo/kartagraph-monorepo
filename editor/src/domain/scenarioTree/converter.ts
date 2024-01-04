import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
  };
};

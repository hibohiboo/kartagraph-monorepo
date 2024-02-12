import { ScenarioListItem } from '@kartagraph-types/index';
import { atomWithQuery } from 'jotai-tanstack-query';

export const scenarioListAtom = atomWithQuery<ScenarioListItem>(() => ({
  queryKey: [],
  queryFn: async () => {
    const res = await fetch(`/v1/api/scenario/list`);
    return res.json();
  },
}));

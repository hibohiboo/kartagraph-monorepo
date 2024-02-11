import { TagSummary } from '@kartagraph-types/index';

export const tagsSample = (scenarioId: string) => {
  const ret: TagSummary[] = [
    { tagName: '開始', userCount: 5 },
    { tagName: scenarioId as string, userCount: 1 },
  ];
  return ret;
};

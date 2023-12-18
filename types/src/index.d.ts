type Tag = {
  tagName: string;
  tagType: string;
};

export type TagHistory = {
  scenarioId: string;
  userId: string;
  tags: Tag[];
};

// https://zenn.dev/akineko/articles/a576f74356145c

export type TagSummary = {
  userCount: number;
  tagName: string;
};

import { TagSummary } from '@kartagraph-types/index';
import { ResultPage as Component } from '@kartagraph-ui/components/templates/ResultPage';
import { SPStory } from '../../storybook';
import type { Meta, StoryObj } from '@storybook/react';

const tagResults: TagSummary[] = [
  { tagName: '開始', userCount: 10 },
  { tagName: 'タグ', userCount: 10 },
  { tagName: 'やったぜ', userCount: 5 },
];
const args = { tagResults };

const meta = {
  title: 'ResultPage',
  component: Component,
  args: { ...args },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const SPWithImage: Story = {
  ...SPStory,
};

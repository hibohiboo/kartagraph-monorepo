import { ResultPage as Component } from '@kartagraph-ui/components/templates/ResultPage';
import { SPStory } from '../../storybook';
import type { Meta, StoryObj } from '@storybook/react';

const args = {
  tagResults: [
    { tagName: '開始', count: 10 },
    { tagName: 'タグ', count: 10 },
    { tagName: 'やったぜ', count: 5 },
  ],
};

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

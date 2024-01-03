import { EventItem as Component } from '@kartagraph-editor-ui/components/ScenarioTree/molecules/EventItem';
import { PCStory } from '../../constants';
import type { Meta, StoryObj } from '@storybook/react';

const args = {
  event: {
    id: 'event1',
    type: 'message',
    data: {
      text: '「おはよう！\n今日もがんばろー」',
      image: '/images/characters/recept/laugh.png',
    },
  },
};

const meta = {
  title: 'EventItem',
  component: Component,
  args: { ...args },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const PC: Story = {
  ...PCStory,
};

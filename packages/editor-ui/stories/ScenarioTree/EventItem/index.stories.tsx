import { EventItem as Component } from '@kartagraph-editor-ui/components/ScenarioTree/molecules/EventItem';
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
export const Message: Story = {};

export const Messages: Story = {
  args: {
    event: {
      id: 'event2',
      type: 'messages',
      data: {
        texts: ['「あなたもお仕事ご苦労様です」', '「行ってらっしゃい！」'],
        image: '/images/characters/recept/laugh.png',
      },
    },
  },
};
export const Branch: Story = {
  args: {
    event: {
      id: 'click1',
      type: 'branch',
      data: {
        condition: 'hasTag',
        tag: '風呂',
        next: 'お風呂どうだった',
      },
      next: 'mesicheck',
    },
  },
};
export const AddTag: Story = {
  args: {
    event: {
      id: 'click1',
      type: 'addTag',
      data: {
        name: '風呂',
      },
    },
  },
};
export const ChangeScene: Story = {
  args: {
    event: {
      id: 'click1',
      type: 'changeScene',
      data: {
        sceneId: 'scene2',
      },
    },
  },
};
export const EndScenario: Story = {
  args: {
    event: {
      id: 'click1',
      type: 'endScenario',
    },
  },
};

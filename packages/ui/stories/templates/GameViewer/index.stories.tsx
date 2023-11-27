import { GameViewer as Component } from '@kartagraph-ui/components/templates/GameViewer';
import type { Meta, StoryObj } from '@storybook/react';
import { PCStory, SPStory } from '../../storybook';

const args = {
  message: {
    text: `「どうする？」`,
    image: '/images/characters/koko.png',
  },
  background: {
    src: '/images/backgrounds/adv_inn_2.png',
  },
  selectItems: ['逃げる', '戦う', 'じゅもん'],
};

const meta = {
  title: 'GameViewer',
  component: Component,
  args: { ...args, message: { text: args.message.text } },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const SPWithImage: Story = {
  ...SPStory,
  args: { ...args, onClickMessage: () => console.log('onClickMessage') },
};
export const PCWithImage: Story = {
  ...PCStory,
  args: { ...args },
};
export const ManyQuestion: Story = {
  ...SPStory,
  args: {
    ...args,
    onClickMessage: () => console.log('onClickMessage'),
    selectItems: [
      '逃げる',
      '戦う',
      'じゅもん',
      'おうえんさせろ',
      'ガンガンガン',
    ],
  },
};
export const SingleQuestion: Story = {
  ...SPStory,
  args: {
    ...args,
    onClickMessage: () => console.log('onClickMessage'),
    selectItems: ['逃げる'],
  },
};

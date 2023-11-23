import { GameFrame as Component } from '@kartagraph-ui/components/templates/GameFrame';
import type { Meta, StoryObj } from '@storybook/react';
import { PCStory, SPStory } from '../../storybook';

const meta = {
  title: 'GameFrame',
  component: Component,
  args: { message: { text: 'スタート' } },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PC: Story = { ...PCStory };
export const SP: Story = { ...SPStory };
const exArgs = {
  message: {
    text: `「おはよう！
  今日も一日がんばろー」`,
    image: '/images/characters/koko.png',
  },
  background: {
    src: '/images/backgrounds/adv_inn_2.png',
  },
};
export const SPWithImage: Story = {
  ...SPStory,
  args: { ...exArgs, onClickMessage: () => console.log('onClickMessage') },
};
export const PCWithImage: Story = {
  ...PCStory,
  args: { ...exArgs },
};

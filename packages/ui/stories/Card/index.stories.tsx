import Component from '@kartagraph-ui/components/Card/Card';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Card',
  component: Component,
  args: { name: 'スタート', src: 'images/adv_inn_74x94.png' },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const BigImg: Story = {
  args: {
    src: 'images/adv_inn.png',
  },
};
export const Clickable: Story = {
  args: {
    clickable: true,
    onClick: () => {
      console.log('click');
    },
  },
};
export const Hide: Story = {
  args: {
    clickable: true,
    hide: false,
  },
};
export const Chara: Story = {
  args: {
    src: 'images/characters/koko.png',
  },
};

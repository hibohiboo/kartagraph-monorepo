import Component from '@kartagraph-ui/components/LargeCard/QuestionCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'QuestionCard',
  component: Component,
  args: { title: '右に行く' },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Ruby: Story = { args: { title: '左(ひだり)に行く' } };
export const Long: Story = { args: { title: '遊び方を見るのはどうだろう' } };
export const Longest: Story = {
  args: { title: '１２３４５６７８９０１２３４５６７８９０' },
};
export const Over: Story = {
  args: { title: '１２３４５６７８９０１２３４５６７８９０１' },
};

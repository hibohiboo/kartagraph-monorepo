import Component from '@kartagraph-ui/components/MessageWindow';
import { BasicLayoutDecorator, PCStory, SPStory } from '../storybook';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MessageWindow',
  decorators: [BasicLayoutDecorator],
  component: Component,
  args: { text: 'スタート' },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PC: Story = { ...PCStory };

export const SP: Story = { ...SPStory };

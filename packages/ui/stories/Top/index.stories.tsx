import Component from '@kartagraph-ui/components/Top/Top';
import { PCStory, SPStory } from '../storybook';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Top',
  component: Component,
  args: {},
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PC: Story = { ...PCStory };

export const SP: Story = { ...SPStory };

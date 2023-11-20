import Component from '@kartagraph-ui/components/Top/Top';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Top',
  component: Component,
  args: {
    children: 'test',
  },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

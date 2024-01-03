import { ScenarioTree as Component } from '@kartagraph-editor-ui/components/ScenarioTree';
import { PCStory } from '../../constants';
import scenario from './data/scenario.json';
import type { Meta, StoryObj } from '@storybook/react';

const args = { scenario };

const meta = {
  title: 'ScenarioTree',
  component: Component,
  args: { ...args },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PC: Story = {
  ...PCStory,
};

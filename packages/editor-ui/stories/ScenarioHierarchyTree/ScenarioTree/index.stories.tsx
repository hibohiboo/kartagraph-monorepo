import { ScenarioHierarchyTree as Component } from '@kartagraph-editor-ui/components/ScenarioHierarchyTree';
import scenario from './data/converetedScenario.json';
import type { Meta, StoryObj } from '@storybook/react';

const args = { scenario };

const meta = {
  title: 'ScenarioHierarchyTree',
  component: Component,
  args: { ...args },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

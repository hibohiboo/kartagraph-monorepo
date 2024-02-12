import { ScenarioListItem as Component } from '@kartagraph-ui/components/Scenario/ScenarioListItem/';
import { PCStory, SPStory } from '../../storybook';
import type { Meta, StoryObj } from '@storybook/react';

const args = {
  id: '7d8bb386-0f86-4dff-be34-86bb2f55b366',
  title: 'ゴブリンの洞窟',
  src: 'images/icons/witch-flight.png',
  summary: `紹介文
  
改行テスト`,
  detail: '作者：hibo',
  onClick: (id: string) => {
    console.log(id);
  },
};

const meta = {
  title: 'ScenarioListItem',
  component: Component,
  args: { ...args },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const SPWithImage: Story = {
  ...SPStory,
  args: { ...args },
};
export const PCWithImage: Story = {
  ...PCStory,
  args: { ...args },
};
export const NoImage: Story = {
  ...PCStory,
  args: { ...args, src: '' },
};

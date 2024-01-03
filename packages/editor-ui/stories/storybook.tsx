import { Args, PartialStoryFn } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => <Story />;

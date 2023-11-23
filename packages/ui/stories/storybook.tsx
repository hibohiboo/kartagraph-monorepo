import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Args, PartialStoryFn } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';
import BaseWrapper from '@kartagraph-ui/components/atoms/BaseWrapper';

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    layout: 'fullscreen',
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    layout: 'fullscreen',
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => (
  <BaseWrapper>
    <Story />
  </BaseWrapper>
);

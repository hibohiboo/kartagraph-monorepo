import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import { MemoryRouter } from "react-router-dom";

// export const BasicLayoutDecorator = (
//   Story: PartialStoryFn<ReactRenderer, Args>,
// ) => <MemoryRouter>{BasicLayout(<Story />)}</MemoryRouter>;
import 'primereact/resources/themes/lara-light-indigo/theme.css';
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    msw: { handlers: [] },
  },
};

export default preview;

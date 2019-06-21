import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import '../src/common/style/index.scss';

const req = require.context('../src', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(StoryRouter());

configure(loadStories, module);

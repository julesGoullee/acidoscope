import createLogger from 'vuex/dist/logger';
import config from '@/../config';

const plugins = [];

if (config.ENV !== 'production') {
  plugins.push(createLogger());
}

export default plugins;

import { ServerStyleSheet } from 'styled-components';

function withWrapper(App) {
  this.sheet = new ServerStyleSheet();
  return this.sheet.collectStyles(App);
}

withWrapper.getMetaTags = function() {
  const styles = this.sheet.getStyleElement();
  return [styles];
};

export default withWrapper;

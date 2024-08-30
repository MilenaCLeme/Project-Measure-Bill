import { App } from './app';
import { PORT } from './secrets';

new App().server.listen(PORT)
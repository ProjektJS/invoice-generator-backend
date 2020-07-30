import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './http-server/Server';
import * as numeral from 'numeral';
import * as moment from 'moment';
import 'numeral/locales/pl';
import 'moment/locale/pl';

numeral.locale('pl');
moment.locale('pl');

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const platform = await PlatformExpress.bootstrap(Server);

    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();

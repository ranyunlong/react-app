import { I18n } from '../lib';
import { zh_CN } from './locales/zh_CN';
import { zh_HK } from './locales/zh_HK';
import { en_US } from './locales/en_US';
import { I18nLocale } from './locale';

export const i18n = new I18n<I18nLocale>();

i18n.defined('zh_CN', zh_CN);
i18n.defined('zh_HK', zh_HK);
i18n.defined('en_US', en_US);

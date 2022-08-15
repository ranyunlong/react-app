import { LocaleLanguageKey } from '@quick-toolkit/http';
import { Exception } from '../exceptions';

export class I18n<T extends {} = {}> {
  private _locales = new Map<LocaleLanguageKey, T>();

  /**
   * 定义语言
   * @param language
   * @param locale
   */
  public defined(language: LocaleLanguageKey, locale: T) {
    return this._locales.set(language, locale);
  }

  /**
   * 获取语言
   * @param language
   */
  public locale(language: LocaleLanguageKey): T {
    const locale = this._locales.get(language);
    if (!locale) {
      throw new Exception();
    }
    return locale;
  }

  /**
   * 已定义语言列表
   */
  public languages() {
    return Array.from(this._locales.keys());
  }
}

import translations from './zh_CN';

export default function translate(template: any, replacements: any) {
  replacements = replacements || {};

  // @ts-ignore
  // Translate
  template = translations[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, (_: any, key: any) => {
    return replacements[key] || '{' + key + '}';
  });
}

export const TranslateModule: any = {
  translate: ['value', translate],
};

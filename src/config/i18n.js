import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

requireAll(require.context('..', true, /i18n\.js$/));

export default i18n;

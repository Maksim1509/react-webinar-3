import useSelector from './use-selector';

/**
 * Хук для доступа к выбранному языку
 * @return {String}
 */
export default function useTranslate() {
  const lang = useSelector((state) => state.lang.lang);
  return lang;
}

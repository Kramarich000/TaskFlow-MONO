import { Russian } from 'flatpickr/dist/l10n/ru.js';

const baseOpts = {
  locale: Russian,
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'j F Y',
  allowInput: false,
};

export const optsFrom = { ...baseOpts };
export const optsTo = { ...baseOpts };
export const recentDaysOptions = [
  { id: 999999, name: 'За все время' },
  { id: 1, name: '1 день' },
  { id: 7, name: '7 дней' },
  { id: 30, name: '30 дней' },
  { id: 180, name: 'Полгода' },
  { id: 360, name: 'Год' },
];

export const sortOptions = [
  { id: 'title', name: 'Название' },
  { id: 'createdAt', name: 'Дата создания' },
  { id: 'updatedAt', name: 'Дата обновления' },
  { id: 'taskCount', name: 'Число задач' },
];

export const DEFAULT_DATE_FROM = null;
export const DEFAULT_DATE_TO = null;
export const DEFAULT_RECENT_DAYS = null;
export const DEFAULT_SORT_BY = null;
export const DEFAULT_SORT_ORDER = null;
export const DEFAULT_ONLY_FAV = false;

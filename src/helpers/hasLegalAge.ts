import moment from 'moment';

export const hasLegalAge = (date: string) => {
  return moment().diff(moment(date, 'DD-MM-YYYY'), 'years') >= 18;
};

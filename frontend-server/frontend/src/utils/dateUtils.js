import dayjs from 'dayjs';
import 'dayjs/locale/hr';

dayjs.locale('hr');

export const generateDateRange = (totalDays = 15, pastDays = 7) => {
    const start = dayjs().subtract(pastDays, 'day');
    return Array.from({ length: totalDays }, (_, i) => start.add(i, 'day'));
};

export const formatDateDDMMYYYY = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const formatMonthYear = (date) => {
    return dayjs(date).format('MMMM YYYY');
};

export const formatFullDate = (date) => {
    return dayjs(date).format('dddd, D. MMMM YYYY');
};


export const getDaysInMonth = (date) => {
    const startOfMonth = dayjs(date).startOf('month');
    const endOfMonth = dayjs(date).endOf('month');

    const daysInMonth = [];
    for (let day = startOfMonth; day.isBefore(endOfMonth, 'day'); day = day.add(1, 'day')) {
        daysInMonth.push(day);
    }
    return daysInMonth;
};

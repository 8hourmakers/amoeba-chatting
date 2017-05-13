import moment from 'moment';

class DateService {
    isSameOrBeforeFromToday(date) {
        const today = new Date();

        return moment(date).isSameOrBefore(today);
    }

    isBeforeFromToday(date) {
        const today = new Date();

        return moment(date).isBefore(today);
    }

    addFromToday(number, unit) {
        return moment().add(number, unit);
    }
}

export default DateService;

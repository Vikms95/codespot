export const getRelativeCurrentDate = dateToCompare => {
	const MS_PER_WEEK = 604800000;
	const MS_PER_DAY = 86400000;
	const MS_PER_HOUR = 3600000;
	const MS_PER_MINUTE = 60000;

	const formatter = new Intl.RelativeTimeFormat('en');

	const diff = new Date() - Date.parse(dateToCompare);

	switch (true) {
		case diff < MS_PER_MINUTE:
			return 'just now';
		case diff < MS_PER_HOUR:
			return formatter.format(Math.ceil(-diff / MS_PER_MINUTE), 'minutes');
		case diff < MS_PER_DAY:
			return formatter.format(Math.ceil(-diff / MS_PER_HOUR), 'hours');
		case diff < MS_PER_WEEK:
			return formatter.format(Math.ceil(-diff / MS_PER_DAY), 'days');
		case diff >= MS_PER_WEEK:
			return formatter.format(Math.ceil(-diff / MS_PER_WEEK), 'weeks');
	}
};

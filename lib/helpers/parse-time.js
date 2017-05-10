'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = parseTime;
var TIME_PARSE_MERIDIEM = new RegExp(/^(\d{1,2}?):(\d{2}?)\s?(am|pm)$/i);
var TIME_PARSE_24 = new RegExp(/^(\d{1,2}?):(\d{2}?)$/);

var defaultTime = {
	hour: 12,
	minute: 0,
	meridiem: 'pm'
};

// parse and normalize time to 12h format with meridiem
function parseTime(time) {
	time = time || defaultTime;

	var hour = void 0;
	var minute = void 0;
	var meridiem = 'am';

	if (typeof time === 'string') {
		var match = time.match(TIME_PARSE_MERIDIEM);
		if (match) {
			hour = parseInt(match[1], 10);
			minute = parseInt(match[2], 10);
			meridiem = match[3].toLowerCase();
		} else {
			match = time.match(TIME_PARSE_24);
			if (!match) {
				throw new Error('Could not parse time (string)');
			}
			hour = parseInt(match[1], 10);
			minute = parseInt(match[2], 10);

			var _handle = handle24(hour, meridiem);

			hour = _handle.hour;
			meridiem = _handle.meridiem;
		}
	} else if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) === 'object') {
		if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)) {
			throw new Error('Time and minute must both be valid integers');
		}
		hour = time.hour;
		minute = time.minute;
		meridiem = time.meridiem || meridiem;

		var _handle2 = handle24(hour, meridiem);

		hour = _handle2.hour;
		meridiem = _handle2.meridiem;
	}

	if (hour > 12 || minute > 60) {
		throw new Error('Time out of range');
	}
	if (hour === 0) {
		hour = 12;
	}

	return {
		hour: hour,
		minute: minute,
		meridiem: meridiem
	};
}

function handle24(hour, meridiem) {
	if (hour > 24) {
		throw new Error('Hour out of range (> 24)');
	}

	if (hour > 12) {
		hour = hour % 12;
		meridiem = 'pm';
	}
	return { hour: hour, meridiem: meridiem };
}
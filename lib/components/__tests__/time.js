'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Time = require('../Time');

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOUR_SELECT_BUTTON = '.react-timekeeper__hour-select';
var MINUTE_SELECT_BUTTON = '.react-timekeeper__minute-select';
var MERIDIEM_TOGGLE = '.react-timekeeper__meridiem-toggle';

jest.mock('../TimeDropdown', function () {
	return function (props) {
		return _react2.default.createElement('div', { className: 'time-dropdown-' + props.type });
	};
});

describe('Time component', function () {
	var changeUnit = jest.fn();

	describe('current unit is hour', function () {
		var unit = 'hour';
		var timeRendered = (0, _enzyme.mount)(_react2.default.createElement(_Time.Time, {
			config: {},
			unit: unit,
			changeUnit: changeUnit
			// props to suppress proptypes warnings
			, meridiem: 'am',
			changeMeridiem: jest.fn()
		}));

		test('minute is selected', function () {
			timeRendered.find(MINUTE_SELECT_BUTTON).simulate('click');
			expect(changeUnit).lastCalledWith('minute');
		});

		// should open TimeDropdown
		test('hour is selected', function () {
			timeRendered.find(HOUR_SELECT_BUTTON).simulate('click');
			expect(timeRendered.find('.time-dropdown-' + unit).length).toEqual(1);
		});
	});

	describe('current unit is minute', function () {
		var unit = 'minute';
		var timeRendered = (0, _enzyme.mount)(_react2.default.createElement(_Time.Time, {
			config: {},
			unit: unit,
			changeUnit: changeUnit
			// props to suppress proptypes warnings
			, meridiem: 'am',
			changeMeridiem: jest.fn()
		}));

		test('hour is selected', function () {
			timeRendered.find(HOUR_SELECT_BUTTON).simulate('click');
			expect(changeUnit).lastCalledWith('hour');
		});

		// should open TimeDropdown
		test('minute is selected', function () {
			timeRendered.find(MINUTE_SELECT_BUTTON).simulate('click');
			expect(timeRendered.find('.time-dropdown-' + unit).length).toEqual(1);
		});
	});

	test('change meridiem', function () {
		var changeMeridiem = jest.fn();
		var timeRendered = (0, _enzyme.shallow)(_react2.default.createElement(_Time.Time, {
			config: {},
			meridiem: 'am',
			changeMeridiem: changeMeridiem
			// props to suppress proptypes warnings
			, unit: 'hour',
			changeUnit: jest.fn()
		}));
		timeRendered.find(MERIDIEM_TOGGLE).simulate('click');
		expect(changeMeridiem).lastCalledWith('pm');

		timeRendered = (0, _enzyme.shallow)(_react2.default.createElement(_Time.Time, {
			config: {},
			meridiem: 'pm',
			changeMeridiem: changeMeridiem
			// props to suppress proptypes warnings
			, unit: 'hour',
			changeUnit: jest.fn()
		}));
		timeRendered.find(MERIDIEM_TOGGLE).simulate('click');
		expect(changeMeridiem).lastCalledWith('am');
	});

	test('should render correctly', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Time.Time, {
			config: {},
			meridiem: 'pm',
			changeMeridiem: jest.fn(),
			unit: 'hour',
			changeUnit: jest.fn()
		})).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ClockWrapper = require('../ClockWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClockWrapper component', function () {
	var hour = 12;
	var minute = 30;
	var unit = 'hour';

	var changeHour = jest.fn();
	var changeMinute = jest.fn();
	var changeMeridiem = jest.fn();

	test('renders correctly', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ClockWrapper.ClockWrapper, {
			config: {},
			unit: unit,
			hour: hour,
			minute: minute,
			meridiem: 'pm',
			changeHour: changeHour,
			changeMinute: changeMinute,
			changeMeridiem: changeMeridiem
		})).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('triggers change meridiem', function () {
		var rendered = (0, _enzyme.shallow)(_react2.default.createElement(_ClockWrapper.ClockWrapper, {
			config: {},
			unit: unit,
			hour: hour,
			minute: minute,
			meridiem: 'pm',
			changeHour: changeHour,
			changeMinute: changeMinute,
			changeMeridiem: changeMeridiem
		}));
		rendered.find('button.type_am').simulate('click');
		expect(changeMeridiem).lastCalledWith('am');

		rendered.find('button.type_pm').simulate('click');
		expect(changeMeridiem).lastCalledWith('pm');
	});
});
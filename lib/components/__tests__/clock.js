'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Clock = require('../Clock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Clock component', function () {
	var hour = 4;
	var minute = 42;

	var changeHour = jest.fn();
	var changeMinute = jest.fn();

	describe('renders correctly', function () {
		test('when unit is hour', function () {
			var unit = 'hour';
			var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Clock.Clock, {
				config: {},
				unit: unit,
				hour: hour,
				minute: minute,
				changeHour: changeHour,
				changeMinute: changeMinute
			})).toJSON();
			expect(tree).toMatchSnapshot();
		});
		test('when unit is minute', function () {
			var unit = 'minute';
			var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Clock.Clock, {
				config: {},
				unit: unit,
				hour: hour,
				minute: minute,
				changeHour: changeHour,
				changeMinute: changeMinute
			})).toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});
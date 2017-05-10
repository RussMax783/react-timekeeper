'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Timepicker = require('../Timepicker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Timepicker component', function () {
	describe('renders correctly', function () {

		test('with no time', function () {
			var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Timepicker.Timepicker, null)).toJSON();
			expect(tree).toMatchSnapshot();
		});

		test('with time passed in', function () {
			var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Timepicker.Timepicker, {
				time: '6:42'
			})).toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});
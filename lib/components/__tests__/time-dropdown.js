'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _TimeDropdown = require('../TimeDropdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = Array.apply(null, { length: 5 }).map(function (a, i) {
	return (i + 1).toString();
});

describe('TimeDropdown component', function () {
	var closeFn = jest.fn();
	var updateValFn = jest.fn();

	test('renders correctly', function () {
		var val = 3;
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_TimeDropdown.TimeDropdown, {
			config: {},
			val: val,
			options: [1, 2, 3, 4, 5].map(function (v) {
				return v.toString();
			}),
			close: closeFn,
			updateVal: updateValFn
		}), {
			createNodeMock: function createNodeMock(el) {
				if (el.type === 'div') {
					// allow for setting scrollTop in `componentDidMount` method
					// otherwise throws error: `Can't add property scrollTop, object is not extensible`
					return Object.assign({}, el, { scrollTop: '' });
				}
				return el;
			}
		}).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('triggers close and updateVal on selecting option', function () {
		var indexToSelect = 2;
		var rendered = (0, _enzyme.shallow)(_react2.default.createElement(_TimeDropdown.TimeDropdown, {
			config: {},
			val: 4,
			options: OPTIONS,
			close: closeFn,
			updateVal: updateValFn
		}));
		rendered.find('ul').childAt(indexToSelect).simulate('click');
		expect(closeFn.mock.calls.length).toBe(1);
		expect(updateValFn.mock.calls.length).toBe(1);
		expect(updateValFn).lastCalledWith((indexToSelect + 1).toString());
	});
});
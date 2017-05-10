'use strict';

var _parseTime = require('../parse-time');

var _parseTime2 = _interopRequireDefault(_parseTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('helpers/parse-time', function () {
	describe('pass string', function () {
		test('parses 12 hour format', function () {
			expect((0, _parseTime2.default)('8:32 am')).toMatchObject({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)('12:32 am')).toMatchObject({
				hour: 12,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)('12:32 pm')).toMatchObject({
				hour: 12,
				minute: 32,
				meridiem: 'pm'
			});

			expect((0, _parseTime2.default)('8:32am')).toMatchObject({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)('12:32pm')).toMatchObject({
				hour: 12,
				minute: 32,
				meridiem: 'pm'
			});

			expect((0, _parseTime2.default)('0:32pm')).toMatchObject({
				hour: 12,
				minute: 32,
				meridiem: 'pm'
			});
		});

		test('parses 24 hour format', function () {
			expect((0, _parseTime2.default)('8:32')).toMatchObject({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)('18:30')).toMatchObject({
				hour: 6,
				minute: 30,
				meridiem: 'pm'
			});

			expect((0, _parseTime2.default)('0:30')).toMatchObject({
				hour: 12,
				minute: 30,
				meridiem: 'am'
			});
		});

		test('handles invalid time', function () {
			expect(function () {
				return (0, _parseTime2.default)('25:70 am');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('13:10 am');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('8:70 am');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('8:20 zz');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('25:50');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('12:70');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('25:70');
			}).toThrow();
			expect(function () {
				return (0, _parseTime2.default)('random string');
			}).toThrow();
		});
	});

	describe('pass object', function () {
		test('parses time object with no meridiem', function () {
			expect((0, _parseTime2.default)({
				hour: 12,
				minute: 32
			})).toMatchObject({
				hour: 12,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)({
				hour: 14,
				minute: 32
			})).toMatchObject({
				hour: 2,
				minute: 32,
				meridiem: 'pm'
			});
		});

		test('parses time object with a meridiem', function () {
			expect((0, _parseTime2.default)({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			})).toMatchObject({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			});

			expect((0, _parseTime2.default)({
				hour: 2,
				minute: 32,
				meridiem: 'pm'
			})).toMatchObject({
				hour: 2,
				minute: 32,
				meridiem: 'pm'
			});
		});

		test('handles invalid time', function () {
			expect(function () {
				return (0, _parseTime2.default)({
					hour: 26,
					minute: 32
				});
			}).toThrow();

			expect(function () {
				return (0, _parseTime2.default)({
					hour: 12,
					minute: 70
				});
			}).toThrow();

			expect(function () {
				return (0, _parseTime2.default)({
					hour: 26,
					minute: 70
				});
			}).toThrow();

			expect(function () {
				return (0, _parseTime2.default)({
					someKey: 26,
					anotherKey: 70
				});
			}).toThrow();
		});

		test('handles empty time argument', function () {
			var defaultTime = {
				hour: 12,
				minute: 0,
				meridiem: 'pm'
			};

			expect((0, _parseTime2.default)()).toMatchObject(defaultTime);
			expect((0, _parseTime2.default)(null)).toMatchObject(defaultTime);
		});
	});
});
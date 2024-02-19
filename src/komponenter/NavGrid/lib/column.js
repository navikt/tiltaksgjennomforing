'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                  enumerable: true,
                  get: function () {
                      return m[k];
                  },
              });
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
        return t;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const PT = __importStar(require('prop-types'));
const React = __importStar(require('react'));
const classnames_1 = __importDefault(require('classnames'));
require('navGrid');
const cls = (className, xs, sm, md, lg) =>
    (0, classnames_1.default)('col', className, {
        [`col-xs-${xs}`]: !!xs,
        [`col-sm-${sm}`]: !!sm,
        [`col-md-${md}`]: !!md,
        [`col-lg-${lg}`]: !!lg,
    });
class Column extends React.Component {
    render() {
        const _a = this.props,
            { children, className, xs, sm, md, lg } = _a,
            props = __rest(_a, ['children', 'className', 'xs', 'sm', 'md', 'lg']);
        return React.createElement(
            'div',
            Object.assign({ className: cls(className, xs, sm, md, lg) }, props),
            children,
        );
    }
}
Column.defaultProps = {
    className: undefined,
    children: undefined,
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
};
Column.propTypes = {
    className: PT.string,
    xs: PT.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    sm: PT.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    md: PT.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    lg: PT.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
};
exports.default = Column;

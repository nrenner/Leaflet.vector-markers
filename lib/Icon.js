'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconOptions = {

  shadowUrl: 'dist/images/marker-shadow.png',
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  className: 'vector-marker',
  prefix: 'fa',
  spinClass: 'fa-spin',
  extraIconClasses: '',
  extraDivClasses: '',
  icon: 'home',
  // original Leaflet marker "middle" color (avarage HSL values between gradient stops)
  markerColor: '#338ACC',
  iconColor: 'white',
  viewBox: '0 0 32 52'
};

var mapPin = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z';

var Icon = function (_Leaflet$Icon) {
  _inherits(Icon, _Leaflet$Icon);

  function Icon(options) {
    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, options));

    _leaflet2.default.Util.setOptions(_this, iconOptions);
    _leaflet2.default.Util.setOptions(_this, options);
    return _this;
  }

  _createClass(Icon, [{
    key: 'createIcon',
    value: function createIcon(oldIcon) {
      var div = oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div');
      var options = this.options;
      var pin_path = options.map_pin || mapPin;

      div.innerHTML = '<svg width="' + options.iconSize[0] + 'px" height="' + options.iconSize[1] + 'px" viewBox="' + options.viewBox + '" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="' + pin_path + '" fill="' + options.markerColor + '"></path></svg>';

      if (options.icon) {
        div.appendChild(this._createInner());
      }

      options.className += options.className.length > 0 ? ' ' + options.extraDivClasses : options.extraDivClasses;
      this._setIconStyles(div, 'icon');
      this._setIconStyles(div, 'icon-' + options.markerColor);
      return div;
    }
  }, {
    key: '_createInner',
    value: function _createInner() {
      var i = document.createElement('i');
      var options = this.options;

      i.classList.add(options.prefix);
      if (options.extraClasses) {
        i.classList.add(options.extraClasses);
      }
      if (options.prefix) {
        i.classList.add(options.prefix + '-' + options.icon);
      } else {
        i.classList.add(options.icon);
      }
      if (options.spin && typeof options.spinClass === 'string') {
        i.classList.add(options.spinClass);
      }
      if (options.iconColor) {
        if (options.iconColor === 'white' || options.iconColor === 'black') {
          i.classList.add('icon-' + options.iconColor);
        } else {
          i.style.color = options.iconColor;
        }
      }
      if (options.iconSize) {
        i.style.width = options.iconSize[0] + 'px';
      }
      return i;
    }
  }, {
    key: '_setIconStyles',
    value: function _setIconStyles(img, name) {
      var options = this.options;
      var size = _leaflet2.default.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']);
      var anchor = void 0;

      if (name === 'shadow') {
        anchor = _leaflet2.default.point(options.shadowAnchor || options.iconAnchor);
      } else {
        anchor = _leaflet2.default.point(options.iconAnchor);
      }
      if (!anchor && size) {
        anchor = size.divideBy(2, true);
      }
      img.className = 'vector-marker-' + name + ' ' + options.className;
      if (anchor) {
        img.style.marginLeft = -anchor.x + 'px';
        img.style.marginTop = -anchor.y + 'px';
      }
      if (size) {
        img.style.width = size.x + 'px';
        img.style.height = size.y + 'px';
      }
    }
  }]);

  return Icon;
}(_leaflet2.default.Icon);

exports.default = Icon;
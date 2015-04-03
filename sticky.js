/**
 * Sticky.js v1.0.0
 * https://github.com/ustmaestro/sticky.js
 * MIT licensed
 *
 * Copyright (C) 2015 ustmaestro - A weekend project by Catirau Mihai (@ustmaestro)
 */

(function (root, factory) {
	if (typeof exports === 'object') {
		factory(exports);
	} else if (typeof define === 'function' && define.amd) {
		define(['exports'], factory);
	} else {
		factory(root);
	}
} (this, function (exports) {

	var VERSION = '1.0.0';
	
	/**
	* StickyJs main class
	*
	* @class StickyJs
	*/
	function StickyJs(obj) {
		this._targetElement = obj;
		this._options = {
			className: 'stickyJsElement',
			staticClassName: 'sticky-fix',
			fixedClassName: 'sticky-fix',
			absoluteClassName: 'sticky-abs',
			topMargin: 0,
			bottomMargin: 0,
			relativeElement: 'body'
		};
	}
	
	/**
	* Initiate a new sticky element in the page
	*
	* @api private
	* @method _styckyElement
	* @param {Object} targetElement
	* @returns {Boolean} Success or not?
	*/
	function _stickyElement(targetElement) {
		var self = this;
		
		var _elementOffset,			
			relativeElement,
			_relativeOffset,			
			className,
			staticClassName,
			fixedClassName,
			absoluteClassName,
			topMargin,
			bottomMargin;	
		
		var	currentClass = targetElement.className;
		
		var	_inlineOptions = {
				className: targetElement.getAttribute('data-className'),
				staticClassName: targetElement.getAttribute('data-fixedClassName'),
				fixedClassName: targetElement.getAttribute('data-fixedClassName'),
				absoluteClassName: targetElement.getAttribute('data-absoluteClassName'),
				topMargin: targetElement.getAttribute('data-topMargin'),
				bottomMargin: targetElement.getAttribute('data-bottomMargin')
			};
			
		// cheking inline settings	
		if (typeof (_inlineOptions.className) === 'string') {
			className = (currentClass + ' ' + _inlineOptions.className);
		} else {
			className = (currentClass + ' ' + this._options.className);
		}
		
		if (typeof (_inlineOptions.staticClassName) === 'string') {
			staticClassName = _inlineOptions.staticClassName;
		} else {
			staticClassName = this._options.staticClassName;
		}
		
		if (typeof (_inlineOptions.fixedClassName) === 'string') {
			fixedClassName = _inlineOptions.fixedClassName;
		} else {
			fixedClassName = this._options.fixedClassName;
		}
		
		if (typeof (_inlineOptions.absoluteClassName) === 'string') {
			absoluteClassName = _inlineOptions.absoluteClassName;
		} else {
			absoluteClassName = this._options.absoluteClassName;
		}
		
		if (typeof (_inlineOptions.topMargin) === 'number') {
			topMargin = _inlineOptions.topMargin;
		} else {
			topMargin = this._options.topMargin;
		}
		
		if (typeof (_inlineOptions.bottomMargin) === 'number') {
			bottomMargin = _inlineOptions.bottomMargin;
		} else {
			bottomMargin = this._options.bottomMargin;
		}

		relativeElement = document.querySelector(this._options.relativeElement);
		
		if (!relativeElement) {
			throw new Error('There is no element with given selector.');
		}
		
		
		// get offsets
		_elementOffset = _getOffset(targetElement);
				
		
		//Add a space to container (fix for floating containers)
		var _placeholder = document.createElement('div');
			_placeholder.style.width = _elementOffset.width + 'px';
			_placeholder.style.height = '1px';
		targetElement.parentNode.insertBefore(_placeholder, targetElement.nextSibling);
		
		// initial position
		_stickyScroll(targetElement,_elementOffset,relativeElement,className,staticClassName,fixedClassName,absoluteClassName,topMargin,bottomMargin);
		// binding scroll event
		window.onscroll = function (e) {
			_stickyScroll(targetElement,_elementOffset,relativeElement,className,staticClassName,fixedClassName,absoluteClassName,topMargin,bottomMargin);
		}
	}
	
	
	function _stickyScroll(targetElement,_elementOffset,relativeElement,className,staticClassNam,fixedClassName,absoluteClassName,topMargin,bottomMargin){
		var _targetRect = targetElement.getBoundingClientRect();
		_relativeOffset = _getOffset(relativeElement);		
		targetElement.style.width = _elementOffset.width + 'px';
		if((window.scrollY + topMargin) > _elementOffset.top){			
			if((window.scrollY + topMargin + _elementOffset.height) > (_relativeOffset.bottom - bottomMargin)){
				targetElement.className = (className + ' ' + absoluteClassName);
				targetElement.style.position = 'absolute';				
				targetElement.style.top = (_relativeOffset.bottom  - bottomMargin - _elementOffset.height) + 'px';
					
			console.log(_relativeOffset.height,_relativeOffset.top,_relativeOffset.bottom, bottomMargin,_elementOffset.height,targetElement.style.top);
			console.log(targetElement.style.top);
			} else {			
				targetElement.className = (className + ' ' + fixedClassName);
				targetElement.style.position = 'fixed';				
				targetElement.style.top = topMargin + 'px';	
			}			
		} else {
			targetElement.className = className;
			targetElement.style.position = 'static';	
			targetElement.style.top = '0';
		}		
	}
	
	/**
	* Get an element position on the page
	* Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
	*
	* @api private
	* @method _getOffset
	* @param {Object} element
	* @returns Element's position info
	*/
	function _getOffset(element) {
		var elementPosition = {};
		elementPosition.width = element.offsetWidth;
		elementPosition.height = element.offsetHeight;
		var _x = 0;
		var _y = 0;
		while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
		  _x += element.offsetLeft;
		  _y += element.offsetTop;
		  element = element.offsetParent;
		}
		elementPosition.top = _y;
		elementPosition.left = _x;
		elementPosition.bottom = elementPosition.top + elementPosition.height;
		elementPosition.right = elementPosition.left + elementPosition.width;
		return elementPosition;
	}

	/**
	* Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
	* via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
	*
	* @param obj1
	* @param obj2
	* @returns obj3 a new object based on obj1 and obj2
	*/
	function _mergeOptions(obj1,obj2) {
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}

	var stickyJs = function (targetElm) {
		if (typeof (targetElm) === 'object') {
			return new StickyJs(targetElm);
		} else if (typeof (targetElm) === 'string') {
			var targetElement = document.querySelector(targetElm);
			if (targetElement) {
				return new StickyJs(targetElement);
			} else {
				throw new Error('There is no element with given selector.');
			}
		} else {
			return new StickyJs(document.body);
		}
	};

	/**
	* Current StickyJs version
	*
	* @property version
	* @type String
	*/
	stickyJs.version = VERSION;

	//Prototype
	stickyJs.fn = StickyJs.prototype = {
		clone: function () {
			return new StickyJs(this);
		},
		setOption: function(option, value) {
			this._options[option] = value;
			return this;
		},
		setOptions: function(options) {
			this._options = _mergeOptions(this._options, options);
			return this;
		},
		start: function () {
			_stickyElement.call(this, this._targetElement);
			return this;
		},
		onstart: function(providedCallback) {
			if (typeof (providedCallback) === 'function') {
				this._introStartCallback = providedCallback;
			} else {
				throw new Error('Provided callback for onstart was not a function');
			}
			return this;
		},
		onexit: function(providedCallback) {
			if (typeof (providedCallback) === 'function') {
				this._introCallback = providedCallback;
			} else {
				throw new Error('Provided callback for onexit was not a function.');
			}
			return this;
		}
	};

	exports.stickyJs = stickyJs;
	return stickyJs;

}));
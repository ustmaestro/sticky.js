# sticky.js

StickyJS is a small and powerfull javascript plugin for easy create sticky elements. No other libraries is needed. Support IE8+.

	stickyJs('.sticky-widget').setOptions({relativeElement: '.content', topMargin: 46}).start();

Options:

	{
		className: 'stickyJsElement',    // sticky element extra class name
		staticClassName: 'sticky-fix',   // static sticky element  extra class name
		fixedClassName: 'sticky-fix',    // fixed sticky element  extra class name
		absoluteClassName: 'sticky-abs', // absolute sticky element  extra class name
		topMargin: 0,                    // margin top  if you have fixed top bar
		bottomMargin: 0,                 // margin bottom if you want 
		relativeElement: 'body'          // sticky relative element class name, id or element
	}
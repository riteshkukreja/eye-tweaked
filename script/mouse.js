
    var mousePos,
    	eye_pos_x = 560,
    	eye_pos_y = 260,
    	eye_width = 100,
    	eye_height = 100,
    	iris_width = 30,
    	iris_height = 30,
    	skew_max_x = 15,
    	skew_max_y = 2,
    	skew_min_x = 5,
    	skew_min_y = -10,
    	eye, iris, css_rule;

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

    function moveEye(x, y) {
    	var x_pos = x - eye_pos_x - eye_width,
    		y_pos = y - eye_pos_y - eye_height;

    	if(x_pos > eye_width) x_pos = eye_width - (iris_width);
    	if(y_pos > eye_height) y_pos = eye_height - (iris_height);
    	if(x_pos < -eye_width) x_pos = -eye_width + (iris_width);
    	if(y_pos < -eye_height) y_pos = -eye_height + (iris_height);

    	var x_skew, y_skew, scale = 0.98;

    	x_skew = Math.abs(x_pos / eye_width) * (skew_max_x - skew_min_x);
    	y_skew = Math.abs(y_pos / eye_height) * (skew_max_y - skew_min_y) ;

    	if((x_pos < 0 && y_pos < 0) || (x_pos > 0 && y_pos > 0)) {
    		x_skew = x_skew;
    		y_skew = -y_skew;
    		scale = 0.9;
    	}

    	iris.style.setProperty('transform', 'translateX(' + x_pos + 'px) translateY(' + y_pos + 'px) skewX(' + x_skew + 'deg) skewY(' + y_skew +'deg) scale(' + scale + ')');
    }


    window.onload = function() {
    	iris = document.getElementsByClassName("iris")[0];
    	eye = document.getElementsByClassName("stage")[0];

        mousePos = {
            x: eye_pos_x + eye_width,
            y: eye_pos_y + eye_height
        };

    	document.addEventListener('mousemove', handleMouseMove);

	    setInterval(function() {
            moveEye(mousePos.x, mousePos.y);
        }, 100); // setInterval repeats every X ms

    }
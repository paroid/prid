/* prid - grid mask plugin
 * by paroid
 */
(function($){
	$.fn.prid = function(options) {
		var defaults = { 
            rows:3,
            cols:3,
            lineWidth:2,
            lineStyle:'solid',
            lineColor:'#fff',
            borderRadius:0
	  	};
	 	var opts = $.extend(defaults, options);

        function copyCss(src,des,properties){
            if(properties==null)
                properties=new Array('position','float','width','height','left','top','right','bottom','margin','margin-left','margin-top','margin-right','margin-bottom');
            var n=properties.length;
            for(var i=0;i<n;++i){
                var val=src.css(properties[i]);
                if(val.length>0)
                    des.css(properties[i],val);
            }
        }

		return this.each(function(){
			var orgElem = $(this);
			var orgWidth = parseInt(orgElem.outerWidth());
			var orgHeight = parseInt(orgElem.outerHeight());
            //outerWrap
            var outerWrapDiv=$('<div class="pridWrap"></div>');
            copyCss(orgElem,outerWrapDiv); 
            outerWrapDiv.css({'display':'block','position':'relative'});
            orgElem.wrap(outerWrapDiv);
            orgElem.css({'position':'absolute','top':'0','left':'0','margin':'0'});
            //maskBox
            var maskBox=$('<div class="pridBox"></div>');
            maskBox.css({'position':'absolute','top':'0','left':'0','width':orgWidth+'px','height':orgHeight+'px'});
            //grid
            var grid=$('<div class="pridGrid"></div>');
            var gridWidth=Math.floor(orgWidth/opts.cols-opts.lineWidth);
            var gridHeight=Math.floor(orgHeight/opts.rows-opts.lineWidth);
			var halfWidth=opts.lineWidth/2;
			if(opts.lineWidth&1) //even width: border halfWidth
	            grid.css({'float':'left','background':'transparent','width':gridWidth+'px','height':gridHeight+'px','border-top':halfWidth+'px '+opts.lineStyle+' '+opts.lineColor,'border-left':halfWidth+'px '+opts.lineStyle+' '+opts.lineColor,'border-right':(halfWidth+1)+'px '+opts.lineStyle+' '+opts.lineColor,'border-bottom':(halfWidth+1)+'px '+opts.lineStyle+' '+opts.lineColor,'border-radius':opts.borderRadius+'px'}); 
			else //odd width :border  halfWidth,halfWidth+1
	            grid.css({'float':'left','background':'transparent','width':gridWidth+'px','height':gridHeight+'px','border':halfWidth+'px '+opts.lineStyle+' '+opts.lineColor,'border-radius':opts.borderRadius+'px'}); 
			var rowRem=orgHeight%opts.rows;
			var colRem=orgWidth%opts.cols;
			var gridR=null;
			var gridC=null;
			var gridRC=null;
			// seamless dividing
			if(rowRem){
				gridR=grid.clone();
				gridR.css({'height':(gridHeight+1)+'px'});
			}
			if(colRem){
				gridC=grid.clone();
				gridC.css({'width':(gridWidth+1)+'px'});
			}
			if(rowRem && colRem){
				gridRC=grid.clone();
				gridRC.css({'width':(gridWidth+1)+'px','height':(gridHeight+1)+'px'});
			}
			for( var i=0;i<opts.rows;++i)
				for(var j=0;j<opts.cols;++j){
					if(i<rowRem){
						if(j<colRem)//top-left
							gridRC.clone().appendTo(maskBox);
						else	//top-right
							gridR.clone().appendTo(maskBox);
					}
					else if(j<colRem) //bottom-left
							gridC.clone().appendTo(maskBox);
						else	//bottom-right
							grid.clone().appendTo(maskBox);
				}
            orgElem.after(maskBox);
		});
	}
})(jQuery);  	


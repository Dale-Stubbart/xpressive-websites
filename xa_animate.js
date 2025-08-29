// call XA_ANIMATE_INIT in the <head> section
function xa_animate_init(){
//*** use styles rather than classnames, it will make it easier to understand/maintain and can get rid of xa_animate.css
//                         1                            8                               1
xa_animate_version_major = 1;xa_animate_version_minor = 8;xa_animate_version_revision = 1;
xa_animate_version=xa_animate_version_major.toString()+'.'+xa_animate_version_minor.toString()+'.'+xa_animate_version_revision.toString();
xa_animate_size='<50KB';xa_animate_size='<1000'
}
//**************************************************************************************************************
// call XA_CARD_INIT in the <head> section
function xa_card_init(){
/*
xa_card_type = business/playing
	Playing cards have rounded corners, business cards do not. 
	Playing cards are vertical (portrait), business cards are horizontal (landscape)
xa_card_background_color - card background color in any html/css color notation
*/
xa_card_type='business'
xa_card_title_lines=0
xa_card_background_color=''
//tried to add border for back of card, but text extended outside of it
//xa_card_border_back is changed to false in xa_card_build_back, no matter what calling program has changed it to
//xa_card_border_back and xa_card_border_back_color should not be set by calling program. If they are set, they will have no effect
xa_card_border_back=false
xa_card_border_back_color='black'
}
// call XA_CARD_SIZE_INIT in the <head> section
function xa_card_size_init(){
/*
xa_card_size = array width_height style, width, height
*/
var card_width_height, card_width, card_height, max_card_width_height;
// business cards are 3.5"x2"
// playing cards are 2"x3.5"
// greeting cards are 4.5"x5.5"
if (xa_card_type=='business'){
	card_width=300;card_height=171
}
if (xa_card_type=='playing'){
	card_width=171;card_height=300
}
if (xa_card_type=='greeting_vertical'){
	card_width=363;card_height=471
}
if (xa_card_type=='greeting_horizontal'){
	card_width=471;card_height=363
}
card_width_height='width:'+card_width+'px;height:'+card_height+'px;'
max_card_width_height='max-width:'+card_width+'px;max-height:'+card_height+'px;'
xa_card_size=[card_width_height,card_width,card_height,max_card_width_height]
}
//**************************************************************************************************************
// $ROTATE$
// call XA_CARD_ROTATE_INIT in the <head> section
function xa_card_rotate_init(){
xa_card_method='rotate'
// these can be overridden at the top of the page and/or before calling xa_rotate_card for each card
/*
xa_card_rotate_event - click/hover
xa_card_rotate_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_rotate_type is an array [type, direction]
	type=standard, magic, dancer, degrees 
		degrees for other axis will be calculated as 360*-remainder(degrees/360). 
	direction is x,y. Typically x for x-axis for business cards, y for playing cards. y for magic.
*/
xa_card_rotate_event='click';
xa_card_rotate_speed='normal';
if (xa_card_type=='business' || xa_card_type=='greeting_horizontal'){xa_card_rotate_type=['standard','x'];}
if (xa_card_type=='playing' || xa_card_type=='greeting_vertical'){xa_card_rotate_type=['standard','y'];}
}
// call XA_CARD_ROTATE_DEGREES_INIT in the <head> section
function xa_card_rotate_degrees_init(){
/*
xa_card_rotate_degrees - array [rotater/front, back]
*/
var deg_front, deg_back;
//alert(xa_card_rotate_type)
if (xa_card_rotate_type[0]=='standard' || xa_card_rotate_type[0]=='magic' || xa_card_rotate_type[0]=='dancer' || xa_card_rotate_type[0]=='switch'){} 
else {
	deg_front=xa_card_rotate_type[0];deg_back=360-(deg_front%360); //% is modulus
	xa_card_rotate_degrees=[deg_front,deg_back];
}
if (xa_card_rotate_type[0]=='standard'){xa_card_rotate_degrees=[180,180]}
if (xa_card_rotate_type[0]=='magic'){xa_card_rotate_degrees=[260,100]}
if (xa_card_rotate_type[0]=='magic2'){xa_card_rotate_degrees=[520,200]}
if (xa_card_rotate_type[0]=='dancer'){xa_card_rotate_degrees=[900,180]}
if (xa_card_rotate_type[0]=='switch'){xa_card_rotate_degrees=[-180,180]}
}
//XA_CARD_ROTATE_BUILD will build a card
function xa_card_rotate_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var a, x;
var card_side, card_container_id, card_rotater_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_rotater_id=xa_el+'_rotater'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_rotate_rotate('+"'"+card_rotater_id+"'"+')"'
var mouseout='onmouseout="xa_card_rotate_rotate('+"'"+card_rotater_id+"'"+')"'
var mouseclick='onclick="xa_card_rotate_rotate('+"'"+card_rotater_id+"'"+')"'
//var mouseleave='onmouseleave="xa_card_rotate_rotate('+"'"+card_rotater_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]
a+='" '
if (xa_card_rotate_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE - could have used data- attritubute with getattribute, setattribute, but keeping it simple and stratightforward. Would have called attribute data-side
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//ROTATER
x=xa_card_build_event(card_rotater_id,xa_card_rotate_type,xa_card_rotate_speed);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;

a+='</div>' // end card_rotater
a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//XA_CARD_ROTATE_ROTATE does the actual rotating of a card
//xa_card_rotate_rotate is executed when the user hovers over or clicks on a card
function xa_card_rotate_rotate(card_rotater_id){
// 	alert(card_rotater_id);
var mytransform; 
var card_side_id, card_side, card_back_id; 
card_side_id=card_rotater_id.substr(0,card_rotater_id.length-7)+'side'
card_back_id=card_rotater_id.substr(0,card_rotater_id.length-7)+'back'
//alert(card_side_id)
card_side = document.getElementById(card_side_id).innerHTML;
//alert(card_side)
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
mytransform='rotate'+xa_card_rotate_type[1].toUpperCase()+'('
if (card_side=='front'){mytransform+=xa_card_rotate_degrees[0]}
else{mytransform+='0'}
mytransform+='deg)'
if (xa_card_rotate_type[0]=='switch' && card_side=='front'){mytransform+=' translate(-100%)'}
//	alert(card_rotater_id)
//	alert(mytransform)
document.getElementById(card_rotater_id).style.transform=mytransform;
}
//**************************************************************************************************************
// $SCROLL$
// call XA_CARD_SCROLL_INIT in the <head> section
function xa_card_scroll_init(){
xa_card_method='scroll'
xa_card_scroll_event='click';
xa_card_scroll_speed='normal';
/*
xa_card_scroll_event - click/hover
xa_card_scroll_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_scroll_type is an array [type, direction]
	type=standard, superhero, timing-function
	direction is left, down. Typically left for business cards, up for playing cards. up for superhero.
*/
if (xa_card_type=='business' || xa_card_type=='greeting_horizontal'){xa_card_scroll_type=['standard','left'];}
else {xa_card_scroll_type=['standard','up'];}
}
// call XA_CARD_SCROLL_PERCENT_INIT in the <head> section
function xa_card_scroll_percent_init(){
/* xa_card_scroll_percent - array(x,y) */
if (xa_card_scroll_type[1]=='left'){xa_card_scroll_percent=[-100,0];}
if (xa_card_scroll_type[1]=='right'){xa_card_scroll_percent=[100,0];}
if (xa_card_scroll_type[1]=='up'){xa_card_scroll_percent=[0,-100];}
if (xa_card_scroll_type[1]=='down'){xa_card_scroll_percent=[0,100];}
}
//XA_CARD_SCROLL_BUILD will build a card
function xa_card_scroll_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var a, x;
var card_side, card_container_id, card_scroller_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_scroller_id=xa_el+'_scroller'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_scroll_scroll('+"'"+card_scroller_id+"'"+')"'
var mouseout='onmouseout="xa_card_scroll_scroll('+"'"+card_scroller_id+"'"+')"'
var mouseclick='onclick="xa_card_scroll_scroll('+"'"+card_scroller_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="position:relative;margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]
a+='" '
if (xa_card_scroll_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//SCROLLER
x=xa_card_build_event(card_scroller_id,xa_card_scroll_type,xa_card_scroll_speed);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;

a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//XA_CARD_SCROLL_SCROLL does the actual scrolling of a card
//xa_card_scroll_scroll is executed when the user hovers over or clicks on a card
function xa_card_scroll_scroll(card_scroller_id){
var mytransform; 
var card_side_id, card_side, card_back_id; 
card_side_id=card_scroller_id.substr(0,card_scroller_id.length-8)+'side'
card_side = document.getElementById(card_side_id).innerHTML;
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
mytransform='translate'
mytransform+='(';
if (card_side=='front'){mytransform+=xa_card_scroll_percent[0]+'%,'+xa_card_scroll_percent[1]+'%'}
else{mytransform+='0%,0%'}
mytransform+=')'
document.getElementById(card_scroller_id).style.transform=mytransform;
}
//**************************************************************************************************************
// $FADE$
// call XA_CARD_FADE_INIT in the <head> section
function xa_card_fade_init(){
xa_card_method='fade'
// these can be overridden at the top of the page and/or before calling xa_fade_card for each card
/*
xa_card_fade_event - click/hover
xa_card_fade_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_fade_type is an array [type, direction]
	type=standard, pulse, flash, timing-function
	direction is out, nearzero, transparency%
*/
xa_card_fade_event='click';
xa_card_fade_speed='normal';
//regardless of xa_card_type
xa_card_fade_type=['standard','out'];
}
// call XA_CARD_FADE_PERCENT_INIT in the <head> section
function xa_card_fade_percent_init(){
var card_fade_transparency, card_fade_opacity;
/*
xa_card_fade_percent - array [transparency, opacity] - opacity is opposite of transparency
*/
//alert(xa_card_fade_type[1])
if (xa_card_fade_type[1]=='out'){xa_card_fade_percent=[100,0]}
if (xa_card_fade_type[1]=='nearzero'){xa_card_fade_percent=[80,20]}
if (xa_card_fade_type[1]=='out' || xa_card_fade_type[1]=='nearzero'){}
else {
	card_fade_transparency=xa_card_fade_type[1];
	card_fade_opacity=1-card_fade_transparency;
	xa_card_fade_percent=[card_fade_transparency,card_fade_opacity];
}
//alert(xa_card_fade_percent)
}
//XA_CARD_FADE_BUILD will build a card
function xa_card_fade_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var a, x;
var card_side, card_container_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_fade_fade('+"'"+card_front_id+"'"+')"'
var mouseout='onmouseout="xa_card_fade_fade('+"'"+card_front_id+"'"+')"'
var mouseclick='onclick="xa_card_fade_fade('+"'"+card_front_id+"'"+')"'
//var mouseleave='onmouseleave="xa_card_fade_fade('+"'"+card_front_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]+'" '
if (xa_card_fade_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE - could have used data- attritubute with getattribute, setattribute, but keeping it simple and stratightforward. Would have called attribute data-side
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;

a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//XA_CARD_FADE_FADE does the actual fading of a card
//xa_card_fade_fade is executed when the user hovers over or clicks on a card
//xa_card_fade_fade uses transition rather than transform
function xa_card_fade_fade(card_front_id){
// 	alert(card_front_id);
var mytransition; 
var card_side_id, card_side; 
card_side_id=card_front_id.substr(0,card_front_id.length-5)+'side'
//alert(card_side_id)
card_side = document.getElementById(card_side_id).innerHTML;
//alert(card_side)
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
if (card_side=='front'){mytransition=xa_card_fade_percent[1]/100}
else{mytransition=100/100}
//	alert(card_front_id)
//	alert(mytransition)
document.getElementById(card_front_id).style.opacity=mytransition;
}
//**************************************************************************************************************
// $SLIDE$
// call XA_CARD_SLIDE_INIT in the <head> section
function xa_card_slide_init(){
xa_card_method='slide'
// these can be overridden at the top of the page and/or before calling xa_slide_card for each card
/*
xa_card_slide_event - click/hover
xa_card_slide_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_slide_type is an array [type, direction]
	type=standard, superhero, timing-function
	direction is left, right, up, down
*/
xa_card_slide_event='click';
xa_card_slide_speed='normal';
if (xa_card_type=='business' || 'greeting_horizontal'){xa_card_slide_type=['standard','left'];}
else {xa_card_slide_type=['standard','up'];}
}
// call XA_CARD_SLIDE_PERCENT_INIT in the <head> section
function xa_card_slide_percent_init(){
/* xa_card_scroll_percent - array(x,y) */
if (xa_card_slide_type[1]=='left'){xa_card_slide_percent=[-100,0];}
if (xa_card_slide_type[1]=='right'){xa_card_slide_percent=[100,0];}
if (xa_card_slide_type[1]=='up'){xa_card_slide_percent=[0,-100];}
if (xa_card_slide_type[1]=='down'){xa_card_slide_percent=[0,100];}
//alert(xa_card_slide_percent)
}
//XA_CARD_SLIDE_BUILD will build a card
function xa_card_slide_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var a, x;
var card_side, card_container_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_slide_slide('+"'"+card_front_id+"'"+')"'
var mouseout='onmouseout="xa_card_slide_slide('+"'"+card_front_id+"'"+')"'
var mouseclick='onclick="xa_card_slide_slide('+"'"+card_front_id+"'"+')"'
//var mouseleave='onmouseleave="xa_card_slide_slide('+"'"+card_front_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]+'" '
if (xa_card_slide_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE - could have used data- attritubute with getattribute, setattribute, but keeping it simple and stratightforward. Would have called attribute data-side
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;

a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//XA_CARD_SLIDE_SLIDE does the actual sliding of a card
//xa_card_slide_slide is executed when the user hovers over or clicks on a card
function xa_card_slide_slide(card_front_id){
// 	alert(card_front_id);
var mytransform; 
var card_side_id, card_side; 
card_side_id=card_front_id.substr(0,card_front_id.length-5)+'side'
//alert(card_side_id)
card_side = document.getElementById(card_side_id).innerHTML;
//alert(card_side)
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
mytransform='translate'
mytransform+='(';
if (card_side=='front'){mytransform+=xa_card_slide_percent[0]+'%,'+xa_card_slide_percent[1]+'%'}
else{mytransform+='0%,0%'}
mytransform+=')'
//	alert(card_front_id)
//	alert(mytransition)
document.getElementById(card_front_id).style.transform=mytransform;
}
//**************************************************************************************************************
// $OPEN$
// call XA_CARD_OPEN_INIT in the <head> section
function xa_card_open_init(){
xa_card_method='open'
// these can be overridden at the top of the page and/or before calling xa_open_card for each card
/*
xa_card_open_event - click/hover
xa_card_open_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_open_type is an array [type, direction]
	type=standard, left, right, up, down
	direction is x,y
*/
xa_card_open_event='click';
xa_card_open_speed='slow';
if (xa_card_type=='business' || 'greeting_horizontal'){xa_card_open_type=['up','x'];}
else {xa_card_open_type=['left','y'];}
}
// call XA_CARD_OPEN_DEGREES_INIT in the <head> section
function xa_card_open_degrees_init(){
var deg_front, deg_back;
//alert(xa_card_open_type)
if (xa_card_open_type[0]=='standard' && xa_card_open_type[1]=='y'){xa_card_open_type[0]='left'} 
if (xa_card_open_type[0]=='standard' && xa_card_open_type[1]=='x'){xa_card_open_type[0]='up'} 
if (xa_card_open_type[0]=='left' || xa_card_open_type[0]=='right'){xa_card_open_type[1]='y'}
if (xa_card_open_type[0]=='up' || xa_card_open_type[0]=='down'){xa_card_open_type[1]='x'}
xa_card_open_degrees=[-180,0]
if (xa_card_open_type[0]=='right' || xa_card_open_type[0]=='up'){xa_card_open_degrees=[180,0]}
}
//XA_CARD_OPEN_BUILD will build a card
function xa_card_open_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var a;
var card_side, card_container_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_open_open('+"'"+card_front_id+"'"+')"'
var mouseout='onmouseout="xa_card_open_open('+"'"+card_front_id+"'"+')"'
var mouseclick='onclick="xa_card_open_open('+"'"+card_front_id+"'"+')"'
//var mouseleave='onmouseleave="xa_card_open_open('+"'"+card_front_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]+'" '
if (xa_card_open_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE - could have used data- attritubute with getattribute, setattribute, but keeping it simple and stratightforward. Would have called attribute data-side
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;

a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//XA_CARD_OPEN_OPEN does the actual opening of a card
//xa_card_open_open is executed when the user hovers over or clicks on a card
function xa_card_open_open(card_front_id){
// 	alert(card_front_id);
var mytransform; 
var card_side_id, card_side; 
card_side_id=card_front_id.substr(0,card_front_id.length-5)+'side'
//alert(card_side_id)
card_side = document.getElementById(card_side_id).innerHTML;
//alert(card_side)
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
mytransform='rotate'+xa_card_open_type[1].toUpperCase()+'('
if (card_side=='front'){mytransform+=xa_card_open_degrees[0]}
else{mytransform+='0'}
mytransform+='deg)'
//	alert(card_front_id)
//	alert(mytransform)
document.getElementById(card_front_id).style.transform=mytransform;
}
//**************************************************************************************************************
// $FILTER$
// call XA_CARD_FILTER_INIT in the <head> section
function xa_card_filter_init(){
xa_card_method='filter'
// these can be overridden at the top of the page and/or before calling xa_filter_card for each card
/*
xa_card_filter_event - click/hover
xa_card_filter_speed - slow/normal/fast (1.2s, 0.8s, 0.4s)
xa_card_filter_type is an array [type, direction]
xa_card_filter_attributes - opacity or other filter option
	type=standard, pulse, flash, timing-function
	direction is out, nearzero, transparency% to
*/
xa_card_filter_event='click';
xa_card_filter_speed='normal';
//regardless of xa_card_type
xa_card_filter_type=['standard','out'];
xa_card_filter_attributes=[]
// blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia, or null as initialized
// opacity added to filter, so null filter is opacity
}
// call XA_CARD_FILTER_PERCENT_INIT in the <head> section
function xa_card_filter_percent_init(){
var card_filter_transparency, card_filter_opacity;
/*
xa_card_filter_percent - array [from, to] - from is always the default, don't change

blur - default=0px; 0 to 100 - 0=none, 100=very blurry; in px [0,100] - not negative
brightness - default=100%; 0=black, >100 brighter;      in %  [100,200]
darkness -                                                    [100,0]
contrast -   default=100%; 0=black, >100 more contrast; in %  [100,200]
similarity                                                    [100,0]
grayscale -  default=0%;   100 completely gray (b/w);   in %  [0,100] - not < 0 not > 100
hue-rotate - default=0deg; 60 deg/hue, 360 max deg;     in deg  [0,360] - not < 0 not > 360
hue-rotate1                                                     [0,60]
hue-rotate2                                                     [0,120]
hue-rotate3                                                     [0,180]
hue-rotate4                                                     [0,240]
hue-rotate5                                                     [0,300]
hue-rotate6                                                     [0,360]
invert -     default=0%;   100 completely inverted;     in %  [0,100] - not < 0 not > 100
saturate -   default=100%; 0=completely un-sat; >100 super sat in % [100,0] not < 0
sepia -      default 0%;    100 completely sepia        in % [0,100] - not < 0 not > 100

opacity is set behind scenes and added to filter; opacity % same as overall percent
opacity - default=100%; 0=completely transparent        in %  [100,0] - not < 0 not > 100
*/
//alert(xa_card_filter_type[1])
xa_card_filter_percent=[]
//alert(xa_card_filter_attributes)
for (var i=0; i <= xa_card_filter_attributes.length-1; i++) {
	if (xa_card_filter_attributes[i]=='blur'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0px','100px'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0px','80px'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0px',xa_card_filter_type[1]*.8+'px'])}
	}
	if (xa_card_filter_attributes[i]=='brightness' || xa_card_filter_attributes[i]=='contrast'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['100%','200%'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['100%','180%'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['100%',xa_card_filter_type[1]*2+'%'])}
	}
	if (xa_card_filter_attributes[i]=='grayscale' || xa_card_filter_attributes[i]=='invert' || xa_card_filter_attributes[i]=='sepia'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0%','100%'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0%','80%'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0%',xa_card_filter_type[1]*.8+'%'])}
	}
	if (xa_card_filter_attributes[i]=='saturate' || xa_card_filter_attributes[i]=='darkness' || xa_card_filter_attributes[i]=='similarity'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['100%','0%'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['100%','20%'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['100%',xa_card_filter_type[1]*.2+'%'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate' || xa_card_filter_attributes[i]=='hue-rotate6'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','360deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','330deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*360/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate5'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','300deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','270deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*300/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate4'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','240deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','210deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*240/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate3'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','180deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','150deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*180/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate2'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','120deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','90deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*120/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='hue-rotate1'){
		if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['0deg','60deg'])}
		if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['0deg','30deg'])}
		if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
		else{xa_card_filter_percent.push(['0deg',xa_card_filter_type[1]*60/100+'deg'])}
	}
	if (xa_card_filter_attributes[i]=='darkness'){xa_card_filter_attributes[i]='brightness'}
	if (xa_card_filter_attributes[i]=='similarity'){xa_card_filter_attributes[i]='contrast'}
	if (xa_card_filter_attributes[i].substr(0,10)=='hue-rotate'){xa_card_filter_attributes[i]='hue-rotate'}
}
//alert(xa_card_filter_percent)
}
//XA_CARD_FILTER_BUILD will build a card
function xa_card_filter_build(card_front_img,card_front_info,card_back_info,xa_el){
/*
card_front_img = assumed that image is on front of card - url of image
card_front_info = info or title on front of card plus position. This is an array [top/bottom/left/right,info or title]
		info or title contains <span></span> with <br>, style, etc.
card_back_info - contains  <span></span> with <br>, style, etc. Style should include background-color for back of card.
xa_el is the element where the resultant card will end up. You might want to use id=card01, card02, etc.
*/
var opacity_found='N'
for (var i=0; i <= xa_card_filter_attributes.length-1; i++) {
	if (xa_card_filter_attributes[i]=='opacity'){opacity_found='Y'}
}
if (opacity_found=='N'){
	xa_card_filter_attributes.push('opacity')
	if (xa_card_filter_type[1]=='out'){xa_card_filter_percent.push(['100%','0%'])}
	if (xa_card_filter_type[1]=='nearzero'){xa_card_filter_percent.push(['100%','20%'])}
	if (xa_card_filter_type[1]=='out' || xa_card_filter_type[1]=='nearzero'){}
	else{xa_card_filter_percent.push(['100%',xa_card_filter_type[1]*.2+'%'])}
}
//alert (xa_card_filter_percent[0])
/* convert arrays into one string */
var filter_attributes_front, filter_attributes_back
filter_attributes_front='';filter_attributes_back='';
xa_card_filter_attributes_front_back=['','']
//alert(xa_card_filter_attributes)
//alert(xa_card_filter_percent)
for (i=0; i <= xa_card_filter_attributes.length-1; i++) {
	filter_attributes_front+=xa_card_filter_attributes[i]+'('+xa_card_filter_percent[i][0]+') '
	filter_attributes_back+=xa_card_filter_attributes[i]+'('+xa_card_filter_percent[i][1]+') '
}
filter_attributes_front=filter_attributes_front.trimEnd(); //remove extra space on end
filter_attributes_back=filter_attributes_back.trimEnd(); //remove extra space on end
//alert(filter_attributes_front)
//alert(filter_attributes_back)
xa_card_filter_attributes_front_back=[filter_attributes_front,filter_attributes_back]

var a;
var card_side, card_container_id, card_front_id, card_back_id, card_title_lines;
card_side_id=xa_el+'_side'
card_container_id=xa_el+'_container'
card_front_id=xa_el+'_front'
card_back_id=xa_el+'_back'
var line_height=x_fontsize(xa_el,'px');
var img_width, img_height, img_width_height;
var img_width_height=xa_card_img_width_height(card_front_info,line_height);
var front_info_height=xa_card_front_info_height(card_front_info,line_height);
var mouseover='onmouseover="xa_card_filter_filter('+"'"+card_front_id+"'"+')"'
var mouseout='onmouseout="xa_card_filter_filter('+"'"+card_front_id+"'"+')"'
var mouseclick='onclick="xa_card_filter_filter('+"'"+card_front_id+"'"+')"'
//var mouseleave='onmouseleave="xa_card_filter_filter('+"'"+card_front_id+"'"+')"'
//BUILD DIVS
a=''
//CONTAINER note float:left;margin is on card in html
a+='<div id="'+card_container_id+'" style="margin:0;perspective:1000px;overflow:hidden;'+xa_card_size[0]+'" '
if (xa_card_filter_event=='click'){a+=mouseclick}
else{a+=mouseover+' '+mouseout}
a+='>'
//SIDE - could have used data- attritubute with getattribute, setattribute, but keeping it simple and stratightforward. Would have called attribute data-side
a+='<div id="'+card_side_id+'"  style="display:none">front</div>'
//BACK
x=xa_card_build_back(card_back_id,card_back_info);
a+=x;
//FRONT
x=xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height);
a+=x;

a+='</div>' // end card_container
document.getElementById(xa_el).innerHTML=a;
}
//xa_card_filter_filter does the actual filtering of a card
//xa_card_filter_filter is executed when the user hovers over or clicks on a card
//xa_card_filter_filter uses transition rather than transform
function xa_card_filter_filter(card_front_id){
// 	alert(card_front_id);
var mytransition; 
var card_side_id, card_side; 
card_side_id=card_front_id.substr(0,card_front_id.length-5)+'side'
//alert(card_side_id)
card_side = document.getElementById(card_side_id).innerHTML;
//alert(card_side)
if (card_side=='front'){document.getElementById(card_side_id).innerHTML='back';}
else{document.getElementById(card_side_id).innerHTML='front';}
//alert(xa_card_filter_attributes_front_back)
if (card_side=='front'){mytransition=xa_card_filter_attributes_front_back[1]}
else{mytransition=xa_card_filter_attributes_front_back[0]}
//	alert(card_front_id)
//	alert(mytransition)
document.getElementById(card_front_id).style.filter=mytransition;
}
// XA_CARD_IMG_WIDTH_HEIGHT
function xa_card_img_width_height(card_front_info,line_height){
var img_width, img_height; var card_title_lines;
if (xa_card_type=='business'){
	if (card_front_info[0]=='left' || card_front_info[0]=='right'){img_width=xa_card_size[1]/2;img_height=xa_card_size[2];}
	else{img_width=xa_card_size[1];img_height=xa_card_size[2]/2;}
}
if (xa_card_type=='playing' || xa_card_type=='greeting_horizontal' || xa_card_type=='greeting_vertical'){
	img_width=xa_card_size[1];
	card_title_lines=xa_card_title_lines;
	if (card_title_lines==0){card_title_lines=-.5;}
	img_height=xa_card_size[2]-line_height*(card_title_lines+.5);
}
return 'width:'+img_width+'px;height:'+img_height+'px;'
}
// XA_CARD_FRONT_INFO_HEIGHT
function xa_card_front_info_height(card_front_info,line_height){
var front_info_lines, front_info_for_match=card_front_info[1].replace(/[<>]/g, '_');
front_info_lines=front_info_for_match.match(/_br_/gi)
if (front_info_lines==null){front_info_lines=['x']}
return xa_card_size[2]/2-line_height*(front_info_lines.length+1/2)-line_height*.5+'px'; //match returns an array of the occurrences - [<br>,<br>,<br>,...] in this case
}
// XA_CARD_BUILD_EVENT
function xa_card_build_event(card_event_id,event_type,event_speed){
var a='';
a+='<div id="'+card_event_id+'" '
a+='style="position:relative;margin:0;width:100%;height:100%;'
if (xa_card_method=='rotate'){if (event_type[0]=='switch'){a+='transform-origin:left center;'}}
a+='transform-style:preserve-3d;transition:transform '
a+=xa_card_speed_sec(event_speed)+';'
if (xa_card_method=='scroll'){
	switch (xa_card_scroll_type[0]){
		case 'standard':a+='linear';break;
		case 'superhero':a+='cubic-bezier(1, .5, .5, 1)';break;
		default:a+=xa_card_scroll_type[0];
	}
}
a+='">'
return a
}
// XA_CARD_BUILD_BACK
function xa_card_build_back(card_back_id,card_back_info){
xa_card_border_back=false
var a='';
a+='<div id="'+card_back_id+'" '
a+='style="position:absolute;width:100%;height:100%;'
if(xa_card_border_back){a+='border:1px solid '+xa_card_border_back_color+';'}
if (xa_card_method=='rotate'){a+='backface-visibility:hidden;'}
if (xa_card_type=='playing'){if(xa_card_border_back){}else{a+='border-radius:10%;'}}
if (xa_card_method=='rotate'){
	a+='transform:rotate'
	if (xa_card_type=='business' || xa_card_type=='greeting_horizontal'){a+='X'}else{a+='Y'}
	a+='('+xa_card_rotate_degrees[1]+'deg);'
}
if(xa_card_background_color==''){}else{a+='background-color:'+xa_card_background_color+';'}
a+='">'
a+=card_back_info+'</div>' //end card_back
return a
}
// XA_CARD_BUILD_FRONT
function xa_card_build_front(card_front_id,card_front_info,front_info_height,card_front_img,img_width_height){
var a='';
a+='<div id="'+card_front_id+'" '
if (xa_card_method=='scroll'){a+='style="position:relative;'}
else{a+='style="position:absolute;'}
a+='width:100%;height:100%;'
if (xa_card_method=='rotate'){a+='backface-visibility:hidden;'} //backface-visibility only applies to rotation
if (xa_card_type=='playing'){a+='text-align:center;border-radius:10%;'}
if(xa_card_background_color==''){}else{a+='background-color:'+xa_card_background_color+';'}
if (xa_card_method=='fade'){
	a+='opacity:1;'
	a+='transform-style:preserve-3d;transition:opacity '
	a+=xa_card_speed_sec(xa_card_fade_speed)+' '
	switch (xa_card_fade_type[0]){
		case 'standard':a+='linear';break;
		case 'pulse':a+='cubic-bezier(0,2,1,-2)';break;
		case 'flash':a+='cubic-bezier(.8,.1,.8,.8)';break;
		default:a+=xa_card_fade_type[0];
	}
	a+=';'
}
if (xa_card_method=='slide'){
	a+='transform-style:preserve-3d;transition:transform '
	a+=xa_card_speed_sec(xa_card_slide_speed)+' '
	switch (xa_card_slide_type[0]){
		case 'standard':a+='linear';break;
		case 'pulse':a+='cubic-bezier(0,2,1,-2)';break;
		case 'flash':a+='cubic-bezier(.8,.1,.8,.8)';break;
		default:a+=xa_card_slide_type[0];
	}
	a+=';'
}
if (xa_card_method=='open'){
	a+='transform-origin:';
	switch (xa_card_open_type[0]){
		case 'up':a+='top';break;
		case 'down':a+='bottom';break;
		default:a+=xa_card_open_type[0]; //left, right
	}
	a+=';'
	a+='transform-style:preserve-3d;transition:transform '
	a+=xa_card_speed_sec(xa_card_open_speed)+';'
}
if (xa_card_method=='filter'){
	a+='filter:'+xa_card_filter_attributes_front_back[0]+';'
	a+='transform-style:preserve-3d;transition:filter '
	a+=xa_card_speed_sec(xa_card_filter_speed)+' '
	switch (xa_card_filter_type[0]){
		case 'standard':a+='linear';break;
		case 'pulse':a+='cubic-bezier(0,2,1,-2)';break;
		case 'flash':a+='cubic-bezier(.8,.1,.8,.8)';break;
		default:a+=xa_card_filter_type[0];
	}
	a+=';'
}
a+='">'
if (card_front_info[0]=='left'){a+='<div style="height:'+front_info_height+'"></div>'}
if (card_front_info[0]=='top' || card_front_info[0]=='left'){
	if (xa_card_type=='playing'){a+='<center>'}
	a+=card_front_info[1]
	if (xa_card_type=='playing'){a+='</center>'}
}
//IMG
if (xa_card_type=='business'){
	if (card_front_info[0]=='left'){a+='<div style="float:right;">'}
	else {a+='<div style="float:left;">'}
}
a+='<img src="'+card_front_img+'" style="'
a+=img_width_height;
if (xa_card_type=='playing'){a+='border-radius:10%;'}
a+='">'
if (xa_card_type=='business'){
	if (card_front_info[0]=='left' || card_front_info[0]=='right'){a+='</div><div>'}
}
if (card_front_info[0]=='right'){a+='<div style="height:'+front_info_height+'"></div>'}
if (card_front_info[0]=='bottom' || card_front_info[0]=='right'){
	if (xa_card_type=='playing'){a+='<center>'}
	a+=card_front_info[1]
	if (xa_card_type=='playing'){a+='</center>'}
}
a+='</div>' // end card_front
if (xa_card_type=='business'){
	if (card_front_info[0]=='left' || card_front_info[0]=='right'){a+='</div><div style="clear:both"></div>'}
}
return a
}
function xa_card_speed_sec(event_speed){
var a=''
if (event_speed=='slowest'){a+='2.0'}
if (event_speed=='slower'){a+='1.6'}
if (event_speed=='slow'){a+='1.2'}
if (event_speed=='normal'){a+='0.8'}
if (event_speed=='fast'){a+='0.4'}
if (event_speed=='faster'){a+='0.2'}
if (event_speed=='fastest'){a+='0.1'}
a+='s'
return a
}
/* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties; https://3dtransforms.desandro.com/
   Rotate rewritten - transition-property:rotate Methods: Standard, Magic, Dancer
   Scroll - Can only scroll up/left. transition-property:translate Methods: Standard, Superhero, thought about butterfly with points in cubic-bezier function going out of 1,1 grid, but wouldn't come across correctly. Thought about gymnast/trapezist using dancer, but on x axis. Worked, except back of card ended up upside down.
   Fade - transition-property:opacity Methods: Standard, Pulse, Timing function; out, nearzero, percent.
   Slide - transition-property:translate Methods: Standard, Superhero, thought about butterfly with points in cubic-bezier function going out of 1,1 grid, but wouldn't come across correctly.
   Open - transition-property rotate. Only rotate front of card.
   Erase - use clip-path rectangle, inset-rectangle, polygon, circle, ellipse https://css-tricks.com/clipping-masking-css/ Only firefox supports clip-path on HTML elements (others only on SVG elements), so can't use this.
   Mask - erase certain portions of an image - not doing this. Works differently in different browsers.
   Magnify - transition-property:zoom - ?doing this? - double transition. Could try to combine magnify and fade for single transition, but wouldn't give the desired effect.
*/
/*
transition is shorthand for transition-property transition-duration transition-timing-function transition-delay
*/
/* timing-function
https://www.smashingmagazine.com/2014/04/understanding-css-timing-functions/
https://cubic-bezier.com/
*/
/*
style.transform properties - https://www.w3schools.com/jsref/prop_style_transform.asp
style.transition properties - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties 
	https://blog.thinkingstiff.com/2013/02/08/css-transitions-with-javascript/
*/
/*           Non-Card Animations */
function xa_refresh_element(xa_refresh_el_in,xa_refresh_innerHTML_in,xa_refresh_wait_in,xa_refresh_opacity_in){
var xa_refresh_el=document.getElementById(xa_refresh_el_in)
xa_refresh_el.style.opacity=0
xa_refresh_el.innerHTML=xa_refresh_innerHTML_in
if(xa_refresh_wait_in===undefined || xa_refresh_wait_in==''){xa_refresh_wait_in=400}
if(xa_refresh_opacity_in===undefined || xa_refresh_opacity_in==''){xa_refresh_opacity_in=1}
setTimeout(()=>{xa_refresh_el.style.opacity=1},xa_refresh_wait_in)
}
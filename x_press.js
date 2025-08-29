//x_press.js  by Dale Stubbart
//saves website developers time while writing the page text
//see https://stubbart.com/code/index.html for documentation and more info.
//
//functions:
//  x_element(x_element_id) gets the element.
//  x_press(test/notest) expand shorthand expressions. For instance &'; displays on the page as a fancy/curly apostrophe. Updates <body>.
//  x_accent() expands a letter and a mark into an accented letter. For instance &e'; becomes e-acute. Updates <body>.
//  x_script(script_in,script_style) expands script_in into a script font depending on script_style. Writes output to screen.
//  x_date(x_date_in,x_date_fmt) formats date and writes it to screen. 
//  x_emoji(x_emoji_color_names,x_emoji_color_codes,x_emoji_style,x_emoji_test) expands emoji codes into unicode characters. Updates <body>.
//  and more

//X_PRESS_INIT
function x_press_init(default_webpage){
// version
var i
//                    7                       8		                          0
x_press_version_major=7;x_press_version_minor=7;x_press_version_revision=0;
x_press_version=x_press_version_major.toString()+'.'+x_press_version_minor.toString()+'.'+x_press_version_revision.toString()
x_press_size='<125KB';x_press_lines='<2000'
if(default_webpage===undefined || default_webpage==''){default_webpage='index.html'}
x_webpage_default=default_webpage
// webpage if online
x_webpage_array=[];x_webpage_array=x_webpage_parse(window.location.href)
//x_webpage_protocol=window.location.protocol
x_webpage_protocol=x_webpage_array[0]+':'
//x_webpage_domain=window.location.hostname
x_webpage_domain=x_webpage_array[1]
x_webpage_url=window.location.href
x_webpage_url_encoded=encodeURI(x_webpage_url)
x_webpage_url_encoded_fully=encodeURIComponent(x_webpage_url)
//webpage_parms=window.location.search
x_webpage_path='/'+x_webpage_array[2]
//webpage=x_webpage_path.substr(x_webpage_path.lastIndexOf('/')+1,x_webpage_path.length-1-x_webpage_path.lastIndexOf('/')+1+1)
x_webpage=x_webpage_array[3]+'.'+x_webpage_array[4]
if(x_webpage_array[3]==''){x_webpage=default_webpage}
//(x_webpage_protocol=='file:'){x_webpage_path=x_webpage_path.replace('file:','https:')}
var path_array=x_webpage_path.split('/')
//x_webpage_path=""
//for(i=1;i<path_array.length-1;i++){
//  x_webpage_path+=path_array[i];
//  x_webpage_path+="/"
//}
//alert(x_webpage_path)
//var webpage_parms=x_webpage_parms.substr(1,x_webpage_parms.length-1)
x_webpage_parms=x_webpage_array[5]
x_webpage_parms_array=[]
var webpage_parms_amp_array=x_webpage_parms.split('&')
for(i=0;i<webpage_parms_amp_array.length;i++){x_webpage_parms_array[i]=webpage_parms_amp_array[i].split('=')}
x_webpage_hash=x_webpage_array[6]
/*
alert(x_webpage_protocol)
alert(x_webpage_domain)
alert(x_webpage_path)
alert(x_webpage)
alert(x_webpage_parms)
alert(x_webpage_hash)
*/
x_webpage_title=document.title;x_webpage_charset=document.defaultCharset;x_webpage_input_encoding=document.inputEncoding
x_webpage_previous_page=document.referrer //not populated offline or if previous url is http or if url is typed rather than a link, so not that useful
if(x_webpage_protocol=='file:'){x_webpage_online=false}else{x_webpage_online=true}
//URSSearchParams did not work offline, did not test online
//var webpage_parms=new URLSearchParams(x_webpage_parms);alert(webpage_parms.entries)
//webpage_parms.forEach(function(key,value){x_webpage_parms_array.push[key,value]});//https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
//if the above does not work, try https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries
//both should produce similar results
//!!navigator.platform is deprecated. However, if only looking at browser, major version, and os, it should still work!! Ignore the warning. - https://web.dev/migrate-to-ua-ch/
// os
x_os=navigator.platform
if(x_os.substr(0,5)=='Linux'){x_os='Linux'}
if(x_os.substr(0,3)=='Mac'){x_os='Mac'}
if(x_os.substr(0,3)=='Win'){x_os='Windows'}
var isOpera=(!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/')>=0
var isFirefox=typeof InstallTrigger !=='undefined'
var isSafari=/constructor/i.test(window.HTMLElement) ||(function(p){return p.toString()==="[object SafariRemoteNotification]"})(!window['safari'] ||(typeof safari!=='undefined' && safari.pushNotification))
var isIE=/*@cc_on!@*/false || !!document.documentMode
var isEdge=!isIE && !!window.StyleMedia
var isChrome=!!window.chrome && !!window.chrome.webstore
x_browser=''
if(isOpera){x_browser='Opera'}
if(isFirefox){x_browser='Firefox'}
if(isSafari){x_browser='Safari'}
if(isIE){x_browser='IE'}
if(isEdge){x_browser='Edge'}
if(isChrome){x_browser='Chrome'}
// processing
x_alert_i=0
x_alert_limit=10
x_error=0//<0=error;0=ok;>0=warning
x_error_message=''
x_error_function=''
// other
x_bullet='&bull;'
x_press_extra_fr=[];x_press_extra_to=[];x_press_spans_extra_fr=[];x_press_spans_extra_frend=[];x_press_spans_extra_to=[];x_press_spans_extra_toend=[]
// colors
//brown is not included, as brown is actually a red-violet color
x_color_primary_names_5_array=['black',  'red',    'green',  'blue',   'white']
x_color_primary_5_array=[      '#000000','#ff0000','#00ff00','#0000ff','#ffffff']
x_color_primary_names_8_array=['black',  'red',    'yellow', 'green',  'aqua',   'blue',   'magenta','white']
x_color_primary_8_array=[      '#000000','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffffff']
x_color_primary_names_18_array=['black',  'red',    'yellow', 'orange', 'coral',  'green',  'chartreuse','springgreen','lightgreen','aqua',   'blue',   'royalblue','magenta','violetred','violetblue','lavender','gray',   'white']
x_color_primary_18_array=[      '#000000','#ff0000','#ffff00','#ff7f00','#ff7f7f','#00ff00','#7fff00',   '#00ff7f',    '#7fff7f',   '#00ffff','#0000ff',  '#007fff',  '#ff00ff','#ff007f',  '#7f00ff',   '#7f7fff', '#7f7f7f','#ffffff']
x_color_primary_names_array=['black',  'red',    'green',  'blue',   'yellow', 'aqua',   'magenta','orange', 'violetred','coral',  'chartreuse','springgreen','lightgreen','violetblue','royalblue','lavender','gray',   'white']
x_color_primary_array=[      '#000000','#ff0000','#00ff00','#0000ff','#ffff00','#00ffff','#ff00ff','#ff7f00','#ff007f',  '#ff7f7f','#7fff00',   '#00ff7f',    '#7fff7f',   '#7f00ff',   '#007fff',   '#7f7fff', '#7f7f7f','#ffffff']
//x_color_primary_crayola_names_array=['black',  'blue',   'brown',  'green',  'orange', 'red',    'violet', 'yellow'] //not sure if have correct values
//x_color_primary_crayola_array=[      '#000000','#4570E6','#A52A2A','#3AA655','#FFA500','#ff0000','#732E6C','#FBE870']
x_color_rainbow_names_array=['red','orange','yellow','green','blue','indigo','violet']
x_color_rainbow_array=['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#2E2B5F','#8B00FF']
x_color_official_names=["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenrod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","Goldenrod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenrodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenrod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]
x_color_official_values_hex=["#F0F8FF","#FAEBD7","#00FFFF","#7FFFD4","#F0FFFF","#F5F5DC","#FFE4C4","#000000","#FFEBCD","#0000FF","#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED","#FFF8DC","#DC143C","#00FFFF","#00008B","#008B8B","#B8860B","#A9A9A9","#006400","#BDB76B","#8B008B","#556B2F","#FF8C00","#9932CC","#8B0000","#E9967A","#8FBC8F","#483D8B","#2F4F4F","#00CED1","#9400D3","#FF1493","#00BFFF","#696969","#1E90FF","#B22222","#FFFAF0","#228B22","#FF00FF","#DCDCDC","#F8F8FF","#FFD700","#DAA520","#808080","#008000","#ADFF2F","#F0FFF0","#FF69B4","#CD5C5C","#4B0082","#FFFFF0","#F0E68C","#E6E6FA","#FFF0F5","#7CFC00","#FFFACD","#ADD8E6","#F08080","#E0FFFF","#FAFAD2","#D3D3D3","#90EE90","#FFB6C1","#FFA07A","#20B2AA","#87CEFA","#778899","#B0C4DE","#FFFFE0","#00FF00","#32CD32","#FAF0E6","#FF00FF","#800000","#66CDAA","#0000CD","#BA55D3","#9370DB","#3CB371","#7B68EE","#00FA9A","#48D1CC","#C71585","#191970","#F5FFFA","#FFE4E1","#FFE4B5","#FFDEAD","#000080","#FDF5E6","#808000","#6B8E23","#FFA500","#FF4500","#DA70D6","#EEE8AA","#98FB98","#AFEEEE","#DB7093","#FFEFD5","#FFDAB9","#CD853F","#FFC0CB","#DDA0DD","#B0E0E6","#800080","#663399","#FF0000","#BC8F8F","#4169E1","#8B4513","#FA8072","#F4A460","#2E8B57","#FFF5EE","#A0522D","#C0C0C0","#87CEEB","#6A5ACD","#708090","#FFFAFA","#00FF7F","#4682B4","#D2B48C","#008080","#D8BFD8","#FF6347","#40E0D0","#EE82EE","#F5DEB3","#FFFFFF","#F5F5F5","#FFFF00","#9ACD32"]
x_color_random_array=[]
x_color_black='#000000';x_color_white='#ffffff'
x_font_google_heading='';x_font_google_text=''
}
//document.write(x_a)
//function x_d_w(x_a){
//deprecated due to Chrome - use id.innerHTML instead - x_ih
//document.write(x_a)}
function x_w(x_a,x_el){x_ih(x_a,x_el)}
function x_ih(x_a,x_el){document.getElementById(x_el).innerHTML=x_a}
//left pad to length
function x_pad(x_string_in,x_string_in_length){return '000000000000000000'.substring(0,x_string_in_length-x_string_in.length)+x_string_in/*works even if x_string_in_length-x_string_in.length=zero*/}
function x_element(x_element_id){return document.getElementById(x_element_id)}
//STYLE Functions
function x_is_stylesheet_used(stylesheet_in){
var i,ss_found,ss_found_length,ss_in=stylesheet_in//ss=stylesheet
if(window.x_press_stylesheet_is_used===undefined){x_press_stylesheet_is_used=false} //use window. because global var rather than local var
if(x_press_stylesheet_is_used==false){//speeds up to not bother processing again
var links=document.getElementsByTagName('link'),links_limit=links.length,ss_in_length=ss_in.length
for(i=0;i<links_limit;i++){
	ss_found=links[i].getAttribute('href');ss_found_length=ss_found.length
	if(ss_found.substring(ss_found_length - ss_in_length,ss_found_length)==ss_in){x_press_stylesheet_is_used=true}
}
}
return x_press_stylesheet_is_used
}
function x_styles_merge(style_class,style2){
var a
if(style_class==''){if(style2==''){}else{a='style="'+style2+'"'}}
else{
	if(style_class.substr(0,5)=='class'){a=style_class+' style="'+style2+'"'}
	else{a=style_class.substr(0,style_class.length-1)+';'+style2+'"'}//style
}
return a
}
function x_fontsize(x_el,to_pxem){// https://tzi.fr/js/convert-em-in-px/
var px_per_em=parseFloat(getComputedStyle(document.getElementById(x_el)/*for the given context*/ || document.documentElement/* or the root <html> element*/).fontSize)// of the computed font-size, so in px
if(to_pxem=='px'){return px_per_em}
else{return Math.round(1/px_per_em*100)/100}
}
//END STYLE Functions
//COLOR Functions
//returns rgb(r,g,b)
function x_color(x_el,foreback){// https://css-tricks.com/converting-color-spaces-in-javascript/
if(foreback=='text' || foreback=='foreground' || foreback=='fore' || foreback=='fg'){return getComputedStyle(document.getElementById(x_el) || document.documentElement).getPropertyValue('color')}
else{return getComputedStyle(document.getElementById(x_el) || document.documentElement).getPropertyValue('background-color')}
}
function x_color_shift(rgb,redshift,greenshift,blueshift){//use 16 for all three shifts for lighter, use -16 for darker
var rgb_array,rgb_out
rgb_array=rgb.substr(4).split(')')[0].split(',')
rgb_array[0]=(parseInt(rgb_array[0],10)+parseInt(redshift)).toString();rgb_array[1]=(parseInt(rgb_array[1],10)+parseInt(greenshift)).toString();rgb_array[2]=(parseInt(rgb_array[2],10)+parseInt(blueshift)).toString()
for(i=0;i<rgb_array.length - 1;i++){
	if(parseInt(rgb_array[i])<0){rgb_array[i]=(256+parseInt(rgb_array[i])).toString()}
	if(parseInt(rgb_array[i]) > 255){rgb_array[i]=(256-parseInt(rgb_array[i])).toString()}
}
return 'rgb('+rgb_array[0]+','+rgb_array[1]+','+rgb_array[2]+')'
}
function x_color_convert(fromcolor,tocolor_type){//tocolor_type='hex'(default),'rgb'. color can be any official name, hex value optionally preceded by #, rgb string
var fromcolor_type,j,r,g,b,rgb_array
//alert(fromcolor)
//alert(x_color_official_names.length)
if(fromcolor.substr(0,3)=='rgb'){fromcolor_type='rgb'}
else{fromcolor_type='hex'
	for(i=0;i<=x_color_official_names.length-1;i++){
//		alert(i);alert(x_color_official_names[i])
		if(x_color_official_names[i].toUpperCase()==fromcolor.toUpperCase()){fromcolor_type='name';j=i;break}
	}
}
//alert(fromcolor_type)
if(fromcolor_type=='hex'){
	fromcolor=fromcolor.toUpperCase()
	if(fromcolor.length==6){fromcolor='#'+fromcolor}
}
if(fromcolor_type=='name'){
	if(tocolor_type=='hex'){return x_color_official_values_hex[j]}
	else{
		r=parseInt(x_color_official_values_hex[j].substr(1,2),16);g=parseInt(x_color_official_values_hex[j].substr(3,2),16);b=parseInt(x_color_official_values_hex[j].substr(5,2),16)
		return 'rgb('+r+','+g+','+b+')'
	}
}
if(fromcolor_type=='hex'){//tocolor_type must be rgb
	r=parseInt(fromcolor.substr(1,2),16);g=parseInt(fromcolor.substr(3,2),16);b=parseInt(fromcolor.substr(5,2),16)
	return 'rgb('+r+','+g+','+b+')'
}
if(fromcolor_type=='rgb'){//tocolor_type must be hex
	rgb_array=fromcolor.substr(4).split(')')[0].split(',')
	r=parseInt(rgb_array[0],10).toString(16);if(r.length==1){r='0'+r}
	g=parseInt(rgb_array[1],10).toString(16);if(g.length==1){g='0'+g}
	b=parseInt(rgb_array[2],10).toString(16);if(b.length==1){b='0'+b}
	return '#'+r+g+b
}
}
//X_COLOR_RANDOM
function x_color_random(){
return '#'+x_random_between(0,16777216-1).toString(16).padStart(6,'0')
}
//X_COLOR_RANDOM_ARRAY_INIT
function x_color_random_array_init(allowgray=16,allowblack=16,allowwhite=16,tooclose=16){
var color_random_array=[],color_random_red_array=[],color_random_green_array=[],color_random_blue_array=[],a,ar,ag,ab,ardec,agdec,abdec,i,j,isin,isgray,isblack,iswhite
for(i=0;i<tooclose/16*1000;i++){
//	isgray=true;isin=true;isinvisible=true
	a=x_color_random()
	ar=a.substr(1,2);ag=a.substr(3,2);ab=a.substr(5,2)
	ardec=parseInt(ar,16);agdec=parseInt(ag,16);abdec=parseInt(ab,16)
	isblack=false
	if(ardec<allowblack-1 && agdec<allowblack-1 && abdec<allowblack-1){isblack=true}
	iswhite=false
	if(ardec>255-(allowwhite-1) && agdec>255-(allowwhite-1) && abdec>255-(allowwhite-1)){iswhite=true}
	isgray=false
	if(Math.abs(ardec-agdec)<allowgray-1){if(Math.abs(ardec-abdec)<allowgray-1){if(Math.abs(agdec-abdec)<allowgray-1){isgray=true}}}
	isin=false
	for(j=0;j<color_random_array.length;j++){//check for isin
		if(color_random_array[j]=='??????'){}
		else{
			if(Math.abs(ardec-color_random_red_array[j])<tooclose-1 && Math.abs(agdec-color_random_green_array[j])<tooclose-1 && Math.abs(abdec-color_random_blue_array[j])<tooclose-1){isin=true}
		}
	}
	if(isin){a='??????'}
	if(isgray){if(allowgray>0){a='??????'}}
	if(isblack){if(allowblack>0){a='??????'}}
	if(iswhite){if(allowwhite>0){a='??????'}}
	color_random_array[i]=a;color_random_red_array[i]=ardec;color_random_green_array[i]=agdec;color_random_blue_array[i]=abdec
}
//alert(color_random_array)
//alert(color_random_array.length)
x_color_random_array=[]
for(i=0;i<1000;i++){if(color_random_array[i]=='??????'){}else{x_color_random_array.push(color_random_array[i])}}
//alert(x_color_random_array.length)
}
function x_color_contrast(color){
var color,rgb_array,contrast
color=x_color_convert(color,'rgb')
rgb_array=color.substring(4,color.length-1).replace(/ /g,'').split(',')
contrast=x_color_white
if(((rgb_array[0]*299)+(rgb_array[1]*587)+(rgb_array[2]*114))/1000>128){contrast=x_color_black}
return contrast
}
function x_color_contrast_per_background(x_el,settextcolor=false,setbordercolor=false){
var a,a_background,a_rgb_array,a_color_new
a=x_element(x_el);a_background=a.style.backgroundColor;a_color_new=x_color_contrast(a_background)
if(settextcolor){a.style.color=a_color_new}
if(setbordercolor){a.style.borderColor=a_color_new}
return a_color_new
}
//END COLOR Functions
function x_text_case(string,toCase){
var a,b,string_array,i,toCase_upper
toCase_upper=toCase.toUpperCase()
if(toCase_upper.substr(0,5)=='CAMEL' || toCase_upper.substr(5,5)=='CAMEL'){toCase_upper='TITLEALL'}
switch(toCase_upper){
	case 'UPPER':a=string.toUpperCase();break
	case 'LOWER':a=string.toLowerCase();break
	case 'SENTENCE':a=string.replace(/^./,string[0].toUpperCase());break
	case 'TITLE':string_array=string.split(' ')
		for(i=0;i<string_array.length;i++){
			b=string_array[i]
			if(b=='a' || b=='an' || b=='and' || b=='as' || b=='at' || b=='in' || b=='is' || b=='it' || b=='nor' || b=='not' || b=='of' || b=='on' || b=='or' || b=='so' || b=='the'|| b=='to' || b=='us' || b=='we'){}
			else{string_array[i]=string_array[i].charAt(0).toUpperCase() + string_array[i].slice(1)}
		}
		a=string_array.join(' ').replace(/^./,a[0].toUpperCase())
		break
	case 'TITLEALL':string_array=string.split(' ')
		for(i=0;i<string_array.length;i++){
			string_array[i]=string_array[i].charAt(0).toUpperCase() + string_array[i].slice(1)
		}
		a=string_array.join(' ')
		break
}
if(toCase.substr(0,5).toUpperCase()=='CAMEL' || toCase.substr(0,10).toUpperCase()=='LOWERCAMEL'){
	b=a.substr(0,1).toLowerCase()
	a=b+a.substr(1,a.length-1)
}
if(toCase.toUpperCase()=='CAMELALL' || toCase.substr(5,8).toUpperCase()=='CAMELALL'){a=a.replaceAll(' ','').replaceAll('_','').replaceAll('-','')}
if(toCase.toUpperCase()=='SNAKE'){a=a.replaceAll(' ','_')}
if(toCase.toUpperCase()=='SNAKE-'){a=a.replaceAll(' ','-')}
if(toCase.toUpperCase()=='SNAKE'){a=a.replaceAll(' ','~')}
if(toCase.toUpperCase()=='SNAKE='){a=a.replaceAll(' ','=')}
if(toCase.toUpperCase()=='SNAKEALL'){a=a.replaceAll('-','_')}
if(toCase.toUpperCase()=='SNAKE-ALL'){a=a.replaceAll('_','-')}
if(toCase.toUpperCase()=='SNAKE~ALL'){a=a.replaceAll('_','~');a=a.replaceAll('-','~')}
if(toCase.toUpperCase()=='SNAKE=ALL'){a=a.replaceAll('_','=');a=a.replaceAll('-','=')}
return a
}
//X_PRESS
//No translation needed -> &bigstar;&blacksquare;&cent;&check;&copy;(copyright) &deg;(degree) &diamond;&frown;(no face) &ge;(greaterthan/equalto) &gg;(greaterthan/greaterthan) &incare;(c/o) &iexcl;(inverted !) &iquest;(inverted ?) &le;(lessthan/equalto) &ll;(lessthan/lessthan) &ne;(notequal) &phone; reg;(registered trademark) &smile;(no face) &sung;(1/8th note) trade;(trademark)
//No translation needed -> arrows: &darr;&dArr;&larr;&lArr;&rarr;&rArr;&uarr;&uArr(A is two lines;a is one) 
//No translation needed -> fractions: &half;&frac12;... &frac16;&frac18;&frac23;&frac25;&frac34;&frac35;&frac38;&frac45;&frac56;&frac58;&frac78
//fancy/curly quotes   &'; apostrophe, &l';&r';left/right single quotes, &l";&r"; left/right double quotes
//fancy dashes         &m-;&n-;m/n dash
//other punctuation    &...;ellipses, &?v;&!v;inverted(upsidedown) ?/!
//contact              &|><|;email, &|><|@;email with @,&b@@;&w@@;@O@@;@m@@ black/white/circled/mobile phone
//faces                &:); &:(; smile/frown,  &:)); &:((; grin/angry, &:'); joy, &<3); heart eyes, &:|; unamused, &:zzz;weary, &:'(; cry, &:O; astonished, &:*; kiss, &:; no mouth
//arrows               &<-; &->; &^|; &|v; &<->; &<-'; left/right/up/down/leftright/carriage return
//double-line arrows   &<=; &=>; &^||; &||v; &<=>; left/right/up/down/leftright
//hands                &<h; &h>; &^h; &hv; pointing left/right/up/down, &hok; ok, &h/; writing, &hV; victory, &^ht; &htv; up/down pointing(hand) thumb
//hearts               &<3; &<3<3; &<3<3<3<3; 1/2/4 hearts(4 is revolving hearts), &*<3*; &"<3"; sparkling/pulsing heart, &</3; broken heart, &-><3; arrow thru heart
//beings/people        &O:);angel, &>:); &>:(; smiling/frowning imp, &:<; praying monk, &^h:; &^h:^h; monk with raised hand/hands, &:?; information desk person, &:)(:; &:)>3(:; couple/couple with heart
//monkeys              &)X; &@X; &:X; speak/hear/see no evil
//cats                 &c:; &c:'); &c<3); &c:'(; grinning/joy/heart eyes/crying 
//spans                <indent> indent/tab, <bullet> bullet with indent
function x_press(x_press_test,x_press_test_here){
if(x_press_test===undefined || x_press_test=='' || x_press_test=='test' || x_press_test=='javascript'){}
else{x_press_test_here=x_press_test}
var i,j,k,s,iH,x_p_f,x_p_fend,x_p_t,x_p_tend
var ss=x_is_stylesheet_used('x_press.css'),sc
var punctuation_fr=["'","l'","r'",'l"','r"','m-','n-','...','?v','!v']
var punctuation_to=["rsquo"/*apostrophe*/,"lsquo","rsquo",'ldquo','rdquo','mdash','ndash','hellip','iquest','iexcl']
var contact_fr=['env','env@','email','b@@','w@@','O@@','m@@']
var contact_to=['#x1F4E9','#x1F4E7','#x1F4E7','phone','#x260F','#x2706','#x1F4F1']
var faces_fr=[':))','grin','lol','rofl',":')",':)','smiley','heart)',':((','sad',':|',':*',':(','frowney',':zzz',":'(",':O',':',':zzzz']
var faces_to=['#x1F601','#x1F601','#x1F601','#x1F601','#x1F602','#x1F603','#x1F603','#x1F60D','#x1f612','#x1f612','#x1f614','#x1f61a','#x1f622','#x1f622','#x1f62b','#x1f62d', '#x1f632','#x1f636','#x1f634']
var arrows_fr=['l-','r-','u-','d-','lr-','ud-',"ld-", '2l-','2r-','2u-','2d-','2lr-','2ud-','hl-','hr-','hu-','hd-','tu-','thumbs_up','td-']
var arrows_to=['larr','rarr','uarr','darr','harr','#x2195;','crarr', 'lArr','rArr','uArr','dArr','hArr', '#x21d5', '#x1f448','#x1f449','#x1f446','#x1f447','#x1f44d','#x1f44d','#x1f44e']
var hands_fr=['hok','ok','aok','h/','hV']
var hands_to=['#x1f44c','#x1f44c','#x1f44c','#x270d','#x270c']
var people_fr=['O:)','O/:)','O/:(','h^','^h:','^h:^h',':?',':)(:',':)heart(:']
var people_to=['#x1f47c','#x1f608','#x1f47f','#x1f64f','#x1f64b','#x1f64c','#x1f481','#x1F46B','#x1F491']
//note hearts is already an html entity
var hearts_fr=['heart','ilu','love','heartheart','heartheartheartheart','2heartbeat','heart/','heart*','heartheartheart','heart-','2heart','heart3']
var hearts_to=['#x2764','#x2764','#x2764','#x1f495','#x1F49E','#x1F49E','#x1f494','#x1f496','#x1f497','#x1f498','#x1f495','#x1f497']
var monkeys_fr=[')X','@X',':X']
var monkeys_to=['#x1f64a','#x1f649','#x1f648']
var cats_fr=["c:)","c:')",'cheart',"c:'("]
var cats_to=['#x1F638','#x1F639','#x1F63B','#x1F63F']
var search_fr=['searchl','searchr']
var search_to=['#x1F50D','#x1F50E']
var menu_fr=['menu','menu_dots','menu_home','menu_home_garden','menu_about','menu_about2','menu_contact','menu_contact_inbox','menu_contact_email','menu_contact_phone','menu_chat','menu_cart','menu_cart_bags','menu_search_left','menu_search_right']
var menu_to=['#x2630','#x22ee','#x1f3e0','#x1f3e1','#x1f464','#x1f465','#xff20','#x1f4e5','#x1f4e7','#x1f4de','#x1f5ea','#x1f6d2','#x1f6cd','#x1f50d','#x1f50e']
var x_press_fr=[],x_press_to=[]
for(i=0;i<x_press_extra_fr.length;i++){x_p_f=x_press_extra_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(x_press_extra_to[i])}
for(i=0;i<punctuation_fr.length;i++){x_p_f=punctuation_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(punctuation_to[i])}
for(i=0;i<contact_fr.length;i++){x_p_f=contact_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(contact_to[i])}
for(i=0;i<faces_fr.length;i++){x_p_f=faces_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(faces_to[i])}
for(i=0;i<arrows_fr.length;i++){x_p_f=arrows_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(arrows_to[i])}
for(i=0;i<hands_fr.length;i++){x_p_f=hands_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(hands_to[i])}
for(i=0;i<people_fr.length;i++){x_p_f=people_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(people_to[i])}
for(i=0;i<hearts_fr.length;i++){x_p_f=hearts_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(hearts_to[i])}
for(i=0;i<monkeys_fr.length;i++){x_p_f=monkeys_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(monkeys_to[i])}
for(i=0;i<cats_fr.length;i++){x_p_f=cats_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(cats_to[i])}
for(i=0;i<search_fr.length;i++){x_p_f=search_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(search_to[i])}
for(i=0;i<menu_fr.length;i++){x_p_f=menu_fr[i].replace(/</g,'&lt');x_p_f=x_p_f.replace(/>/g,'&gt;');x_press_fr.push(x_p_f);x_press_to.push(menu_to[i])}
var spans_default_fr=['<indent>','<bullet>','<indbull>','<apost>','<level1>','<level2>','<level3>','<level4>','<level5>','<level6>','<level7>','<level8>','<level9>','<level10>','&lt;^&gt;','&lt;-^&gt;','&lt;^-&gt;','&lt;^^&gt;','&lt;-^^&gt;','&lt;^^-&gt;','&lt;-&gt;','<longdash>','<backslash>','<bold>','<italic>','<underline>','<nbspace>','<nbdash>','<nbhyphen>','<fontname:garamond>','<fontname:times>','<fontname:georgia>','<fontname:arial>','<fontname:tahoma>','<fontname:trebuchet>','<fontname:verdana>','<fontname:courier>','<fontname:trebuchet>','<fontname:googleheading>','<fontname:googletext>']
var spans_default_frend=['','','','','</level1>','</level2>','</level3>','</level4>','</level5>','</level6>','</level7>','</level8>','</level9>','</level10>','','','','','','','','','','</bold>','</italic>','</underline>','','','','</fontname:garamond>','</fontname:times>','</fontname:georgia>','</fontname:arial>','</fontname:tahoma>','</fontname:trebuchet>','</fontname:verdana>','</fontname:courier>','</fontname:trebuchet>','</fontname:googleheading>','</fontname:googletext>']
if(ss){sc='class="x_class_indent"'}else{sc='style="padding-left:1em"'}
var spanto1='<span '+sc+'></span>'
var spanto2=x_bullet+'<span '+sc+'></span>'
var spanto3='<span '+sc+'></span>'+x_bullet+'<span '+sc+'></span>'
var spanto4='&rsquo;'
var spans_default_to=[spanto1,spanto2,spanto3,spanto4,'<div>','<div>','<div>','<div>','<div>','<div>','<div>','<div>','<div>','<div>','&apos;','&lsquo;','&rsquo;','&quot;','&ldquo;','&rdquo;','&ndash;','&ndash;','&Backslash;','<b>','<i>','<u>','&nbsp;','&#x2011;','&#x2011;','<span style="font-family:garamond">','<span style="font-family:times new roman">','<span style="font-family:georgia">','<span style="font-family:arial">','<span style="font-family:tahoma">','<span style="font-family:trebuchet ms">','<span style="font-family:verdana">','<span style="font-family:courier new">','<span style="font-family:trebuchet">','<span style="font-family:'+x_font_google_heading+'">','<span style="font-family:'+x_font_google_text+'">']
var spans_default_toend=['','','','','</div>','</div>','</div>','</div>','</div>','</div>','</div>','</div>','</div>','</div>','','','','','','','','','','</b>','</i>','</u>','','','','</span>','</span>','</span>','</span>','</span>','</span>','</span>','</span>','</span>','</span>','</span>']
var x_press_spans_fr=[],x_press_spans_frend=[],x_press_spans_to=[],x_press_spans_toend=[]
for(i=0;i<x_press_spans_extra_fr.length;i++){
	x_p_f=x_press_spans_extra_fr[i];x_press_spans_fr.push(x_p_f)
	x_p_fend=x_press_spans_extra_frend[i];if(x_p_fend==''){}else{x_press_spans_frend.push(x_p_f)}
	x_press_spans_to.push(x_press_spans_extra_to[i])
	x_p_tend=x_press_spans_extra_toend[i];if(x_p_tend==''){}else{x_press_spans_toend.push(x_p_tend)}
}
for(i=0;i<spans_default_fr.length;i++){
	x_p_f=spans_default_fr[i];x_press_spans_fr.push(x_p_f)
	//x_p_fend=spans_default_frend[i];if(x_p_fend==''){}else{x_press_spans_frend.push(x_p_f)}
	x_p_fend=spans_default_frend[i];x_press_spans_frend.push(x_p_fend)
	x_p_t=spans_default_to[i];x_press_spans_to.push(x_p_t)
	//x_press_spans_to.push(spans_default_to[i])
	//x_p_tend=spans_default_toend[i];if(x_p_tend==''){}else{x_press_spans_toend.push(x_p_tend)}
	x_p_tend=spans_default_toend[i];x_press_spans_toend.push(x_p_tend)
	//alert(x_p_f+'!'+x_p_fend+'!'+x_p_t+'!'+x_p_tend)
}
//alert('fr'+x_press_spans_fr+'frend'+x_press_spans_frend+'to'+x_press_spans_to+'toend'+x_press_spans_toend)
var pos,i
if(x_press_test=='test'){
	k=0;s=''
	for(i=0;i<x_press_fr.length;i++){
	s+=x_press_fr[i]+' &'+x_press_to[i]+'; '
	k++;if(k>9){s+='<br>';k=0}
	}
	if(x_press_test_here===undefined || x_press_test_here==''){document.body.innerHTML=document.body.innerHTML+s}
	else{document.getElementById(x_press_test_here).innerHTML=s} 
}
else if(x_press_test=='javascript'){ /* change this block if change else block */ /* had to use % instead of & due to javascript */
	iH=x_press_test_here
	for(i=0;i<x_press_fr.length;i++){
	x_p_f='%'+x_press_fr[i]+';';x_p_t='&'+x_press_to[i]+';'
	pos=iH.indexOf(x_p_f);while(pos > 0){iH=iH.replace(x_p_f,x_p_t);pos=iH.indexOf(x_p_f)}
    }
	for(i=0;i<x_press_spans_fr.length;i++){
	x_p_f=x_press_spans_fr[i];x_p_fend=x_press_spans_frend[i];x_p_t=x_press_spans_to[i];x_p_tend=x_press_spans_toend[i]
	pos=iH.indexOf(x_p_f);while(pos > 0){
		iH=iH.replace(x_p_f,x_p_t)
		if(x_p_fend==''){}else{iH=iH.replace(x_p_fend,x_p_tend)}
		pos=iH.indexOf(x_p_f)
	}}
	return iH
	}
else{ /* change else if block if change this block */
	if(x_press_test_here===undefined || x_press_test_here==''){iH=document.body.innerHTML}
	else{iH=document.getElementById(x_press_test_here).innerHTML}
//	alert(x_press_test_here)
//alert(iH)
	for(i=0;i<x_press_fr.length;i++){
		x_p_f='&amp;'+x_press_fr[i]+';';x_p_t='&'+x_press_to[i]+';'
		pos=iH.indexOf(x_p_f);while(pos > 0){iH=iH.replace(x_p_f,x_p_t);pos=iH.indexOf(x_p_f)}
    }
	//alert(iH.length)
	//alert(iH.substr(11000,2558))
	//alert(iH.indexOf('synonymous',3759))
	//alert(iH.substr(5000,1000))
	for(i=0;i<x_press_spans_fr.length;i++){
		x_p_f=x_press_spans_fr[i];x_p_fend=x_press_spans_frend[i];x_p_t=x_press_spans_to[i];x_p_tend=x_press_spans_toend[i]
		//alert(x_p_f+'|'+x_p_fend+'|'+x_p_t+'|'+x_p_tend)
		pos=iH.indexOf(x_p_f)
		while(pos > 0){
			iH=iH.replace(x_p_f,x_p_t)
			if(x_p_fend==''){}else{iH=iH.replace(x_p_fend,x_p_tend)}
			pos=iH.indexOf(x_p_f)
		}
	}
//	alert(iH)
	if(x_press_test_here===undefined || x_press_test_here==''){document.body.innerHTML=iH}
	else{document.getElementById(x_press_test_here).innerHTML=iH} 
}}
/* find remaining test_here's and change from x_d_w to innerHTML - check and change all documentation, including in book*/
//X_ACCENT
function x_accent(x_accent_test,x_accent_test_here){
if(x_accent_test===undefined || x_accent_test=='' || x_accent_test=='test'){}
else{x_accent_test_here=x_accent_test}
var i,j,k,s,iH=document.body.innerHTML,x_a_f,x_a_t,pos
//note: r' won't work here if also running x_press, unless you execute x_accent first
var x_accent_fr=["'","`",",","^","..","_","~","o","c","u","v",".","-",'"']
var x_accent_letter_fr=[];for(i=0;i<26;i++){k=i+65;x_accent_letter_fr[i*2]=String.fromCharCode(k);x_accent_letter_fr[i*2+1]=x_accent_letter_fr[i*2].toLowerCase()}
var x_accent_to=["acute","grave","cedil","circ","uml","macr","tilde","ring","ogon","breve","caron","dot","strok","dblac"]
s=''
for(i=0;i<x_accent_fr.length;i++){
for(j=0;j<x_accent_letter_fr.length;j++){
x_a_f='&amp;'+x_accent_letter_fr[j]+x_accent_fr[i]+';';x_a_t='&'+x_accent_letter_fr[j]+x_accent_to[i]+';'
if(x_accent_valid(x_a_f)){
if(x_accent_test_here===undefined || x_accent_test_here==''){pos=iH.indexOf(x_a_f);while(pos > 0){iH=iH.replace(x_a_f,x_a_t);pos=iH.indexOf(x_a_f)}}
else{s+='<span>&amp;</span>'+x_accent_letter_fr[j]+x_accent_fr[i]+';'+' '+x_a_t+' '}
}}}
if(x_accent_test===undefined || x_accent_test_here==''){document.body.innerHTML=iH}
else{
	if(x_accent_test_here===undefined || x_accent_test_here==''){iH+=s;document.body.innerHTML=iH}
	else{document.getElementById(x_accent_test_here).innerHTML=s}
}}
function x_accent_valid(x_accent_f){
var x_a_l=x_accent_f.substr(5,1),U=x_a_l.toUpperCase()
var x_a_m=x_accent_f.substr(6,2);if(x_a_m.substr(1,1)==';'){x_a_m=x_a_m.substr(0,1)}
var is_valid=false
var U_is_vowel=false;if(U=='A' || U=='E' || U=='I' ||  U=='O' || U=='U'){U_is_vowel=true}
var U_is_vowel_or_Y=false;if(U_is_vowel || U=='Y'){U_is_vowel_or_Y=true}
if(x_a_m=="'"){if(U_is_vowel_or_Y || U=='C' || x_a_l=='g' || U=='L' || U=='N' || U=='R' || U=='S' || U=='Z'){is_valid=true}}
if(x_a_m=="`"){if(U_is_vowel){is_valid=true}}
if(x_a_m==","){if(U=='C' || x_a_l=='G' || U=='K' || U=='L' || U=='N' || U=='R' || U=='S' || U=='T'){is_valid=true}}
if(x_a_m=="^"){if(U_is_vowel_or_Y || U=='C' || U=='G' || U=='H' || U=='J' || U=='S' || U=='W'){is_valid=true}}
if(x_a_m==".."){if(U_is_vowel_or_Y){is_valid=true}}
if(x_a_m=="_"){if(U_is_vowel){is_valid=true}}
if(x_a_m=="_"){if(U_is_vowel){is_valid=true}}
if(x_a_m=="~"){if(U=='A' || U=='O' || U=='I' || U=='U' || U=='N'){is_valid=true}}
if(x_a_m=="o"){if(U=='A' || U=='U'){is_valid=true}}
if(x_a_m=="c"){if(U=='A' || U=='E' || U=='I' || U=='U'){is_valid=true}} 
if(x_a_m=="u"){if(U=='A' || U=='G' || U=='U'){is_valid=true}}
if(x_a_m=="v"){if(U=='C' || U=='D' || U=='E' || U=='L' || U=='N' || U=='R' || U=='S' || U=='T' || U=='Z'){is_valid=true}}
if(x_a_m=="."){if(U=='C' || U=='E' || U=='G' || x_a_l=='I' || U=='Z'){is_valid=true}}
if(x_a_m=="-"){if(U=='D' || U=='H' || U=='L' || U=='T'){is_valid=true}}
if(x_a_m=='"'){if(U=='O' || U=='U'){is_valid=true}}
return is_valid}
//X_SCRIPT
//function x_script(x_script_in,x_script_style){x_d_w(x_script_fmt(x_script_in,x_script_style))}
function x_script(x_script_in,x_script_style,x_el){x_script_ih(x_script_in,x_script_style,x_el)}
function x_script_ih(x_script_in,x_script_style,x_el){document.getElementById(x_el).innerHTML=x_script_fmt(x_script_in,x_script_style)}
function x_script_fmt(x_script_in,x_script_style){
var i,j,k,s,out='',sfx,kind=0,kind3,x_in,x_inj,offset,x_inU,x_inl,x_letter_value,x_unicode_value_dec,word_start,word_stop,word_length,in_a_word,word_end_char,word_Cap,word_ignore,reset_vars,word_scrnchd,x_script_in_length=x_script_in.length,x_s_in=x_script_in,x_s_in_br=true,x_s_style=x_script_style
var vowels=['a','e','i','o','u']
if(x_s_style==null){x_s_style='handwriting'}
x_s_style=x_s_style.toLowerCase()
x_s_style=x_s_style.replace('-','');x_s_style=x_s_style.replace(' ','')
if(x_s_style=='handwriting' || x_s_style=='script'){sfx='scr';kind=1}
if(x_s_style=='outline' || x_s_style=='doublestruck'){sfx='opf';kind=1}
if(x_s_style=='oldenglish' || x_s_style=='blackletter'){sfx='fr';kind=1}
if(x_s_style=='circle' || x_s_style=='encircled'){kind=2}
if(x_s_style=='scrunched'){kind=3;kind3=1};if(x_s_style=='scrunchedstacked'){kind=3;kind3=2};if(x_s_style=='scrunchedvowels'){kind=3;kind3=3}
if(x_s_style=='vertical'){kind=4;kind3=1}
if(x_s_style=='vertical_entities'){kind=4;kind3=2}
if(kind==0){alert(x_s_style+' is not a valid style for x_script()');out=x_s_in}
if(kind==1){
	for(i=0;i<x_s_in.length;i++){
		x_in=x_s_in[i]
		if(x_in.match(/[a-z]/i)){out+='&'+x_in+sfx+';'}
		else{out+=x_in}
	}
}
if(kind==2){
	for(i=0;i<x_s_in.length;i++){
		x_in=x_s_in[i]
		if((x_in>='A' && x_in<='Z') ||(x_in>='a' && x_in<='z') ||(x_in>='1' && x_in <='9')){
			if(x_in>='a'){offset=9327}else{if(x_in>='A'){offset=9333}else{offset=9263}}
			letter_value=x_in.charCodeAt(0)
			unicode_value_dec=(letter_value+offset).toString()
			out+='&#'+unicode_value_dec+';'
		}
		else{out+=x_in}
	}
}
if(kind==3){
reset_vars=true
for(i=0;i<x_script_in_length;i++){
	if(reset_vars){reset_vars=false;in_a_word=false;word_Cap=false;word_ignore=false;word_end_char=false;word_start=-1;word_stop=-1;word_length=0}
	x_in=x_s_in[i];x_inU=false;x_inl=false
	if(x_in>='A' && x_in<='Z'){x_inU=true}
	if(x_in>='a' && x_in<='z'){x_inl=true}
	if(x_in=='.' || x_in==',' || x_in=='!' || x_in=='?' || x_in==':' || x_in==';' || x_in==')' || x_in==' '){word_end_char=true}
	if(x_inU){word_Cap=true}
	if(x_inU || x_inl){if(in_a_word==false){in_a_word=true;word_start=i}}
	if(x_inU && in_a_word && i>word_start){word_ignore=true} //ignore scrunch if other than first letter is cap
	if(in_a_word){
		if(i==x_script_in_length-1){word_stop=i}
		if(word_end_char){word_stop=i-1} // overrides previous statement if both statements are true
		if(word_stop > -1){
			word_length=word_stop - word_start + 1
			if((word_length==2 || word_length==3) && word_ignore==false){
				word_scrnchd='';k=0
				for(j=word_start;j<=word_stop;j++){
					x_inj=x_s_in[j]
					if(k==0){
						if(word_Cap){word_scrnchd+=x_inj}
						else{
							if(kind3==2){word_scrnchd+='<sup>'+x_inj+'</sup>'}
							else{
								if(kind3==3){if(vowels.includes(x_inj)>0){word_scrnchd+='<span class="x_class_font_smaller">'+x_inj+'</span>'}}
								else{word_scrnchd+='<span class="x_class_font_smaller">'+x_inj}}
							}
					}
					if(k==1){if(kind3==2){word_scrnchd+='<span class="x_class_font_smaller">'+x_inj+'</span>'}else{if(word_Cap){word_scrnchd+='<span class="x_class_font_smaller">'};word_scrnchd+=x_inj}}
					if(k==2){if(kind3==2){word_scrnchd+='<sub>'+x_inj+'</sub>'}else{word_scrnchd+=x_inj}}
					k++
				}
				out+=word_scrnchd
				if(kind3==2){}else{out+='</span>'}
			}
			else{
				if(kind3==3){
					for(j=word_start;j<=word_stop;j++){
						if(vowels.includes(x_s_in[j])>0){out+='<span class="x_class_font_smaller">'+x_s_in[j]+'</span>'}
						else{out+=x_s_in[j]}
					}
				}
				else{
					for(j=word_start;j<=word_stop;j++){
						out+=x_s_in[j]
					}
				}
			}
			if(word_end_char){out+=x_in}
			reset_vars=true
		}
	}
	else{out+=x_in;reset_vars=true}
}}
if(kind==4){
//	out+='<div style="text-align:center;">'
	for(i=0;i<x_s_in.length;i++){
		x_in=x_s_in[i]
		if(kind3==2){
			if(x_in=='&'){x_s_in_br=false}
			if(x_in==';'){x_s_in_br=true}
		}
		out+=x_in
		if(x_s_in_br){out+='<br>'}
	}
//	out+='</div>'
	out=out.substr(0,out.length-4)
}
return out}
//X_EMOJI_INIT
function x_emoji_init(){
x_emoji_color_names=['base',  'face',  'hand',  'heart', 'monkey','monk',  'cat',   'person','weather','red',   'purple','blue',  'yellow','pink',  'green', 'gray',  'black','brown','orange','white']
x_emoji_color_codes=['191970','D2B48C','DEB887','CD5C5C','D2691E','191970','FF8C00','191970','191970','ff0000','800080','0000ff','ffff00','FAAFBE','00ff00','808080','000000','A52A2A','ffa500','C0C0C0']
x_emoji_code_extra=[];x_emoji_unicode_extra=[];x_emoji_color_extra=[]
x_emoji_limit=-1
}
function x_emoji(x_emoji_style,x_emoji_test,x_emoji_test_here){
if(x_emoji_test===undefined || x_emoji_test=='' || x_emoji_test=='test'){}
else{x_emoji_test_here=x_emoji_test}
var iH
if(x_press_test_here===undefined || x_press_test_here==''){iH=document.body.innerHTML}
else{iH=document.getElementById(x_press_test_here).innerHTML} 
var i,j,k,s,x_e_f,x_e_t
var x_emoji_code=[],x_emoji_unicode=[],x_emoji_color=[],this_color_code,color_names_limit,pos,color_set
for(i=0;i<x_emoji_code_extra.length;i++){
x_emoji_code.push(x_emoji_code_extra[i])
x_emoji_unicode.push(x_emoji_unicode_extra[i])
x_emoji_color.push(x_emoji_color_extra[i])
}
var e_code=[],e_unicode=[],e_color=[]
e_code.push('joy','heart_eyes','unamused','blush','two_hearts','weary','ok_hand','pensive','smirk','grin')
e_unicode.push('1f602','1f60d','1f612','1f60a','1f495','1f629','1f44c','1f614','1f60f','1f601')
e_color.push('face','face','face','face','heart','face','hand','face','face','face')
e_code.push('wink','pray','thumbsup','relieved','flushed','raised_hands','notes','recycle','v','see_no_evil')
e_unicode.push('1f609','1f64f','1f44d','1f60c','1f633','1f64c','1f3b6','267b','270c','1f648')
e_color.push('face','monk','hand','face','face','monk','base','green','hand','monkey')
e_code.push('sunglasses','eyes','cry','sweat_smile','sparkles','smiley','purple_heart','100','sparkling_heart','information_desk_person')
e_unicode.push('1f60e','1f440','1f622','1f605','2728','1f604','1f49c','1F4AF','1f496','1f481')
e_color.push('face','base','face','face','yellow','face','purple','red','heart','person')
e_code.push('broken_heart','blue_heart','stuck_out_tongue_winking_eye','disappointed','yum','neutral_face','clap','cupid','sleeping','revolving_hearts')
e_unicode.push('1f494','1f499','1f61c','1f61e','1f60b','1f610','1f44f','1f498','1f62a','1f49e')
e_color.push('heart','blue','face','face','face','face','hand','heart','face','heart')
e_code.push('heartpulse','speak_no_evil','hand','kiss','point_right','cherry_blossom','scream','smiling_imp','rage','fire')
e_unicode.push('1f497','1f64a','270b','1f48b','1f449','1f338','1f631','1f608','1f621','1f525')
e_color.push('heart','monkey','hand','red','hand','pink','gray','purple','red','yellow')
e_code.push('smile','tired_face','arrow_left','tada','stuck_out_tongue_closed_eyes','rose','sunny','muscle','triumph','point_left')
e_unicode.push('1f603','1f62b','2b05','1f389','1f61d','1f339','2600','1f4aa','1f624','1f448')
e_color.push('face','face','base','face','face','red','yellow','hand','face','hand')
e_code.push('sweat','yellow_heart','heavy_check_mark','laughing','wave','heart_eyes_cat','mask','persevere','green_heart','camera')
e_unicode.push('1f613','1f49b','2714','1f606','1f44b','1f63b','1f637','1f623','1f49a','1f4f7')
e_color.push('face','yellow','base','face','hand','cat','face','face','green','base')
e_code.push('heartbeat','crown','kissing_closed_eyes','disappointed_relieved','arrow_forward','confounded','headphones','white_check_mark','angry','innocent')
e_unicode.push('1f493','1f451','1f61a','1f625','25b6','1f616','1f3a7','2705','1f620','1f607')
e_color.push('heart','yellow','face','face','base','face','base','white','face','face')
e_code.push('raising_hand','star2','thumbsdown','dancer','arrow_right','no_mouth','musical_note','dizzy','no_good','red_circle')
e_unicode.push('1f64b','1f31f','1f44e','1f483','27a1','1f636','1f3b5','1f4ab','1f645','1f534')
e_color.push('monk','yellow','hand','red','base','face','base','base','monk','red')
e_code.push('copyright','point_down','gem','pizza','penguin','cold_sweat','tongue','sweat_drops','zzz','joy_cat')
e_unicode.push('a9','1f447','1f48e','1f355','1f427','1f630','1f445','1f4a6','1f4a4','1f639')
e_color.push('base','hand','blue','yellow','black','face','hand','base','base','cat')
e_code.push('ballot_box_with_check','heart','sob','sleepy','imp','open_hands','fallen_leaf','ribbon','airplane','balloon')
e_unicode.push('2611','2665','1f622','1f62a','1f47f','1f450','1f342','1f380','2708','1f388')
e_color.push('base','heart','face','face','purple','hand','red','pink','gray','red')
e_code.push('four_leaf_clover','underage','fearful','arrow_backward','hibiscus','alien','bow','nail_care','cloud','x')
e_unicode.push('1f340','1f51e','1f628','25c0','1f33a','1f47d','1f647','1f485','2601','274c')
e_color.push('green','red','gray','base','pink','gray','monk','pink','white','base')
e_code.push('angel','microphone','palm_tree','snowflake','ghost','rainbow','heavy_exclamation_mark','bangbang','point_up','soccer')
e_unicode.push('1f47c','1f3a4','1f334','2744','1f47b','1f308','2757','203c','261d','26bd')
e_color.push('white','base','green','white','gray','purple','base','base','hand','black')
e_code.push('crescent_moon','gift','heart_decoration','clubs','heavy_multiplication_x','gift_heart','movie_camera','anchor','runner','beers')
e_unicode.push('1f319','1f381','1f49f','2663','2716','1f49d','1f3a5','2693','1f3c3','1f37b')
e_color.push('yellow','red','heart','black','base','heart','base','gray','person','hand')
e_code.push('sunflower','couple','moneybag','christmas_tree','bouquet','dog','birthday','herb','dizzy_face','tulip')
e_unicode.push('1f33b','1f46b','1f4b0','1f384','1f490','1f436','1f382','1f33f','1f635','1f337')
e_color.push('yellow','person','green','green','pink','brown','white','green','face','red')
e_code.push('coffee','ring','basketball','couplekiss','astonished','hear_no_evil','cactus','money_with_wings','dash','hotsprings')
e_unicode.push('2615','1f48d','1f3c0','1f48f','1f632','1f649','1f335','1f4b8','1f4a8','2668')
e_color.push('black','gray','black','person','face','monkey','green','green','white','weather')
e_code.push('crying_cat_face','person_frowning','princess','massage','maple_leaf','phone','confetti_ball','love_letter','hocho','ok')
e_unicode.push('1f63f','1f64d','1f478','1f486','1f341','260e','1f38a','1f48c','1f52a','1f197')
e_color.push('cat','monk','person','person','red','base','white','heart','gray','base')
e_code.push('trophy','cyclone','doughnut','blossom','fries','rocket','santa','lollipop','imp','umbrella')
e_unicode.push('1f3c6','1f300','1f369','1f33c','1f35f','1f680','1f385','1f36d','1f47f','2614')
e_color.push('yellow','weather','brown','yellow','brown','gray','red','yellow','purple','weather')
e_code.push('anger','ocean','couple_with_heart','football','pig','guitar','diamonds','lips','speech_balloon','snowman')
e_unicode.push('1f4a2','1f30a','1f491','1f3c8','1f437','1f3b8','2666','1f444','1f4ac','26c4')
e_color.push('base','blue','heart','brown','pink','brown','red','red','base','white')
e_code.push('spades','panda_face','smirk_cat','musical_score','smiley_cat','eggplant','banana','small_orange_diamond','fork_and_knife','clapper')
e_unicode.push('2660','1f43c','1f63c','1f3bc','1f638','1f346','1f34c','1f538','1f374','1f3ac')
e_color.push('black','black','cat','base','cat','purple','yellow','orange','gray','base')
e_code.push('partly_sunny','baby','iphone','crystal_ball','paw_prints','feet','watermelon','top','strawberry','closed_book')
e_unicode.push('26c5','1f476','1f4f1','1f52e','1f43e','1f463','1f349','1f51d','1f353','1f4d5')
e_color.push('weather','face','base','gray','base','base','red','base','red','base')
e_code.push('beer','wine_glass','warning','turtle','milky_way','tiger','rabbit','honeybee','snake','tropical_drink')
e_unicode.push('1f37a','1f377','26a0','1f422','1f30c','1f42f','1f430','1f41d','1f40d','1f379')
e_color.push('yellow','purple','base','green','weather','yellow','gray','black','black','white')
e_code.push('frog','hamburger','black_small_square','peach','rotating_light','bear','cherries','minidisc','candy','oncoming_automobile')
e_unicode.push('1f438','1f354','25aa','1f351','1f6a8','1f43b','1f352','1f4bf','1f36c','1f697')
e_color.push('green','brown','black','yellow','red','brown','red','black','yellow','base')
e_code.push('octopus','jack_o_lantern','hatching_chick','syringe','chocolate_bar','smile_cat','video_game','pineapple','pill','icecream')
e_unicode.push('1f419','1f383','1f423','1f489','1f36b','1f63a','1f3ae','1f34d','1f48a','1f366')
e_color.push('black','orange','yellow','black','brown','cat','black','yellow','white','white')
e_code.push('cocktail','cake','tv','whale','tm','no_entry_sign','dolphin','cookie','ear_of_rice','video_camera')
e_unicode.push('1f378','1f370','1f4fa','1f433','2122','1f6ab','1f42c','1f36a','1f33e','1f4f9')
e_color.push('white','white','black','gray','base','base','gray','brown','white','base')
for(i=0;i<e_code.length;i++){
x_emoji_code.push(e_code[i])
x_emoji_unicode.push(e_unicode[i])
x_emoji_color.push(e_color[i])
}
if(x_emoji_limit==-1){x_emoji_limit=x_emoji_code.length}
if(x_emoji_test=='test'){
	k=0;s=''
	for(i=0;i<x_emoji_limit;i++){
		this_color_code='000000'
		color_names_limit=x_emoji_color_names.length
		for(j=0;j<color_names_limit;j++){
			if(x_emoji_color_names[j]==x_emoji_color[i]){this_color_code=x_emoji_color_codes[j];j=color_names_limit}
		}
		s+='<span>:</span>'+x_emoji_code[i]+': <span style="color:#'+this_color_code+';'+x_emoji_style+'">&#x'+x_emoji_unicode[i]+';</span> '
		k++;if(k>9){s+='<br>';k=0}
	}
	if(x_emoji_test_here===undefined || x_emoji_test_here==''){document.body.innerHTML=iH+s}
	else{document.getElementById(x_emoji_test_here).innerHTML=s}
}
else{
	for(i=0;i<x_emoji_limit;i++){
		x_e_f=':'+x_emoji_code[i]+':'
		pos=iH.indexOf(x_e_f);color_set=false
		while(pos > 0){
			if(color_set){}
			else{
				color_names_limit=x_emoji_color_names.length
				for(j=0;j<color_names_limit;j++){
					if(x_emoji_color_names[j]==x_emoji_color[i]){this_color_code=x_emoji_color_codes[j];j=color_names_limit}
				}
				color_set=true
			}
			x_e_t='<span style="color:#'+this_color_code+';'+x_emoji_style+'">&#x'+x_emoji_unicode[i]+';</span>'
			iH=iH.replace(x_e_f,x_e_t)
			pos=iH.indexOf(x_e_f)
		}
	}
	x_e_f='\:\\';x_e_t=':'
	pos=iH.indexOf(x_e_f);while(pos > 0){iH=iH.replace(x_e_f,x_e_t);pos=iH.indexOf(x_e_f)}
	if(x_press_test_here===undefined || x_press_test_here==''){document.body.innerHTML=iH}
	else{document.getElementById(x_press_test_here).innerHTML=iH} 
	}
}
//function x_date(x_date_in,x_date_fmt_out){x_d_w(x_date_fmt(x_date_in,x_date_fmt_out))}
function x_date(x_date_in,x_date_fmt_out,x_el){x_date_ih(x_date_in,x_date_fmt_out,x_el)}
function x_date_ih(x_date_in,x_date_fmt_out,x_el){x_ih(x_date_fmt(x_date_in,x_date_fmt_out),x_el)}//Note if x_date_in is string, separate date parts with slash to pass the date regardless of timezone. Separate date parts with hyphen to pass the date using time zone
function x_date_fmt(x_date_in,x_date_fmt_out){
if(x_date_fmt_out.toUpperCase()=='UTC'){return x_date_in.toUTCString()}
var dd_name=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var mm_name=["January","February","March","April","May","June","July","August","September","October","November","December"]
if(x_date_in==''){x_date_in=new Date()}
if(x_date_fmt_out==''){x_date_fmt_out='dd-mmm-yyyy'}
if(typeof x_date_in ==='string'){x_date_in=new Date(x_date_in)}
var yyyy=x_date_in.getFullYear(),mm=x_date_in.getMonth()+1,hh24=x_date_in.getHours()
if(hh24>12){x_date_hh=hh24-12;ap='pm'}else{x_date_hh=hh24;ap='am'}
var ss=x_date_in.getSeconds(),out=x_date_fmt_out
out=out.replace('yyyy',yyyy.toString()).replace('yy',x_pad(yyyy.toString().substr(2,2),2))
var mmmm=mm_name[mm - 1]
out=out.replace('mmmm',mmmm).replace('mmm',mmmm.substr(0,3)).replace('mm',x_pad(mm.toString(),2))
var dddd=dd_name[x_date_in.getDay()]
out=out.replace('dddd',dddd).replace('ddd',dddd.substr(0,3)).replace('dd',x_pad(x_date_in.getDate().toString(),2)).replace('hh24',x_pad(hh24.toString(),2)).replace('hh',x_pad(x_date_hh.toString(),2))
var mi=x_pad(x_date_in.getMinutes(),2).toString()
out=out.replace('mi',mi).replace('mn',mi)
var ss_padded=x_pad(ss,2).toString()
if(ss==0){out=out.replace(':ss','');out.replace('.ss','')}else{out=out.replace('ss',ss_padded)}
out=out.replace('sc',ss_padded).replace('am',ap).replace('ap',ap).replace('pm',ap)
return out}
function x_word_to_html(x_word_string,x_express_true_false){
x_html_string=x_word_string.replace(/(?:\r\n|\r|\n)/g,'<br>')
if(x_express_true_false){x_replace="&';"}
else{x_replace="&rsquo;"}
x_html_string=x_html_string.replace(/’/g,x_replace)
if(x_express_true_false){x_replace="&l';"}
else{x_replace="&lsquo;"}
x_html_string=x_html_string.replace(/‘/g,x_replace)
if(x_express_true_false){x_replace='&r";'}
else{x_replace="&rdquo;"}
x_html_string=x_html_string.replace(/”/g,x_replace)
if(x_express_true_false){x_replace='&l";'}
else{x_replace="&ldquo;"}
x_html_string=x_html_string.replace(/“/g,x_replace)
//&n-; is not translated by x_press for long dashes, so have to use &ndash;
x_html_string=x_html_string.replace(/\–/g,'&ndash;')
x_html_string=x_html_string.replace(/\—/g,'&mdash;')
//if(x_express_true_false){x_replace='&n-;'}
//else{x_replace="&ndash;"}
//x_html_string=x_html_string.replace(/\-/g,x_replace)
if(x_express_true_false){x_html_string=x_html_string.replace(/…/g,'&...;')}
else{x_html_string=x_html_string.replace(/…/g,'&hellip;')}
/*--> in Word*/
if(x_express_true_false){x_html_string=x_replace_all(x_html_string,'','&->;')}
else{x_html_string=x_replace_all(x_html_string,'','&rarr;')}
/*==> in Word(not bullet) */
if(x_express_true_false){x_html_string=x_replace_all(x_html_string,'','&=>;')}
else{x_html_string=x_replace_all(x_html_string,'','&rArr;')}
if(x_express_true_false){x_html_string=x_html_string.replace(/😊/g,'&:);')}
else{x_html_string=x_html_string.replace(/😊/g,'&#x1f603;')}
/* frown */
if(x_express_true_false){x_html_string=x_html_string.replace(/☹/g,'&:(;')}
else{x_html_string=x_html_string.replace(/☹/g,'&#x1f622;')}
return x_html_string
}
function x_word_to_html_form(x_express_true_false){document.getElementById('textarea').value=x_word_to_html(document.getElementById('textarea').value,x_express_true_false)}
function x_replace_all(x_str,x_match,x_replace){var i;for(i=0;i<x_str.length-1;i++){x_str=x_str.replace(x_match,x_replace)};return x_str}
function x_repeat(x_a,x_n,x_m){
if(x_m===undefined || x_m=='' || x_m==0){x_m=1}
var x_a_n=''
for(i=0;i<Math.round(x_n/x_m);i++){x_a_n+=x_a}
return x_a_n
}
//x_css_display_property: none,block,inline,inline-block
function x_css_display(x_element_id,x_css_display_property){document.getElementById(x_element_id).style.display=x_css_display_property}
//x_class deprecated - use x_class_modify instead. x_class changes the transparency of all elements with class x_transparency. x_class_modify is more generic.
function x_class(x_class_class,x_class_value){
var x_list,i
if(x_class_class=='x_transparency'){
	x_list=document.getElementsByClassName(x_class_class)
	for(i=0;i<x_list.length;i++){ x_list[i].style.opacity=1-x_class_value}
}
}
//x_class_modify - changes the attribute values of a class
function x_class_modify(x_class_class,x_class_attribute,x_class_attribute_value){
var x_list=document.getElementsByClassName(x_class_class),x_attribute=[],x_value=[]
if(Array.isArray(x_class_attribute)){
	x_attribute=x_class_attribute
	x_value=x_class_attribute_value
}
else{
	x_attribute[0]=x_class_attribute
	x_value[0]=x_class_attribute_value
}
var i,j
for(i=0;i<x_list.length;i++){
	for(j=0;j<x_attribute.length;j++){
		if(x_attribute[j]=='transparency'){x_attribute[j]='opacity';x_value[j]=(100-x_value[j])/100}
		//color - background-color,color
		if(x_attribute[j]=='color'){
			if(Array.isArray(x_value)){
				x_list[i].style['background-color']=x_value[j][0]
				x_value[j]=x_value[j][1]
			}
		}
		x_list[i].style[x_attribute[j]]=x_value[j]
	}
}
}
function x_contact(contact_who,contact_msg,contact_type,span_start,span_end,x_el){x_contact_ih(contact_who,contact_msg,contact_type,span_start,span_end,x_el)}
function x_contact_ih(contact_who,contact_msg,contact_type,span_start,span_end,x_el){
if(contact_msg==contact_who || contact_msg==''){
	contact_who=contact_who.replace(/x/g,'').replace(/!/g,'@')
	contact_msg=contact_who
	span_start=span_start.replace(/emoji/g,'&#x1f4e7;')
	contact_a='<a href="mailto:'+contact_who+'">'+span_start+contact_msg+span_end+'</a>'
}
else{
	contact_who=contact_who.replace(/x/g,'').replace(/!/g,'@')
	span_start=span_start.replace(/emoji/g,'&#x1f4e7;')
	contact_a='<a href="mailto:'+contact_who+'">'+span_start+contact_msg+span_end+'</a>'
}
if(contact_type=='phone'){contact_a=contact_a.replace(/mailto/g,'tel').replace(/1f4e7/g,'1f4f1')}
document.getElementById(x_el).innerHTML=contact_a
}
//x_hint - simple version of x_tip_ih;x_tip_ih is in x_press_in_body.js
function x_hint(x_hint_text,x_hint,x_el){x_w('<span title="'+x_hint+'" alt="'+x_hint+'" style="'+x_hint_style+'">'+x_hint_text+'</span>',x_el)}
function x_social_init(){
x_metas()//get meta tags
x_preferred_social_connect_sites=['fb','x','lk','wh','ig']
x_preferred_social_connect_titles=['','','','','','']
x_preferred_social_connect_urls=['','','','','','']//need full profile url, so website editor will have to override
x_preferred_social_connect_buttons=['','','','','','']
x_preferred_social_connect_font_icons=['','','','','','']
x_preferred_social_follow_sites=['']
x_preferred_social_follow_titles=['']
x_preferred_social_follow_urls=['']//need full profile url, so website editor will have to override
x_preferred_social_follow_buttons=['']
x_preferred_social_follow_font_icons=['']
x_social_connect_sites=['fb','x','lk','wh','ig','te','ln','vk','wb','sc','md','bs']
x_social_connect_titles=['Facebook','X','LinkedIn','WhatsApp','Instagram','Telegram','Line','VKontakte','Weibo','snapchat','medium','Bluesky']
//youtube requires a special request to use their icon
x_social_connect_titles_lowercase=['facebook','x','linkedin','ehatsapp','instagram','telegram','line','vkontakte','weibo','snapchat','medium','bluesky']
x_social_connect_buttons=['https://stubbart.com/computer_consulting/code/x_social/fb-f.png','https://stubbart.com/computer_consulting/code/x_social/x-logo-black.png','https://stubbart.com/computer_consulting/code/x_social/lk-in.png','https://stubbart.com/computer_consulting/code/x_social/wh-phone.png','https://stubbart.com/computer_consulting/code/x_social/rd-alien.png','https://stubbart.com/computer_consulting/code/x_social/te-plane.png','https://stubbart.com/computer_consulting/code/x_social/ln-line.png','https://stubbart.com/computer_consulting/code/x_social/vk.png','https://stubbart.com/computer_consulting/code/x_social/wb.png','https://stubbart.com/computer_consulting/code/x_social/sc.png','https://stubbart.com/computer_consulting/code/x_social/md.png','https://stubbart.com/computer_consulting/code/x_social/bs.png']
x_social_connect_font_icons=['fab fa-facebook-f','fa-brands fa-x-twitter','fab fa-inkedin-in','fab fa-whatsapp','fab fa-instagram','fab fa-reddit-alien','fab fa-telegram-plane','fab fa-line','fab fa-vk','fab fa-weibo','fab fa-snapchat-ghost','fab fa-medium-m','fabrands fa-bluesky']
x_social_connect_img_i='img'//alternatively i or span for font
x_preferred_social_share_sites=['fb','tw','pi','lk','wh','rd','em']
x_preferred_social_share_br=['','','','','','','']
x_social_share_sites=['fb','tw','pi','lk','wh','em','pr','rd','te','ln','vk','wb','bs']
x_social_share_titles=['Facebook','X','Pinterest','LinkedIn','WhatsApp','Email','Print','Reddit','Telegram','Line','VKontakte','Weibo','Bluesky']
x_social_share_titles_lowercase=['facebook','x','pinterest','linkedin','whatsapp','email','print','reddit','telegram','line','vkontakte','weibo','bluesky']
// urls at https://www.sharelinkgenerator.com/(master list), https://iotools.cloud/tool/share-links-generator/ (if not on master list)
x_social_share_urls=['https://www.facebook.com/sharer.php','https://twitter.com/intent/tweet','https://www.pinterest.com/pin/create/button','https://www.linkedin.com/shareArticle','whatsapp://send','mailto:','javascript:window.print()','https://reddit.com/submit','https://telegram.me/share/url','https://line.me/R/msg/text/','https://vk.com/share.php','https://service.weibo.com/share/share.php','https://bsky.app/intent/compose']
x_social_share_urls_url=['u','url','url','url','text','','','url','url','iu','','url','url','url']
x_social_share_urls_title=['','text','description','title','','subject','title','text','it','','','title','text']
x_social_share_buttons=['https://stubbart.com/computer_consulting/code/x_social/fb.png','https://stubbart.com/computer_consulting/code/x_social/x-logo-black.png','https://stubbart.com/computer_consulting/code/x_social/pi.png','https://stubbart.com/computer_consulting/code/x_social/lk.png','https://stubbart.com/computer_consulting/code/x_social/wh.png','https://stubbart.com/computer_consulting/code/x_social/em.png','https://stubbart.com/computer_consulting/code/x_social/pr.png','https://stubbart.com/computer_consulting/code/x_social/rd.png','https://stubbart.com/computer_consulting/code/x_social/te.png','https://stubbart.com/computer_consulting/code/x_social/ln.png','https://stubbart.com/computer_consulting/code/x_social/vk.png','https://stubbart.com/computer_consulting/code/x_social/wb.png','https://stubbart.com/computer_consulting/code/x_social/bs.png']
x_social_share_font_icons=['fab fa-facebook-square','fa-brands fa-x-twitter-square','fab fa-pinterest-square','fab fa-inkedin','fab fa-whatsapp-square','fas fa-envelope-square','fas fa-print','fab fa-reddit-square','fab fa-telegram','fab fa-line','fab fa-vk','fab fa-weibo','fabrands fa-bluesky']
x_social_share_img_i='img'//alternatively i or span for font
x_social_share_direction='h'//alternatively v for vertical
}
function x_social_connect(string_connector,end_string_connector,x_el,connect_follow){
var container='',psc_limit,psc_a=[],xsc_i,i,psc_sites=[],psc_titles=[],psc_urls=[],psc_buttons=[],psc_font_icons=[]
var a='<a href="'
var b='" target="_blank" rel="nofollow">'
if(connect_follow===undefined || connect_follow=='connect'){
	psc_limit=x_preferred_social_connect_sites.length
	psc_sites=structuredClone(x_preferred_social_connect_sites)
	psc_titles=structuredClone(x_preferred_social_connect_titles)
	psc_urls=structuredClone(x_preferred_social_connect_urls)
	psc_buttons=structuredClone(x_preferred_social_connect_buttons)
	psc_font_icons=structuredClone(x_preferred_social_connect_font_icons)
}
else{
	psc_limit=x_preferred_social_follow_sites.length
	psc_sites=structuredClone(x_preferred_social_follow_sites)
	psc_titles=structuredClone(x_preferred_social_follow_titles)
	psc_urls=structuredClone(x_preferred_social_follow_urls)
	psc_buttons=structuredClone(x_preferred_social_follow_buttons)
	psc_font_icons=structuredClone(x_preferred_social_follow_font_icons)
}
for(i=0;i<psc_limit;i++){
	if(i>0){
		if(i==psc_limit-1){
			if(psc_limit==2 && (end_string_connector.substr(0,1)==',' || end_string_connector.substr(0,1)==';')){
				container+=end_string_connector.substr(1,end_string_connector.length-1)
			}
			else{container+=end_string_connector}
		}
		else{container+=string_connector}
	}
	psc_a[i]=a+psc_urls[i]+b
	xsc_i=x_social_connect_sites.indexOf(psc_sites[i])
	if(xsc_i>=0){
		if(x_social_connect_img_i=='img'){psc_a[i]+='<img src="'+x_social_connect_buttons[xsc_i]+'" class="x_class_social_connect_button" title="'+x_social_connect_titles[xsc_i]+'"></a>'}
		else{psc_a[i]+='<'+x_social_connect_img_i+' class="'+x_social_connect_font_icons[xsc_i]+'"></'+x_social_connect_img_i+'>'}
	}
	else{
		if(x_social_connect_img_i=='img'){psc_a[i]+='<img src="'+psc_buttons[i]+'" class="x_class_social_connect_button" title="'+psc_titles[i]+'"></a>'}
		else{psc_a[i]+='<'+x_social_connect_img_i+' class="'+psc_font_icons[i]+'"></'+x_social_connect_img_i+'>'}
	}
//	alert(psc_a[i])
	container+=psc_a[i]
}
document.getElementById(x_el).innerHTML=container
}
function x_social_share(x_el,button_class){
var container='',pss_limit=x_preferred_social_share_sites.length,pss_a=[],xss_i,xss_limit=x_social_share_sites.length,i
var a='<a href="'
var b='" target="_blank" rel="nofollow">'
//special handling 
// - email - body=url+crlf+description; has no url - ? before subject=; body should have 2 linefeeds followed by 'More information at 'url
// - twitter - handle
// - line only has ? before url
// - printer - no url
var pss_special=['tw','em','pr','ln']
if(button_class===undefined){button_class='x_class_social_share_button'}
for(i=0;i<pss_limit;i++){
	xss_i=x_social_share_sites.indexOf(x_preferred_social_share_sites[i])
	if(pss_special.includes(x_preferred_social_share_sites[i])){
		if(x_preferred_social_share_sites[i]=='tw'){pss_a[i]=a+x_social_share_urls[xss_i]+'?'+x_social_share_urls_url[xss_i]+'='+x_meta_og_url+'%26'+x_social_share_urls_title[xss_i]+x_meta_og_title
			if(typeof x_meta_twitter_site=='undefined' || x_meta_twitter_site==''){}
			else{pss_a[i]+='&'+x_meta_twitter_site}
			pss_a[i]+=b}
		if(x_preferred_social_share_sites[i]=='em'){
			pss_a[i]=a+x_social_share_urls[xss_i]
			pss_a[i]+='?subject='+x_meta_title.replaceAll(' ','%20')
			pss_a[i]+='&body='+'(Insert your own message here)'.replaceAll(' ','%20')+'%0D%0A'+'%0D%0A'+'More information at '.replaceAll(' ','%20')+x_meta_og_url+'%0D%0A'+x_meta_og_description.replaceAll(' ','%20')
			pss_a[i]+=b
		}
		if(x_preferred_social_share_sites[i]=='pr'){pss_a[i]=a+x_social_share_urls[xss_i]+b}
		if(x_preferred_social_share_sites[i]=='ln'){pss_a[i]=a+x_social_share_urls[xss_i]+'?'+x_meta_og_url+b}
	}
	else{
		pss_a[i]=a+x_social_share_urls[xss_i]+'?'+x_social_share_urls_url[xss_i]+'='+x_meta_og_url
		if(x_social_share_urls_title[xss_i]==''){pss_a[i]+=b}
		else{pss_a[i]+='&'+x_social_share_urls_title[xss_i]+x_meta_og_title+b}
	}
	if(x_social_share_img_i=='img'){pss_a[i]+='<img src="'+x_social_share_buttons[xss_i]+'" class="'+button_class+'" title="'+x_social_share_titles[xss_i]+'"></a>'}
	else{pss_a[i]+='<'+x_social_share_img_i+' class="'+x_social_share_font_icons[xss_i]+'"></'+x_social_share_img_i+'>'}
//	alert(pss_a[i])
	container+=pss_a[i]
	if(x_social_share_direction=='v'){container+='<br>'}
	if(x_preferred_social_share_br[i]=='br'){container+='<br>'}
}
//alert(container)
document.getElementById(x_el).innerHTML=container
}
// return variables for meta properties
function x_metas(){
// only returns metas with property or name attribute. Charset ignored as information obtained otherwise in x_press_init. Likewise for http-equiv
var metas=document.getElementsByTagName('meta'),metas_limit=metas.length,i
for(i=0;i<metas_limit;i++){
	if(metas[i].getAttribute('property')){window['x_meta_' + metas[i].getAttribute('property').replace(':','_')]=encodeURIComponent(metas[i].getAttribute('content'))}
	if(metas[i].getAttribute('name')){window['x_meta_' + metas[i].getAttribute('name').replace(':','_')]=encodeURIComponent(metas[i].getAttribute('content'))}
} 
if(typeof x_meta_title=='undefined'){x_meta_title=x_webpage_title}
if(typeof x_meta_og_title=='undefined'){x_meta_og_title=x_meta_title}
if(typeof x_meta_twitter_title=='undefined'){x_meta_twitter_title=x_meta_og_title}
if(typeof x_meta_og_description=='undefined'){x_meta_og_description=x_meta_description}
if(typeof x_meta_twitter_description=='undefined'){x_meta_twitter_description=x_meta_og_description}
if(typeof x_meta_og_url=='undefined'){x_meta_og_url=encodeURIComponent(window.location.pathname)}
if(typeof x_meta_og_image=='undefined'){if(document.images.length==0){}else{x_meta_og_image=document.images[0];x_meta_og_image_alt=document.images[0].alt}}
if(typeof x_meta_twitter_image=='undefined'){x_meta_twitter_image=x_meta_og_image}
if(typeof x_meta_og_image_alt=='undefined'){}
if(typeof x_meta_twitter_image_alt=='undefined'){if(typeof x_meta_og_image_alt=='undefined'){}else{x_meta_twitter_image_alt=x_meta_og_image_alt}}
if(typeof x_meta_og_site_name=='undefined'){x_meta_og_site_name=x_webpage_domain}
if(typeof x_meta_twitter_card=='undefined'){x_meta_twitter_card='summary'}
if(typeof x_meta_twitter_site=='undefined'){x_meta_twtitter_site=''} //--> twitter site card not required, but you won't get attributed on Twitter
}
//x_emph - add emphasis to a span or header or paragraph
function x_emph(x_emphasis_attributes,x_el){
//bold - document.getElementById("demo").style.fontWeight="bold"
//italic - style.fontStyle="italic"
//underline - style.textDecoration="underline"
//...Case - style.textTransform="case" - capitalize,uppercase,lowercase
//SmallCaps - style.fontVariant="small-caps"
var i,att
for(i=0;i<x_emphasis_attributes.length;i++){
	att=x_emphasis_attributes[i].toUpperCase()
	if(['BOLD','BO','B'].includes(att)){document.getElementById(x_el).style.fontWeight="bold"}
	if(['ITALIC','IT','I'].includes(att)){document.getElementById(x_el).style.fontStyle="italic"}
	if(['UNDERLINE','UNDERSCORE','UNDER','UN','U'].includes(att)){document.getElementById(x_el).style.textDecoration="underline"}
	if(['CAPITALIZE','CAPS','CA','C','TITLECASE','TITLEALL','TITLE','TI','T'].includes(att)){document.getElementById(x_el).style.textTransform="capitalize"}
	if(['UPPERCASE','UPPER','UP','P'].includes(att)){document.getElementById(x_el).style.textTransform="uppercase"}
	if(['LOWERCASE','LOWER','LO','L'].includes(att)){document.getElementById(x_el).style.textTransform="lowercase"}
	if(['SMALLCAPS','SMALL CAPS','SMALL-CAPS','SC','SM','S'].includes(att)){document.getElementById(x_el).style.fontVariant="small-caps"}
	if(['CONDENSED','CO','<-'].includes(att)){document.getElementById(x_el).style.fontStretch="condensed"}
	if(['EXPANDED','EX','->'].includes(att)){document.getElementById(x_el).style.fontStretch="expanded"}
}
}
function x_alert(x_alert_message){x_alert_i+=1;if(x_alert_i<=x_alert_limit){alert(x_alert_message)}}
function x_random_between(min,max){return Math.floor(Math.random() *(max - min + 1) + min)/*The maximum is inclusive and the minimum is inclusive*/}
function x_array_math(array_in,func){
// min=minimum value - lowest value in array
// max=maximum value - highest value in array
// sum=sum of all elements in array; product=sum with *; antilog=sum with **
// avg=sum/number of elements=mean
// mode=value found most often in array(first one wins in case of tie)
// median=middle value in array
func=func.toLowerCase()
if(func=='min'){return Math.min(...array_in)}
if(func=='max'){return Math.max(...array_in)}
var i,j,k,sum=array_in[0],product=array_in[0],antilog=array_in[0]
for(i=1;i<array_in.length;i++){/*start from second element*/sum+=array_in[i];product=product*array_in[i];antilog=antilog**array_in[i]}
if(func=='sum'){return sum}
if(func=='avg' || func=='mean'){return sum/array_in.length}
if(func=='product'){return product}
if(func=='antilog' || func=='powerproduct'){return antilog}
var mode_array=[]
for(i=0;i<array_in.length;i++){j=mode_array.indexOf(array_in[i]);if(j<0){mode_array.push(array_in[i])}}
var mode_count_array=[]
for(j=0;j<mode_array.length;j++){mode_count_array.push(0)}
for(i=0;i<array_in.length;i++){j=mode_array.indexOf(array_in[i]);mode_count_array[j]+=1}
k=Math.max(...mode_count_array)
if(func=='mode'){return mode_array.indexOf(k)}
var a,b
var median_array=array_in.sort(function(a,b){return a - b})//function does a compare and provides a numeric sort, rather than an alpha sort
var median_i=Math.floor(median_array.length/2)-1
if(func=='median'){return median_array[median_i]}
}
function x_array_find(value_in,array_in,alternate_values_array_in){
if(alternate_values_array_in===undefined || alternate_values_array_in==''){return array_in.indexOf(value_in)}
return alternate_values_array_in[array_in.indexOf(value_in)]
}
function x_array_find_in_range(value_in,range_array_in,return_values_array_in){//range_array_in contains the starting value of each range
var i,j,return_value=return_values_array_in[0]
for(j=0;j<range_array_in.length-1;j++){if(value_in>=range_array_in[j]){return_value=return_values_array_in[j]}}
return return_value
}
//function x_array_copy(array_in)// use structureClone instead for a complete copy; use (...array) for reference copy (changes to either array affect both)
function x_array_repeat(array_in,len,exclude_indexes_array=[]){
var i,j,k,n,array_work=[]
for(i=0;i<array_in.length;i++){if(exclude_indexes_array.indexOf(i)<0){array_work.push(array_in[i])}}
var array_work_save=[...array_work]
n=Math.ceil(len/array_work.length)
for(k=0;k<n;k++){array_work=array_work.concat(array_work_save)}
return array_work
}
function x_array_randomize(array_in){// using Fisher–Yates shuffle - forward version
var i,j,n,x,array_out=[...array_in] //clone(copy) array using ... spread operator(array to string)
n=array_out.length-1
for(i=0;i<n;i++){
	j=x_random_between(i,n);x=array_out[i];array_out[i]=array_out[j];array_out[j]=x
}
return array_out
}
function x_array_in_out(array,value,in_out,idx){//add switch
var i,j,len=array.length,ind=idx,array_out=[],value_out,array_return=[]
if(idx=='first'){ind=0}
if(idx=='last'){ind=len-1+1}
if(in_out=='in'){
	j=0
	for(i=0;i<len;i++){
		if(i==ind){
			value_out=value;array_out[j]=value;j+=1
			if(ind<array.length){array_out[j]=array[i];j+=1}
		}
		else{array_out[j]=array[i];j+=1}
//		alert(i);alert(j);alert(array_out)
	}
	if(ind==len){value_out=value;array_out[j]=value}
}
if(in_out=='out'){
	j=0
	for(i=0;i<len;i++){
		if(ind==len){if(i==len-1){value_out=array[i];break}}
		if(i==ind){value_out=array[i]}
		else{array_out[j]=array[i];j+=1}
	}
}
//switch
if(in_out=='in' || in_out=='out'){}
else{
	for(i=0;i<len;i++){array_out[i]=array[i]}//move array to array_out
	j=value
	if(value=='first'){j=0}
	if(value=='last'){j=len-1}
	if(ind==len){ind-=1}
//	alert(j);alert(ind)
	value_out=array_out[j];array_out[j]=array_out[ind];array_out[ind]=value_out
}
array_return[0]=value_out;array_return[1]=array_out
return array_return
}
//sorts any column in any order
function x_array_sort(x_as_array_in,x_as_col_in,x_as_order_in){
//alert(x_as_array_in)
//alert(x_as_col_in)
//alert(x_as_order_in)
/*
var x_array_is_sorted=false,i,j,x_hold
while(x_array_is_sorted==false){
	x_array_is_sorted=true
	for(i=0;i<x_as_array_in.length-1;i++){
		//alert(x_as_array_in[i][x_as_col_in])
		//alert(x_as_array_in[i+1][x_as_col_in])
		if(x_as_array_in[i][x_as_col_in]==x_as_array_in[i+1][x_as_col_in]){}else{x_array_is_sorted=false}
		if(x_as_order_in=='<'){
			if(x_as_array_in[i][x_as_col_in]<x_as_array_in[i+1][x_as_col_in]){}
			else{
				x_hold=x_as_array_in[i]
				x_as_array_in[i]=x_as_array_in[i+1]
				x_as_array_in[i+1]=x_hold
			}
		}
		else{
			if(x_as_array_in[i+1][x_as_col_in]>x_as_array_in[i][x_as_col_in]){}
			else{
				//alert(x_as_array_in[0].length)
				x_hold=x_as_array_in[i]
				x_as_array_in[i]=x_as_array_in[i+1]
				x_as_array_in[i+1]=x_hold
			}
		}
	}
}
*/
//alert(x_as_array_in)
x_as_array_in.sort(function(a,b){
	if(a[x_as_col_in]===b[x_as_col_in]){return 0}
	else{
		if(x_as_order_in=='<'){
			if(a[x_as_col_in] > b[x_as_col_in]){return -1}
			else{return 1}
		}
		else{
			if(a[x_as_col_in] < b[x_as_col_in]){return -1}
			else{return 1}
		}
	}
}
)
return x_as_array_in
}
//for sorting on multiple columns would need recursive function - see multisort below
//
//*** need generic sort function for multi-dimensional array - first sort on rank, reduce length, then sort on place***
//*** sort is alpha, unless compareNumbers logic is used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//bs_top_array.sort(x_sort_compare_numbers)
//*** need x_sort_compare_numbers, plus following function to sort on any column, but pass both column and column-type
//function x_sort_compare_numbers(a,b){return a-b}
/*
// set c to the column number you want to sort
// c=0; will sort the first column
// c=1; will sort the second column ... etc

c=0; // for the example, set c to sort the first column.

array.sort (
    function (a, b) {
        if (a[c] === b[c]) {
            return 0;
        } else {
            return (a[c] < b[c]) ? -1 : 1;
        }
    }
);
---
if( typeof helper == 'undefined' ) {
  var helper = { } ;
}
https://coderwall.com/p/5fu9xw/how-to-sort-multidimensional-array-using-javascript
sorts an array that contains an object
sorts an array that contains an object
helper.arr = {
         **
     * Function to sort multidimensional array
     * 
     * param {array} [arr] Source array
     * param {array} [columns] List of columns to sort
     * param {array} [order_by] List of directions (ASC, DESC)
     * returns {array}
     *
    multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
            columns = []
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof order_by == 'undefined') {
            order_by = []
            for(x=0;x<arr[0].length;x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a,b,columns,order_by,index) {  
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }

            if(x < y) {
                    return direction == 0 ? -1 : 1;
            }

            if(x == y)  {
                return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisort_recursive(a,b,columns,order_by,0);
        });
    }
}
*/

function x_array_unique(array_in){
var array_return=[...new Set(array_in)]//converts array to set to array. set is unique values only. [...] converts back to array
return array_return
}
//X_ARRAY_TO_TABLE
//array_in - the array from which the table will be created contains each column value. Column can be an array [column_value,link,title(optional=''). Column can be an array of search values to be listed in that column.
//div_out - the id of the div that will contain the table
//table_id - table id
//table_border_style - style for table - border:2px solid #BCD5EB
//table_style_class - optional=''
//table_headings - array containing heading,array of heading style/class and column style/class including style=/class=, 'value'/'link'/'combine_array' for each column
function x_array_to_table(array_in,div_out,table_id,table_border_style,table_style_class,table_headings,num_rows,copy_remainder=false){
var i,j,a=''
var b=''
var s='';f='',d='',load_direction='top-to-bottom'
if(num_rows===undefined){num_rows=0}
if(num_rows<0){num_rows=num_rows*-1;load_direction='bottom-to-top'}
//table tag
a+='<table id="'+table_id+'"'
s=x_styles_merge(table_style_class,table_border_style)
a+=s+'>'
//headings - first row
a+='<tr>'
for(i=0;i<table_headings.length;i++){
	if(table_headings[i][2]=='none'){}
	else{
		a+='<td '
		s=x_styles_merge(table_headings[i][1][0],table_border_style)
		a+=s+'>'+table_headings[i][0]+'</td>'
	}
}
a+='</tr>'
//rest of rows
var istart,istop,iiterate
if(num_rows>array_in.length){num_rows=array_in.length}
if(load_direction=='top-to-bottom'){
	istart=0
	if(num_rows==0){istop=array_in.length}else{istop=num_rows}
	iiterate=1
}
else{
	istart=array_in.length-1
	if(num_rows==0){istop=-1}else{istop=istart-num_rows}
	iiterate=-1
}
//alert(istart+','+istop+','+iiterate)
for(i=istart;;i=i+iiterate){
	if(load_direction=='top-to-bottom'){if(i<istop){}else{break}}
	else{if(i>istop){}else{break}}
	a+='<tr>'
	for(j=0;j<table_headings.length;j++){
		if(table_headings[j][2]=='none'){}
		else{
			a+='<td '
			s=x_styles_merge(table_headings[j][1][1],table_border_style)
			a+=s+'>'
			if(table_headings[j][2]=='value'){a+=array_in[i][j]}
			if(table_headings[j][2]=='link'){
				a+='<a href="'+array_in[i][j][1]
				if(array_in[i][j][2]==''){}else{a+=' title="'+array_in[i][j][2]+'" alt="'+array_in[i][j][2]+'"'}
				a+='">'+array_in[i][j][0]+'</a>'
			}
			if(table_headings[j][2]=='combine_array'){a+=array_in[i][j].join(', ')}
			a+='</td>'
		}
	}
	a+='</tr>'
}
//end table tag
a+='</table>'
//move to div
document.getElementById(div_out).innerHTML=a
x_array_to_table_copy_remainder(array_in,table_headings,load_direction,istart,istop,iiterate,copy_remainder)
}
function x_array_to_table_copy_remainder(array_in,table_headings,load_direction,istart,istop,iiterate,copy_remainder){
if(copy_remainder){}else{return}
var k,kstart,kstop,kiterate,l,a=''
if(load_direction=='top-to-bottom'){kstart=istop+1-1;kstop=array_in.length;kiterate=1}
else{kstart=istop-1+1;kstop=-1;kiterate=-1}
for(k=kstart;;k=k+kiterate){
	if(load_direction=='top-to-bottom'){if(k<kstop){}else{break}}
	else{if(k>kstop){}else{break}}
	for(l=0;l<table_headings.length;l++){if(table_headings[l][2]=='link'){a+=array_in[k][l][0]+'\n'}}
}
if(copy_remainder){if(a==''){}else{x_copy_to_clipboard(a,'Remaining rows copied to clipboard')}}
}
function x_array_table_goto_link(array_table_in,array_table_i,heading_in){
var i,array_table_row,link_column,link_value=''
if(array_table_i==-99){return}
if(array_table_i==-1){array_table_i=array_table_in.length-1}
array_table_row=array_table_in[array_table_i]
for(i=0;i<heading_in.length;i++){
	if(heading_in[i][2]=='link'){
		link_column=array_table_in[array_table_i][i];link_value=link_column[1]
		break
	}
}
if(link_value==''){alert('link not found')}else{location.href=link_value}
}
function x_who_won(high_low_wins,score_array,result_array=[]){
var x
if(high_low_wins.toLowerCase()=='high'){x=x_array_math(score_array,'max')}
if(high_low_wins.toLowerCase()=='low'){x=x_array_math(score_array,'min')}
return x_array_find(x,score_array,result_array)
}
//X_COOKIE_SET
function x_cookie_set(key,value,expires,max_age,domain,path,samesite,secureness){
//expires, ... to the end, are optional. Do not specify optional parms for session cookie
//only works online
var a,x,expires_date
a=key+'='+value
if(expires===undefined || expires==''){}
else{expires_date=new Date(expires).toUTCString()/*use date with slashes mm/dd/yyyy*/
	a+=';Expires='+expires_date
}
if(max_age===undefined || max_age==''){}//seconds until expires
else{a+=';Max-Age='+max_age}
if(domain===undefined || domain==''){}//domain for cookie to be sent to
else{a+=';Domain='+domain}
if(path===undefined || path==''){}
else{a+=';Path='+path}
if(samesite===undefined || samesite==''){}//Strict,Lax,None. Specify Secure for Secureness if None
else{a+='SameSite='+samesite}
if(secureness===undefined || secureness==''){}//Secure or Secure;HttpOnly - case sensitive?
else{a+=';'+secureness}
document.cookie=a
}
function x_cookie_get(key){
//optional parms cannot be retrieved
var keysearch=key+'=',cookie_array=decodeURIComponent(document.cookie).split(';'),cookie,cookie_pos,i
for(i=0;i<cookie_array.length;i++){
	cookie=cookie_array[i].trimLeft();cookie_pos=cookie.indexOf(keysearch)
	if(cookie_pos==0){return cookie.substr(cookie_pos+keysearch.length,cookie.length=keysearch.length)}
}
return -1
}
function x_storage(getsetremoveclear,key,value,session){
if(session===undefined || session==''){session=true}else{session=false}
getsetremoveclear=getsetremoveclear.toLowerCase()
var x
if(session){//if true, then only for length of session, defaults to true
	if(getsetremoveclear=='clear'){sessionStorage.clear()}
	if(getsetremoveclear=='remove'){sessionStorage.removeItem(key,value)}
	if(getsetremoveclear=='get'){x=sessionStorage.getItem(key)}
	if(getsetremoveclear=='set'){sessionStorage.setItem(key,value)}
}
else{
	if(getsetremoveclear=='clear'){localStorage.clear()}
	if(getsetremoveclear=='remove'){localStorage.removeItem(key,value)}
	if(getsetremoveclear=='get'){x=localStorage.getItem(key)}
	if(getsetremoveclear=='set'){localStorage.setItem(key,value)}
}
if(getsetremoveclear=='get'){return x}
}
//X_WEBPAGE_PARSE
//returns array containing protocol,domain,path,page,extension,searchparms,hash
function x_webpage_parse(webpage){
//This commented out code works, but URL constructor is simpler
//var url_work,protocol,domain,path,page,extension,searchparms,hash,i,j,split_array=[]
//url_work=webpage
//split_array=url_work.split('#')
//url_work=split_array[0]
//hash=split_array[1];if(hash===undefined){hash=''}
//split_array=url_work.split('?')
//url_work=split_array[0]
//searchparms=split_array[1];if(searchparms===undefined){searchparms=''}
//i=url_work.indexOf(':')
//protocol=url_work.substr(0,i)
//url_work=url_work.substr(i+4,url_work.length-(i+4))
//end complex code
//URL constructor
try{var url=new URL(webpage)}// domain not returned if offline webpage because there is no domain in that type of url
catch(err){alert(err.message+': '+webpage)}
var a=[],pathname,pagename
a[0]=url.protocol.substr(0,url.protocol.length-1)
a[1]=url.hostname//domain
pathname=url.pathname.substr(1,url.pathname.length)
a[2]=pathname.substr(0,pathname.lastIndexOf('/'))//path
pagename=pathname.substring(pathname.lastIndexOf('/')+1)
if(pagename==''){pagename=x_webpage_default}
a[3]=pagename.substring(0,pagename.lastIndexOf('.'))//page
a[4]=pagename.substring(pagename.lastIndexOf('.')+1)//extension
a[5]=url.search.substr(1,url.search.length)//searchparams
a[6]=url.hash.substr(1,url.hash.length)//hash
return a
}
function x_webpage_parm_value(parm_id){
var webpage_key_value_array=['',''],return_i=-99
for(i=0;i<x_webpage_parms_array.length;i++){
	webpage_key_value_array=x_webpage_parms_array[i]
	if(webpage_key_value_array[0]==parm_id){
		if(webpage_key_value_array[1]=='first'){return_i=0}
		else{
			if(webpage_key_value_array[1]=='last'){return_i=-1}
			else{return_i=webpage_key_value_array[1]}
		}
	}
}
return return_i
}
function x_under_construction(under,construction_emoji,no_emoji,comment,el){
if(under){}else{return}
if(construction_emoji=='default'){construction_emoji='<i>&#x1f6a7; &#x1f4bb;</i>'}
if(no_emoji=='default'){no_emoji='&#x1f645; &#x1f6ab;'}
var a='<p>'
a+='<b>***Note***</p><p>This page is currently under contruction. '
a+='<span style="color:red;font-size:2em">'+construction_emoji+'</span></b></p>'
a+='<p><b>Do not use! <span style="color:red;font-size:2em">'+no_emoji+'</span></b></p>'
a+='<p><b>'+comment+'</b></p><p><b>***End Note***</b></p>'
document.getElementById(el).innerHTML=a
}
//X_SUBSTR
//str is string to take substring of
//start is where to start
//end is where to end
//start_type_array [0] is pos,ind/idx,str - position,index,string. position is 1-based (1+index which is zero-based). str is string (find this string and start there).
//  [1] is bef,at/on,aft - start one char before this position/index/string, start at/on, start one char after
//end_type_array, similar to start_type_array, except [0] can also be len/cnt - return this number of characters, if len/cnt, [1]=''
//slice notation would be x_substr(str,start_index,end_index,['idx','on'],['idx','aft']) - slice: the start index is inclusive, the end index is exclusive
function x_substr(str,start,end,start_type_array,end_type_array){
//***use x_error,x_error_message,x_error_function rather than alerts
if(x_error<0){return}
if(start_type_array[0]=='pos' || start_type_array[0]=='ind' || start_type_array[0]=='idx' || start_type_array[0]=='str'){}
else{x_error=-10;x_error_message='start_type_array[0] must be pos,ind/idx,str';x_error_function='x_substr';return}
if(start_type_array[1]=='bef' || start_type_array[1]=='at' || start_type_array[1]=='on' || start_type_array[1]=='aft'){}
else{x_error=-10;x_error_message='start_type_array[1] must be bef,at/on,aft';x_error_function='x_substr';return}
if(end_type_array[0]=='len'){}
else{
	if(end_type_array[0]=='pos' || end_type_array[0]=='ind' || end_type_array[0]=='idx' || end_type_array[0]=='str'){}
	else{x_error=-10;x_error_message='end_type_array[0] must be pos,ind/idx,str';x_error_function='x_substr';return}
	if(end_type_array[1]=='bef' || end_type_array[1]=='at' || end_type_array[1]=='on' || end_type_array[1]=='aft'){}
	else{x_error=-10;x_error_message='end_type_array[1] must be bef,at/on,aft';x_error_function='x_substr';return}
}
var str_len=str.length,start_use=start,end_use=end
//convert to ind, because working in javascript which is zero/index-based
if(start_type_array[0]=='pos'){start_use-=1}
if(start_type_array[0]=='str'){start_use=str.indexOf(start);if(start_use<0){x_error=start_use;x_error_message='start str not found';x_error_function='x_substr';return}}
if(start_type_array[1]=='bef'){start_use+=1}
if(start_type_array[1]=='aft'){start_use-=1}
if(end_type_array[0]=='pos'){end_use-=1}
if(end_type_array[0]=='str'){end_use=str.indexOf(end);if(end_use<0){x_error=end_use;x_error_message='end str not found';x_error_function='x_substr';return}}
if(end_type_array[0]=='len'){end_use=start_use+end_use-1}
if(end_type_array[1]=='bef'){end_use+=1}
if(end_type_array[1]=='aft'){end_use-=1}
if(start_use<0){x_error=-10;x_error_message='start<0';x_error_function='x_substr';return}
if(start_use>end_use){x_error=-10;x_error_message='start>end';x_error_function='x_substr';return}
if(end_use>str_len){x_error=-10;x_error_message='end>str length';x_error_function='x_substr';return}
var i,str_return='',str_array=str.split('')
for(i=start_use;i<end_use+1;i++){str_return=str_return+str_array[i]}
return str_return
}
function x_code(code_type,en_de,str){
if(code_type=='all'){
	if(en_de=='en'){return encodeURIComponent(str)}
	else{return decodeURIComponent(str)}
}
if(code_type=='some'){
	if(en_de=='en'){return encodeURI(str)}
	else{return decodeURI(str)}
}
}
function x_code_simple(code_type,en_de,str,from_array,to_array){
var i,j,x=''
var str_array=[]
if(code_type=='simple'){//handle @, . as charcode coming in in string - need to keep getting string or use other special chars.
	if(en_de=='en'){
		str_array=str.split('')
		for(i=0;i<str_array.length;i++){
			j=from_array.indexOf(str_array[i])
			if(j<0){x+=str_array[i]}
			else{
				if(to_array[j].length>1){x+=String.fromCharCode(to_array[j])}
				else{x+=to_array[j]}
			}
		}
		return x
	}
	else{
		str_array=str.split('')
		for(i=0;i<str_array.length;i++){
			j=from_array.indexOf(str_array[i])
			if(j<0){x+=str_array[i]}
			else{
				if(to_array[j].length>1){x+=String.fromCharCode(to_array[j])}
				else{x+=to_array[j]}
			}
		}
		return x
	}
}
}
//function x_code_subtle(code_type,sub_type,en_de,str,key,from_array,to_array){
//if(code_type=='subtle'){//subtle cry pto api
//sub_type 'ctr/cbc/gcm' for AES-CTR / AES-CBC / AES-GCM
//en_de 'en/de' for encrypt/decrypt; also 'gk/dk/ek/ik/wk/uk' for generateKey / deriveKey / exportKey / importKey / wrapKey / unwrapKey. Also, gek, etc. for generateKey then exportKey
//}
//}
function x_to_unicode(str){
var i,x='',str_array=Array.from(str)//this will properly split the string, even if it contains both emoji and keyboard chars
for(i=0;i<str_array.length;i++){x+='&#x'+str_array[i].codePointAt(0).toString(16).toUpperCase()+';'}
return x
}
// X_COPY_CONTENT copy innerhtml from one element to another and change ids in result element so they're not duplicate
function x_copy_content(from_el,to_el,new_id_prefix){
var i,from_element,from_innerHTML,to_element,to_elements_with_ids,to_element_with_id
from_element=x_element(from_el)
to_element=x_element(to_el)
from_innerHTML=from_element.innerHTML.replaceAll(' id="',' id="'+new_id_prefix)
to_element.innerHTML=from_innerHTML
// can't change after copy, as end up changing first elements with id, not later ones
//to_elements_with_ids=to_element.querySelectorAll('[id]')
//for(i=0;i<to_elements_with_ids.length;i++){to_element_with_id=to_elements_with_ids[i];to_element_with_id.id=new_id_prefix+to_element_with_id.id}
}
//X_FETCH_FILE_FROM_URL
//format values=text,json - currently returns stubbart.com says - no idea how it's doing that
// async function x_fetch_file_from_url(from_url,format){
// format=format.toLowerCase()
// from_url=x_url_absolute(from_url)
// if(format=='text' || format=='json'){}else{alert('format not text or json')}
// var response,data,msg
// response=await fetch(from_url)
// if(response.ok){
	// if(format=='text'){data=await response.text();data=data.toString()}
	// else{data=await response.json()}
	// return data
// }
// else{
	// msg='fetching '+from_url+':'+response.status+' '+response.statusText
	// return msg
// }
// }
function x_url_absolute(url_relative){
var x_a_abs,url_abs
x_a_abs=document.createElement('a')//create anchor element
x_a_abs.href=url_relative
url_abs=x_a_abs.href
x_a_abs.remove()
return url_abs
}
function x_url_online(offline_url,offline_directory_for_domain,online_protocol,online_domain){
var x=offline_url.replace('file:',online_protocol).replaceAll('\\','/').replace('///','//')
offline_directory_for_domain=offline_directory_for_domain.replaceAll('\\','/')
x=x.replace(offline_directory_for_domain,online_domain)
return x
}
function x_filter_table(filter_value,table_id,column_number){
var i,j,bt=x_element(table_id),btr=bt.getElementsByTagName('tr'),btdcat,cat,catfound
filter_value=filter_value.trim()
if(filter_value=='' || filter_value.toUpperCase()=='ALL'){
	for(i=1;i<btr.length;i++){btr[i].style.display='table-row'}
	return
}
for(i=1;i<btr.length;i++){
	btdcat=btr[i].getElementsByTagName('td')[column_number - 1].innerHTML
	cat=btdcat.split(', ')
	catfound='z'
	for(j=0;j<cat.length;j++){if(cat[j].toUpperCase()==filter_value.toUpperCase()){catfound='y'}}
	if(catfound=='y'){}	else{btr[i].style.display="none"}
}
}
//X_BLOG_TO_RSS
//best used offline with file for allowed_protocol
//do not have alerts before copying to clipboard or copy to clipboard won't work
function x_blog_to_rss(blog_or_post,id_prefix,allowed_protocol,[link_directory,link_protocol,link_domain],category_delimiter){
if(allowed_protocol===undefined || allowed_protocol.trim()=='' || allowed_protocol.trim().toLowerCase()=='none'){return}
else{
	allowed_protocol=allowed_protocol.trim().toLowerCase()
	if(allowed_protocol=='all' || allowed_protocol=='any'){}
	else{
		if(allowed_protocol.substr(allowed_protocol.length-1,1)==':'){}else{allowed_protocol=allowed_protocol+':'}
		if(x_webpage_protocol==allowed_protocol){}
		else{return}
	}
}
if(link_protocol===undefined || link_protocol==''){link_protocol='https:'}
link_protocol=link_protocol.trim().toLowerCase()
if(link_protocol.substr(link_protocol.length-1,1)==':'){}else{link_protocol=link_protocol+':'}
var i,a=''
var b=''
var rss_link=x_webpage_url,rss_description=x_element(id_prefix+'description'),rss_description_n,rss_description_all_n,html_language/*content-language is a list of languages this page can be translated to, not the language it is written in*/
var rss_category=x_element(id_prefix+'category')
var rss_image=x_element(id_prefix+'image'),rss_image_link,rss_image_link_ext,rss_image_link_type,rss_image_author
var rss_author=x_element(id_prefix+'author')
var id_prefix_suffix=id_prefix.substr(id_prefix.length-1,1)
if(id_prefix_suffix=='_' || id_prefix_suffix=='-'){}else{id_prefix_suffix=''}
//alert(id_prefix_suffix)
//alert(id_prefix+'image'+id_prefix_suffix+'title')
var rss_today=new Date().toUTCString()
blog_or_post=blog_or_post.trim().toLowerCase()
if(rss_link.substr(0,5)=='file:'){rss_link=x_url_online(rss_link,link_directory,link_protocol,link_domain)}
if(blog_or_post=='blog'){
	a+='<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">\n<channel>\n'
	a+='\t<title>'+x_element(id_prefix+'title').innerText+'</title>\n'
	a+='\t<link>'+rss_link+'</link>\n'
	a+='\t<description>'
	if(rss_description==null){
		rss_description_all_n=''
		for(i=1;i<10;i++){
			rss_description_n=x_element(id_prefix+'description'+i)
			if(rss_description_n==null){i=9}//exit for
			else{
				if(i>1){rss_description_all_n+=' '}
				rss_description_all_n+=rss_description_n.innerText
			}
		}
		a+=rss_description_all_n
	}
	else{
		a+=rss_description.innerText
	}
	a+='</description>\n'
	html_language=document.lang
	if(html_language===undefined){html_language=navigator.language.toLowerCase()}
	a+='\t<language>'+html_language+'<\language>\n'
//	<META http-equiv="PICS-Label" content='(PICS-1.1 "http://www.classify.org/safesurf/" 1 r (SS~~000 1))'>
	var html_rating=document.querySelector('meta[http-equiv="PICS-Label"]')
	if(html_rating==null){
//		a+='\t<!--<rating>...</rating>-->\n'
	}
	else{
		a+='\t<rating>'+html_rating.content+'</rating>\n'
	}
	a+='\t<!--<copyright>...</copyright>-->\n'
	a+='\t<!--<pubDate>'+rss_today+'</pubDate>-->\n'
	a+='\t<!--<lastBuildDate>'+rss_today+'</lastBuildDate>-->\n'
	b='\t<category>'
	if(rss_category==null){
		rss_category_all_n=''
		for(i=1;i<10;i++){
			rss_category_n=x_element(id_prefix+'category'+i)
			if(rss_category_n==null){i=9}//exit for
			else{
				if(i>1){rss_category_all_n+='/'}
				rss_category_all_n+=rss_category_n.innerText.replaceAll(category_delimiter,'/')
			}
		}
		b+=rss_category_all_n
	}
	else{
		b+=rss_category.innerText.replaceAll(category_delimiter,'/')
	}
	b+='</category>\n'
	if(b=='\t<category></category>\n'){}else{a+=b}
//	a+='\t<!--<docs>...</docs>-->\n'
//	a+='\t<!--<cloud>...</cloud>-->\n'
//	a+='\t<!--<ttl>...</ttl>-->\n'
//	a+='\t<!--<managingEditor>...</managingEditor>-->\n'
//	a+='\t<!--<webMaster>...</webMaster>-->\n'
//	a+='\t<!--<skipHours>\n'
//	a+='\t\t<hour>...</hour>\n'
//	a+='\t</skipHours>-->\n'
//	a+='\t<!--<skipDays>\n'
//	a+='\t\t<day>...</day>\n'
//	a+='\t</skipDays>-->\n'
	//image
	if(rss_image==null){}
	else{
		b='\t<image>\n'
		b+='\t\t<title>'
		if(rss_image.getAttribute('title')==null){
			if(rss_image.getAttribute('alt')==null){b+=x_element(id_prefix+'image'+id_prefix_suffix+'title').innerText}
			else{b+=rss_image.getAttribute('alt')}
		}
		else{b+=rss_image.getAttribute('title')}
		b+='</title>\n'
		b+='\t\t<link>'+rss_link+'</link>\n'
		b+='\t\t<url>'
		if(rss_image.src.substr(0,5)=='file:'){rss_image_link=x_url_online(rss_image.src,link_directory,link_protocol,link_domain)}
		else{rss_image_link=rss_image.src}
		b+=rss_image_link+'</url>\n'
//		<width>...</width><height>...</height>
		rss_image_author=x_element(id_prefix+'image'+id_prefix_suffix+'author')
		if(rss_image_author==null){}else{b+='\t\t<dc:creator>'+rss_image_author.innerText+'</dc:creator>\n'}
		b+='\t</image>\n'
		a+=b
	}
	a+='\t<!--<generator>...</generator>-->\n'
	if(rss_author==null){}else{a+='\t<dc:creator>'+rss_author.innerText+'</dc:creator>\n'}
	a+='\t<!--10 to 12 items-->\n'
	a+='\t<item>\n'
	a+='\t\t...\n'
	a+='\t</item>\n'
	a+='</channel>\n</rss>\n'
}
else{//post
	a+='\t<item>\n'
	a+='\t\t<title>'+x_element(id_prefix+'title').innerText+'</title>\n'
	a+='\t\t<link>'+rss_link+'</link>\n'
	a+='\t\t<description>'
	if(rss_description==null){
		rss_description_all_n=''
		for(i=1;i<10;i++){
			rss_description_n=x_element(id_prefix+'description'+i)
			if(rss_description_n==null){i=9}//exit for
			else{
				if(i>1){rss_description_all_n+=' '}
				rss_description_all_n+=rss_description_n.innerText
			}
		}
		a+=rss_description_all_n
	}
	else{
		a+=rss_description.innerText
	}
	a+='</description>\n'
//	a+='\t\t<!--<author>...</author>-->\n'
	b='\t\t<category>'
	if(rss_category==null){
		rss_category_all_n=''
		for(i=1;i<10;i++){
			rss_category_n=x_element(id_prefix+'category'+i)
			if(rss_category_n==null){i=9}//exit for
			else{
				if(i>1){rss_category_all_n+='/'}
				rss_category_all_n+=rss_category_n.innerText.replaceAll(category_delimiter,'/')
			}
		}
		b+=rss_category_all_n
	}
	else{
		b+=rss_category.innerText.replaceAll(category_delimiter,'/')
	}
	b+='</category>\n'
	if(b=='\t\t<category></category>\n'){}else{a+=b}
//	a+='\t\t<!--<comments>...</comments>-->\n'
//	<enclosure url="https://images-na.ssl-images-amazon.com/images/I/41lrmdHJTYL._SX331_BO1,204,203,200_.jpg" length="1000000" type="image/jpeg" />
	if(rss_image==null){a+='\t\t<!--<enclosure url="..." length="1000000" type="image/jpeg" />-->\n'}
	else{
		a+='\t\t<enclosure url="'
		if(rss_image.src.substr(0,5)=='file:'){rss_image_link=x_url_online(rss_image.src,link_directory,link_protocol,link_domain)}
		else{rss_image_link=rss_image.src}
		a+=rss_image_link+'" length="1000000"'
		rss_image_link_ext=x_webpage_parse(rss_image_link)[4]
		a+=' type="'+x_mime_type_image(rss_image_link_ext)+'" />\n'
	}
//	a+'\t\t<!--guid>...</guid>-->\n'
	a+='\t\t<!--<pubDate>'+rss_today+'</pubDate>-->\n'
//	a+'\t\t<!--source>...</source>-->\n'
	if(rss_author==null){}else{a+='\t\t<dc:creator>'+rss_author.innerText+'</dc:creator>\n'}
	a+='\t</item>\n'
}
x_copy_to_clipboard(a,'rss for '+blog_or_post+' copied to clipboard')
}
function x_copy_to_clipboard(copy_string,alert_msg){navigator.clipboard.writeText(copy_string);alert(alert_msg)}
//MIME TYPES
function x_mime_type_audio(ext){//https://mimetype.io/all-types/#audio
var ext_mime_array=[['3gp','3gpp'],['3g2','3gpp2'],['adp','adpcm'],
['aif','aiff'],['aff','aiff'],
['au','basic'],['snd','basic'],
['kar','midi'],['mid','midi'],['rmi','midi'],
['mp4a','mp4'],
['m2a','mpeg'],['m3a','mpeg'],['mp2','mpeg'],['mp2a','mpeg'],['mp3','mpeg'],['mpga','mpeg'],
['oga','ogg'],['spx','ogg'],
['eol','vnd.digital-winds'],['dts','vnd.dts'],['dtshd','vnd.dts.hd'],['lvp','vnd.lucent.voice'],['pya','vnd.ms-playready.media.pya'],
['ecelp4800','vnd.nuera.ecelp4800'],['ecelp7470','vnd.nuera.ecelp7470'],['ecelp9600','vnd.nuera.ecelp9600'],
['weba','webm'],
['aac','x-aac'],
['aifc','x-aiff'],['aiff','x-aiff'],
['mka','x-matroska'],['m3u','x-mpegurl'],
['wax','x-ms-wax'],['wma','x-ms-wma'],
['ra','x-pn-realaudio'],['ram','x-pn-realaudio'],['rmp','x-pn-realaudio-plugin']
]
var mime_type=ext
for(i=0;i<ext_mime_array.length;i++){if(ext_mime_array[i][0]==ext){mime_type=ext_mime_array[i][1]}}
return 'audio/'+mime_type
}
function x_mime_type_image(ext){//https://mimetype.io/all-types/#image
var ext_mime_array=[['avifs','avif'],['g3','g3fax'],['heif','heic'],
['jpe','jpeg'],['jpg','jpeg'],['pjpg','jpeg'],['jfif','jpeg'],['jfif-tbnl','jpeg'],['jfif-tbnl','jif'],
['svg','svg+xml'],['svgz','svg+xml'],
['tif','tiff'],
['psd','vnd.adobe.photoshop'],['djv','vnd.djvu'],['djvu','vnd.djvu'],['dwg','vnd.dwg'],['dxf','vnd.dxf'],['fbs','vnd.fastbidsheet'],['fpx','vnd.fpx'],['fst','vnd.fst'],['mmr','vnd.fujixerox.edmics-mmr'],['rlc','vnd.fujixerox.edmics-rlc'],['mdi','vnd.ms-modi'],['npx','vnd.net-fpx'],['wbmp','vnd.wap.wbmp'],['xif','vnd.xiff'],
['dng','x-adobe-dng'],['cr2','x-cannon-cr2'],['crw','x-cannon-crw'],['ras','x-cmu-raster'],['cmx','x-cmx'],['erf','x-epson-erf'],
['fh','x-freehand'],['fh4','x-freehand'],['fh5','x-freehand'],['fh7','x-freehand'],['fhc','x-freehand'],
['raf','x-fuji-raf'],['ico','x-icon'],
['dcr','x-kodak-dcr'],['k25','x-kodak-k25'],['kdc','x-kodak-kdc'],
['mrw','x-minolta-mrw'],['nef','x-nikon-nef'],['orf','x-olympus-orf'],
['raw','x-panasonic-raw'],['rw2','x-panasonic-raw'],['rwl','x-panasonic-raw'],
['pcx','x-pcx'],
['pef','x-pentax-pef'],['ptx','x-pentax-pef'],
['pct','x-pict'],['pic','x-pict'],
['pnm','x-portable-bitmap'],['pgm','x-portable-graymap'],['ppm','x-portable-pixmap'],['xbm','x-xbitmap'],['xpm','x-xpixmap'],
['rgb','x-rgb'],['xf3','x-sigma-xf3'],
['arw','x-sony-arw'],['sr2','x-sony-sr2'],['srf','x-sony-srf'],
['xwd','x-xwindowdump']
]
var mime_type=ext
for(i=0;i<ext_mime_array.length;i++){if(ext_mime_array[i][0]==ext){mime_type=ext_mime_array[i][1]}}
return 'image/'+mime_type
}
function x_mime_type_video(ext){//https://mimetype.io/all-types/#video
var ext_mime_array=[['3gp','3gpp'],['3g2','3gpp2'],['jpgv','jpeg'],['jpgm','jpm'],['mjp2','mj2'],
['mp4v','mp4'],['mpg4','mp4'],
['m1v','mpeg'],['m2v','mpeg'],['mpa','mpeg'],['mpe','mpeg'],['mpg','mpeg'],
['ogv','ogg'],
['mov','quicktime'],['qt','quicktime'],
['fvt','vnd.fvt'],
['m4u','vnd.mpegurl'],['mxu','vnd.mpegurl'],
['pyv','vnd.ms-playready.media.pyv'],['viv','vnd.vivo'],
['f4v','x-4fv'],['fli','x-fli'],['flv','x-flv'],['m4v','x-m4v'],['mkv','x-matroska'],
['asf','x-ms-asf'],['asx','x-ms-asf'],['wm','x-ms-wm'],['wmv','x-ms-wmv'],['wmx','x-ms-wmx'],['wvx','x-ms-wvx'],
['avi','x-msvideo'],
['movie','x-sgi-movie']
]
var mime_type=ext
for(i=0;i<ext_mime_array.length;i++){if(ext_mime_array[i][0]==ext){mime_type=ext_mime_array[i][1]}}
return 'video/'+mime_type
}
function x_str_lengths(str){
//returns str_length, unicode_length, twitter_length
//https://support.buffer.com/article/588-character-limits-for-each-social-network
//bluesky 1 video 60 seconds in length, 50MB; 4 images 1GB each, 2:1 height:width or less than 2 on height, alt-text required; 8 hashtags; 300 chars.
var str_length=0,unicode_length=0,twitter_length=0
var i,x='',str_array=Array.from(str)//this will properly split the string, even if it contains both emoji and keyboard chars
for(i=0;i<str_array.length;i++){str_length+=1;unicode_length+=1;if(str.codePointAt(i)>255){unicode_length+=1}}
var twitter_str=str.replaceAll('\n','@').replaceAll('<br>','@'),look4link=true,link_start=0,link_end=0
while(look4link){
	link_start=twitter_str.indexOf('<a>',link_start)
	if(link_start==-1){
		look4link=false
		break
	}
	link_end=twitter_str.indexOf('</a>',link_end)
	twitter_str=twitter_str.replace(twitter_str.substr(link_start,link_end+3-link_start+1),'12345678901234567890123')
}
var twitter_str_array=Array.from(twitter_str)
for(i=0;i<twitter_str_array.length;i++){twitter_length+=1;if(twitter_str.codePointAt(i)>255){twitter_length+=1}}
return [str_length,unicode_length,twitter_length]
}
function x_floor_precision(value_in, precision_in){return Math.floor(value_in * 10 ** precision_in) / 10 ** precision_in}
function x_object_to_string(myobj_name,myobj,return_what){
//if myobj_name <> '' myobj_name: precedes the return string
//parm2 is 'all','entries','keys','values'. 'all'/'entries' returns the entire string. 'keys' returns only the keys. 'values' returns only the values.
var myprefix='';if(myobj_name>''){myprefix=myobj_name+':'}
//if(return_what=='all'){return myprefix+Object.entries(myobj)}
//if(return_what=='entries'){return myprefix+Object.entries(myobj)}
if(return_what=='all'){return myprefix+JSON.stringify(myobj).replaceAll('"','')}
if(return_what=='entries'){return myprefix+return_what+'='+Object.entries(myobj)}
if(return_what=='keys'){return myprefix+return_what+'='+Object.keys(myobj)}
if(return_what=='values'){return myprefix+return_what+'='+Object.values(myobj)}
}
function x_img(source_in, link_in, link_new_tab_in, border_in, width_in, height_in, title_in, element_in){
//all required, even if ''. source_in and element_in must not be ''
//source contains media queries and source locations. can be array. If not, just use <img>, otherwise use <picture>
//If link specified wrap <img> or <picture> in <a>
//Apply border, if specified to <img>
//apply width, height if specified to <img>
//if title specified, use for alt= and title=
var a='', i, use_pic=false, img_src, img_out, img_style=''
if(link_in==''){}
else{
	a+='<a href="'+link_in+'"'
	if(link_new_tab_in){a+=' target="_blank"'}
	a+='>'
}
if(Array.isArray(source_in)){use_pic=true;a='<picture>'}
if(use_pic){
	for(i=0;i<source_in.length-1;i++){
		a+='<source media="('+source_in[i][0]+')" srcset="'+source_in[i][1]+'">'
	}
}

if(use_pic){img_src=source_in[source_in.length-1][1]}else{img_src=source_in}
if(width_in==''){}else{img_style+='width:'+width_in+';'}
if(height_in==''){}else{img_style+='height:'+height_in+';'}
if(border_in==''){}else{img_style+='border:'+border_in+';'}
img_out='<img src="'+img_src+'"'
if(img_style==''){}else{img_out+=' style="'+img_style+'"'}
if(title_in==''){}else{img_out+=' alt="'+title_in+'" title="'+title_in+'"'}
img_out+='>'
a+=img_out
if(use_pic){a+='</picture>'}
if(link_in==''){}else{a+='</a>'}
document.getElementById(element_in).innerHTML=a
}
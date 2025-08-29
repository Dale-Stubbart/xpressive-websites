//xg_graphics.js  by Dale Stubbart
//graph and drawing add-on to x_press.js
//
//XG_GRPAHICS - generic graphics routines
//XG_SVG - svg needs to be inline (as part of the HTML) page. Could be in <object>, <embed>, or <iframe>, but takes extra coding. In <img>, can't update.
// svg elements and svg itself need IDs. They do not need classes - classes will be ignored by this function.
// if no id can use getElementsByTagName('svg') to get the parent svg element (provided only one)
//  if no id in child element, set to title.textContent. If no title, set to text, if no text, set to class
//  paths may be children of a group, how does that work.
//  keep it simple. Make user add id's. Don't need class. Don't need to do anything in Init. In redraw, user passes nested array of arrays, each array being a path ---> id, title, text, background-color (fill), opacity (fill-opacity)
// user only needs to fill nested arrays with the paths they want to change.
// Do init, ending up with array like for redraw. - No, perhaps a little advanced without, but hey, svg is advanced.
// Fill can be array of colors and numbers - blue, red, %, % - fill-opacity based on amount over 50% to max %
//XG_CHART - Simple bar charts - opted for Google Graphs instead
//XG_GOOGLE_GRAPH
//Charts are made by Google Graphs. You can do that yourself. This code attempts to make that easier
//Add <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> to <head> section of your webpage before xg_graph_init. This is only 66KB, though it probably loads other code as necessary.
//XG_SHAPE
//Draws Shapes with CSS
//XG_CANVAS - Draw with HTML Canvas - I still have some unresolved issues
//
//XG_GRAPHICS_INIT
function xg_graphics_init(){
//    version=8.0.0
xg_graphics_version_major=8;xg_graphics_version_minor=0;xg_graphics_version_revision=0
xg_graphics_version=xg_graphics_version_major.toString()+'.'+xg_graphics_version_minor.toString()+'.'+xg_graphics_version_revision.toString()
xg_graphics_size='<75KB+Google Charts';x_graphics_lines='<1500'
xg_svg_group_array=[];xg_svg_group_array_update=[]
xg_svg_shape_id_array=[]
xg_svg_shape_tagname_array=[]
xg_svg_shape_classlist_array=[];xg_svg_shape_classlist_array_update=[]
xg_svg_shape_bgcolor_array=[];xg_svg_shape_bgcolor_array_update=[]
xg_svg_shape_transparency_array=[];xg_svg_shape_transparency_array_update=[]
xg_svg_shape_title_array=[];xg_svg_shape_title_array_update=[]
xg_svg_shape_text_array=[];xg_svg_shape_text_array_update=[]
xg_svg_shape_tags=['path','circle','ellipse','line','polyline','polygon','rect']// path is most common because that's what programs generate, so listed first
xg_chart_type_array=['bar','column']
xg_chart_width_or_height_between='1em'
xg_chart_show_rulers=true
//google
xg_graph_google_type_array=['bar','column','donut','line','pie','table','geo','gauge']
//graph_types that x_graph covers are bar (horizontal), column (vertical), Geo, Pie (includes Donut), Table
//
//$google_code
//place the following line in <head>
//<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
// Load the Visualization API and the corechart package. Don't need to load packages with drawChart
// corecharts: bar, column, line, area, stepped area, bubble, pie, donut, combo, candlestick, histogram, scatter
if(typeof google=='undefined'){}//https://www.gstatic.com/charts/loader.js not loaded 
//by checkingthis, svg and shape_draw won't error when gstatic is not specified
else{
	google.charts.load('current')
	google.charts.setOnLoadCallback(xg_graph_google_draw_chart)
}
//$google_code end
xg_graph_count=0
xg_graph_type_array=[]
xg_graph_el_array=[]
xg_graph_title_array=[]
xg_graph_data_table_array=[]
xg_graph_3d_array=[]
xg_graph_background_color_array=[]
xg_graph_font_array=[]
xg_graph_color_scheme_array=[]
xg_graph_colors_array=[]
xg_graph_stacked_array=[]
xg_graph_pie_hole_array=[]
xg_graph_pie_slice_visibility_threshold_array=[]
xg_graph_pie_slice_other_label_array=[]
xg_graph_pie_slice_other_color_array=[]
xg_graph_line_curve_type_array=[]
xg_graph_line_line_dash_style_array=[]
xg_graph_line_line_width_array=[]
xg_graph_line_point_shape_array=[]
xg_graph_line_point_size_array=[]
xg_graph_line_points_visible_array=[]
xg_graph_table_allow_html_array=[]
xg_graph_table_alternating_row_style_array=[]
xg_graph_table_show_row_number_array=[]
xg_graph_table_sort_column_array=[]
xg_graph_table_sort_ascending_array=[]
xg_graph_geo_dataless_region_color_array=[]
xg_graph_geo_default_color_array=[]
xg_graph_geo_display_mode_array=[]
xg_graph_geo_region_array=[]
xg_graph_geo_resolution_array=[]
xg_graph_gauge_min_max_array=[]
xg_graph_gauge_green_array=[]
xg_graph_gauge_yellow_array=[]
xg_graph_gauge_red_array=[]
//xg_shape global variables
xg_shape_border_sides_variants_array=['border','border-left','border-top','border-right','border-bottom']
xg_shape_border_styles=['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset','initial','inherit']
}
//XG_SVG_MODIFY
function xg_svg_modify(svg_el, svg_att, svg_att_val){
var a, size_width, size_height, size_viewbox, size_preserveaspectratio, j, x
a=document.getElementById(svg_el)
svg_att=svg_att.toLowerCase()
//if(svg_att=='id'){a.id=svg_att_val}
if(svg_att=='class'){a.setAttribute("class")=svg_att_val}
if(svg_att=='color'){svg_att='fill'}
if(svg_att=='bgcolor'){svg_att='fill'}
if(svg_att=='background-color'){svg_att='fill'}
if(svg_att=='fill'){a.style.fill=svg_att_val}
if(svg_att=='transparency'){svg_att='fill-opacity';svg_att_val=1-svg_att_val}
if(svg_att=='opacity'){svg_att='fill-opacity'}
if(svg_att=='fill-opacity'){a.style['fill-opacity']=svg_att_val}
if(svg_att=='title'){
	for (j = 0; j < a.children.length; j++) {
		x=a.children[j].tagName.toLowerCase()
		if (x = 'title') {
			a.children[j].textContent=svg_att_val
		}
	}
}
if(svg_att=='text'){
	for (j = 0; j < a.children.length; j++) {
		x=a.children[j].tagName.toLowerCase()
		if (x = 'text') {
			a.children[j].textContent=svg_att_val
		}
	}
}
//see what exists - width, height, viewbox, preserveAspectRatio. If viewbox missing, then viewBox="0 0 width height". svg_att_val for size is width (no px). If preserveAspectRatio, leave it alone, if it doesn't exist it shouldn't be needed. Default is preserveAspectRatio="xMinYMin meet".
if(svg_att=='size'){
	size_width=a.getAttribute("width")
	size_height=a.getAttribute("height")
	size_viewbox=a.getAttribute("viewBox")
	size_preserveaspectratio=a.getAttribute("preserveAspectRatio")
	if (size_viewbox==null){
		a.setAttribute("viewBox","0 0 "+size_width+" "+size_height)
		a.setAttribute("preserveAspectRatio","xMinYMin meet")
	}
	a.setAttribute("width",svg_att_val)
	a.setAttribute("height",svg_att_val/size_width*size_height)
}
}
//XG_SVG_GROUP_INIT
// title and text are both children of shape or group. shape is child of group.
// if there is no group, add it manually
function xg_svg_group_init(svg_group_el){
//alert(svg_group_el)
var a,i,j,m,n,x,y,opacity
a=document.getElementById(svg_group_el)
//alert(a.children.length)
xg_svg_group_array[0]=a.id
xg_svg_group_array[1]=a.tagName.toLowerCase()
xg_svg_group_array[2]=a.classList //array if multiple classes
xg_svg_group_array[3]=a.style.fill
if (xg_svg_group_array[3]==''){
	xg_svg_group_array[3]=getComputedStyle(a).fill // in case set with style
	if (xg_svg_group_array[3]==''){xg_svg_group_array[3]='#FFFFFF'}
}
opacity=a.style['fill-opacity'];if(opacity==''){opacity=a.style['opacity']}
if (opacity==''){opacity=getComputedStyle(a).opacity}// in case set with style
xg_svg_group_array[4]=1-opacity
xg_svg_group_array[5]=''
xg_svg_group_array[6]=''
xg_svg_group_array_update=[...xg_svg_group_array]
//alert(a.children.length)
for (i = 0; i < a.children.length; i++) {
	y=a.children[i].tagName.toLowerCase()
	if (y == 'title') {xg_svg_group_array[5]=a.children[i].textContent}
	if (y == 'text') {xg_svg_group_array[6]=a.children[i].textContent} // could also be textPath or tspan
}
//for (n = 0; n < 6; n++) {
//	alert(xg_svg_group_array[n]) // may have to use getAttribute or getAttributeNS in a few cases.
//}
//alert(a.children[0].id)
m=0
for (i = 0; i < a.children.length; i++) {
	x=a.children[i].tagName.toLowerCase()
	if (a.children[i].id == '' || a.children[i].id=== undefined){} // must have an id
	else{//alert(x)
		if(xg_svg_shape_tags.indexOf(x)>=0){//must be a shape
			xg_svg_shape_id_array[m]=a.children[i].id
			xg_svg_shape_tagname_array[m]=a.children[i].tagName.toLowerCase()
			xg_svg_shape_classlist_array[m]=a.children[i].classList //array if multiple classes
			xg_svg_shape_classlist_array_update[m]=xg_svg_shape_classlist_array[m]
			xg_svg_shape_bgcolor_array[m]=a.children[i].style.fill
			if (xg_svg_shape_bgcolor_array[m]==''){xg_svg_shape_bgcolor_array[m]=getComputedStyle(a.children[i]).fill}
			xg_svg_shape_bgcolor_array_update[m]=xg_svg_shape_bgcolor_array[m]
			opacity=a.children[i].style['fill-opacity'];if(opacity==''){opacity=a.children[i].style['opacity']}
			if(opacity==''){opacity=getComputedStyle(a.children[i]).opacity}
			xg_svg_shape_transparency_array[m]=1-opacity
			xg_svg_shape_transparency_array_update[m]=xg_svg_shape_transparency_array[m]
			xg_svg_shape_title_array[m]=''
			xg_svg_shape_text_array[m]=''
			for (j = 0; j < a.children[i].children.length; j++) {
				y=a.children[i].children[j].tagName.toLowerCase()
				if (y == 'title') {xg_svg_shape_title_array[m]=a.children[i].children[j].textContent}
				if (y == 'text') {xg_svg_shape_text_array[m]=a.children[i].children[j].textContent} // could also be textPath or tspan
			}
			xg_svg_shape_title_array_update[m]=xg_svg_shape_title_array[m]
			xg_svg_shape_text_array_update[m]=xg_svg_shape_text_array[m]
			m+=1
		}
	}
}
}
//XG_SVG_SHAPES_UPDATE
function xg_svg_shapes_update(svg_group_el,attr_array){// Simple update entire array
// attributes can be classlist, fill/color/bgcolor/background-color, transparency, title, and/or text
// check to see if attribute value changed first <--**
var a,i,j,m,n,x,y
for(i=0;i<attr_array.length;i++){
	attr_array[i]=attr_array[i].toLowerCase()
	if(attr_array[i]=='color' || attr_array[i]=='bgcolor' ||  attr_array[i]=='background-color'){attr_array[i]='fill'}
//	if(attr_array[i]=='fill-opacity'){attr_array[i]='opacity'}
}
a=document.getElementById(svg_group_el)
if(attr_array.indexOf('classlist')>=0){
	for(i=0;i<xg_svg_shape_classlist_array.length;i++){
		if(xg_svg_shape_classlist_array[i]==xg_svg_shape_classlist_array_update[i]){}
		else{
			a.children[i].classList=xg_svg_shape_classlist_array_update[i]
			xg_svg_shape_classlist_array[i]=xg_svg_shape_classlist_array_update[i]
		}
	}
}
if(attr_array.indexOf('fill')>=0){
	for(i=0;i<xg_svg_shape_bgcolor_array.length-1;i++){
		//alert(i)
		if(xg_svg_shape_bgcolor_array[i]==xg_svg_shape_bgcolor_array_update[i]){}
		else{//alert('false')
			a.children[i].style.fill=xg_svg_shape_bgcolor_array_update[i]
			xg_svg_shape_bgcolor_array[i]=xg_svg_shape_bgcolor_array_update[i]
		}
	}
}
if(attr_array.indexOf('transparency')>=0){
	for(i=0;i<xg_svg_shape_transparency_array.length;i++){
		if(xg_svg_shapes_array[i]==xg_svg_shape_transparency_array_update[i]){}
		else{
			a.children[i].style.opacity=1-xg_svg_shape_transparency_array_update[i]
			xg_svg_shape_transparency_array[i]=xg_svg_shape_transparency_array_update[i]
		}
	}
}
//if(attr_array.indexOf('opacity')>=0){
//	for(i=0;i<xg_svg_shape_transparency_array.length;i++){
//		if(xg_svg_shapes_array[i]==xg_svg_shape_transparency_array_update[i]){}
//		else{
//			a.children[i].style.opacity=xg_svg_shape_transparency_array_update[i]
//			xg_svg_shape_transparency_array[i]=1-xg_svg_shape_transparency_array_update[i]
//		}
//	}
//}
// title and text require finding those children first
if(attr_array.indexOf('title')>=0){
	for(i=0;i<xg_svg_shape_title_array.length;i++){
		if(xg_svg_shape_title_array[i]==xg_svg_shape_title_array_update[i]){}
		else{
			for (j = 0; j < a.children[i].children.length; j++) {
				y=a.children[i].children[j].tagName.toLowerCase()
				if (y == 'title'){
					a.children[i].children[j].textContent=xg_svg_shape_title_array_update[i]
					xg_svg_shape_title_array[i]=xg_svg_shape_title_array_update[i]
				}
			}
		}
	}
}
if(attr_array.indexOf('text')>=0){
	for(i=0;i<xg_svg_shape_text_array.length;i++){
		if(xg_svg_shape_text_array[i]==xg_svg_shape_text_array_update[i]){}
		else{
			for (j = 0; j < a.children[i].children.length; j++) {
				y=a.children[i].children[j].tagName.toLowerCase()
				if (y == 'text'){
					a.children[i].children[j].textContent=xg_svg_shape_text_array_update[i]
					xg_svg_shape_text_array[i]=xg_svg_shape_text_array_update[i]
				}
			}
		}
	}
}
}
// XG_SVG_SHAPES_UPDATE_BGCOLORS
//use x_who_won before calling if just updating one or a few with wins update update array manually, then call generic array update
//call this routine to fill all colors from array, then call xg_svg_shapes_update update
function xg_svg_shapes_update_bgcolors(color_array){
var i
for(i=0;i<xg_svg_shape_bgcolor_array.length;i++){
	xg_svg_shape_bgcolor_array_update[i]=color_array[i]
}
}
//XG_CHART_INIT
function xg_chart_init(){
xg_chart_symbol_lines_horizontal_array=['&#x2500;','&#x2501;','&#x2504;','&#x2505;','&#x2508;','&#x2509;','&#x254c;','&#x254d;','&#x2550;','&#x2581;','&#x2582;','&#x2594;','&#x2630;','&#x2637;','&#x268a;','&#x268b;','&#x268c;','&#x268f;','&#x2583;','&#x2585;','&#x2586;','&#x2587;','_','&mdash;','&#x203e','&#x1f030;','&#x1f031;','&#x2708;']
xg_chart_symbol_lines_vertical_array=['&#x2502;','&#x2551;','&#x2588;','&#x258c;','&#x2590;',//normal
'&#x2337;','&#x233a;','&#x233b;','&#x233c;',//-.2em
'&#x2591;','&#x2592;','&#x2593;',//-.3em
'&#x37a2;','&#x1f062',//-.4em
'&#x2507;','&#x250a;','&#x250b;','&#x254e;','&#x254f;','&#x1f02b;']//-.5em
xg_chart_symbol_circles_array=['&#x26aa;','&#x26ab;','&#x1f311;','&#x1f313;','&#x1f315;','&#x1f317;','&#x1f518;','&#x1f534;','&#x1f535;','&#x1f4bf;','&#x1f4bf;','&#x26d4;']
xg_chart_symbol_stars_array=['&#x6de;','&#x2734;','&#x1368;','&#x2731;','&#x2732;','&#x2733;','&#x2735;','&#x1f7af;','&#x1f7b0;','&#x1f7b1;','&#x1f7b2;','&#x1f7b3;','&#x1f7b4;','&#x1f7b6;','&#x1f7b7;','&#x1f7bb;','&#x1f7bc;','&#x1f7bd;','&#x1f7be;','&#x1f7bf;']
xg_chart_symbol_others_array=['&loz;','&#x1f5f0;','&#x1f9c7;','&#x1f3b9;','&#x1F75D;']
}
//XG_CHART_GRAPH_TEST
function xg_chart_graph_test(chart_type,symbol,space_between=-.2,total_width,element){
//chart_type=b/c - bar/column -> horizontal/vertical
//symbol is individual symbol or symbol_type indicating array
var x,i,j,sep,a
x=''
chart_type=xg_chart_type(chart_type)
if(chart_type=='b'){sep=''}else{sep='<br>'}
if(symbol=='lines'){
	if(chart_type=='b'){
		for(i=0;i<xg_chart_symbol_lines_horizontal_array.length;i++){
			a=xg_chart_symbol_lines_horizontal_array[i]
			if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
			x+=i+' '+a+' '+sep
			for(j=0;j<total_width;j++){
				x+=xg_chart_symbol_lines_horizontal_array[i]
			}
			x+='<br>'
		}
	}
	else{
		for(i=0;i<xg_chart_symbol_lines_vertical_array.length;i++){
			a=xg_chart_symbol_lines_vertical_array[i]
			if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
			space_between=0
			if(i>4){space_between=-.19}
			if(i>8){space_between=-.3}
			if(i>11){space_between=-.4}
			if(i>13){space_between=-.5}
			x+=i+' '+a+' space_between='+space_between
			for(j=0;j<total_width;j++){
				x+='<div style="margin-bottom:'+space_between+'em">'+xg_chart_symbol_lines_vertical_array[i]+'</div>'
			}
			x+='<br>'
		}
	}
}
if(symbol=='circles'){
	for(i=0;i<xg_chart_symbol_circles_array.length;i++){
		a=xg_chart_symbol_circles_array[i]
		if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
		x+=i+' '+a+' '+sep
		for(j=0;j<total_width;j++){
			x+='<span style="margin-left:-.2em">'+xg_chart_symbol_circles_array[i]+'</span>'+sep
		}
		x+='<br>'
	}
}
if(symbol=='stars'){
	for(i=0;i<xg_chart_symbol_stars_array.length;i++){
		a=xg_chart_symbol_stars_array[i]
		if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
		x+=i+' '+a+' '+sep
		for(j=0;j<total_width;j++){
			x+=xg_chart_symbol_stars_array[i]+sep
		}
		x+='<br>'
	}
}
if(symbol=='others'){
	for(i=0;i<xg_chart_symbol_others_array.length;i++){
		a=xg_chart_symbol_others_array[i]
		if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
		x+=i+' '+a+' '+sep
		for(j=0;j<total_width;j++){
			x+=xg_chart_symbol_others_array[i]+sep
		}
		x+='<br>'
	}
}
if(symbol=='lines' || symbol=='circles' || symbol=='stars' || symbol=='others'){}
else{
	a=symbol
	if(a.substr(0,1)=='&'){a='&amp;'+a.substr(1,a.length-1)}
	x+=a+' '+sep
	for(j=0;j<total_width;j++){
		x+=symbol+sep
	}
}
document.getElementById(element).innerHTML=x
}
//XG_CHART_GRAPH
function xg_chart_graph(chart_type,title,data_array,min,max,symbols_array,element){
//chart_type=horizontal/vertical,h/v,>/^,bar/column,b/c - Google uses bar/column
//data array is first row is labels - Tasks, Hours/Day; subsequent rows are values - Work, 11. For dates, specify in first row {label:'WorkDate', type:'Date'}
//min_max_array is min,max values - outlying values are not included in graph
//symbol in symbols_array is any character, including emoji, unicode, and x_chart_symbol_...[]
//symbols_array can be single symbol, in which case, same symbol is used for each label/value
//total width and height are handled outside of routine by font-size and width,height of element
//xg_chart_width_or_height_between is global in px or em
//xg_chart_show_rulers is global var
var i,j,a='<h2>'+title+'</h2>',b,data_use_array=[],symbols_in_array=[],symbols_use_array=[]
chart_type=xg_chart_type(chart_type)
//handle min_max - list before chart
j=0
for(i=1;i<data_array.length;i++){
	if(Array.isArray(symbols_array)){symbols_in_array[j]=symbols_array[i]}
	else{symbols_in_array[j]=symbols_array}
	j+=1
}
j=0
b=''
for(i=1;i<data_array.length;i++){
	if(data_array[i][1]>=min && data_array[i][1]<=max){
		data_use_array[j]=data_array[i]
		symbols_use_array[j]=symbols_in_array[i]
		j+=1
	}
	else{
		if(b==''){b='<table><tr><td><u>'+data_array[0][0]+'</u><indent></td><td style="text-align:right"><u>'+data_array[0][1]+'</u></td></tr>'}
//		alert(data_array[i])
		b+='<tr><td>'+data_array[i][0]+'</td><td style="text-align:right">'+data_array[i][1]+'</td></tr>'
	}
}
if(b==''){}else{b='<b>Values Outside of Range</b><br>'+b+'</table>'}
a+=b
//end min_max
//xg_chart_build_ruler(chart_type,
if(chart_type=='b'){
}
else{
}
document.getElementById(element).innerHTML=a
}
// XG_CHART_TYPE
function xg_chart_type(chart_type){
var chart_type_use
if(chart_type===undefined || chart_type==''){chart_type_use=='s'}//'svg'
else{chart_type_use=chart_type.substr(0,1).toLowerCase()}
if(chart_type_use=='>' || chart_type_use=='h'){chart_type_use='b'}
if(chart_type_use=='^' || chart_type_use=='v'){chart_type_use='c'}
return chart_type_use
}
function xg_chart_build_ruler(chart_type,values_array){
var min_chart_value=x_array_math(values_array,'min')
var max_chart_value=x_array_math(values_array,'max')
var i, sp=' ',ruler_symbol
if(chart_type=='h'){sp='<br>'}
//what about if more than 1 digit or negative for factor of 10?
//not a problem for horizontal
//can stack digits for vertical
//but this causes spacing issues for either
//what about if use italic for negative and some statement before graph of the range and what the numbers and marks mean?
//what about if some values aren't in viewable range? Like 0 values? Perhaps list min_max outside of graph. How to determine?
//	Need average - keep removing min and max until avg between 0 and 10
//	That's too hard, make caller remove them or specify outlier values
for(i=min_chart_value;i<=max_chart_value;i++){
	if(i%10==0){ruler_symbol=i/10}
	else if(i%5==0){ruler_symbol='+'}
	else{if(chart_type=='h'){ruler_symbol='-'}else{ruler_symbol='|'}
}
if(chart_type=='h'){
}
else{
}
}
}
//XG_GRAPH_GOOGLE_INIT
function xg_graph_google_init(graph_type){
xg_graph_type_use=xg_graph_google_type(graph_type)
//google
//options
//xg_graph_data_types_array=['string','number','boolean','date','datetime','timeofday']
if(xg_graph_type_use=='p'){xg_graph_3d=true}// sets option is3D
else{xg_graph_3d=false}
xg_graph_background_color='#ffffff'//sets backgroundColor
xg_graph_font='Arial'
xg_graph_color_scheme='default'
xg_graph_colors=['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4678','#74b218','#b82e2e','#316395','#994499','#22aa99','#aaaa11','#6633cc','#e67300','#8b0707','#651067','#329262','#5574a6','#3b3eac','#b77322','#16d620','#b91383','#f4359e','#9c5935','#a9c413','#2a778d','#668d1c','#bea413','#0c5922','#743411']//then colors start to repeat
xg_graph_colors_material=['#4285f4','#5e97f5','#76a6f7','#db4437','#e06055','#e4776e','#f4b400','#f5bf26','#f7c846','#0f9d58','#33ab71','#51b886','#ab47bc','#b762c6','#c27ace','#00acc1','#26b8ca','#46c3d2','#ff7043','#ff855f','#ff9777','#9e9d24','#acab44','#b8b860','#5c6bc0','#7481c9','#8994d1','#f06292','#f279a2','#f48db0']//material colors use official colors for 3 slightly different shades of same color before moving on to the next color triplet.
xg_graph_stacked=false
//pieHole has value 0:1 for donut hole. 0 means no hole, 1 means hole takes entire pie
//xg_graph_pie_hole has values none=0,small=0.2,medium=0.4,large=0.6,xl=0.8; sets option pieHole
// from google:
//The pieHole option should be set to a number between 0 and 1, corresponding to the ratio of radii between the hole and the chart. Numbers between 0.4 and 0.6 will look best on most charts. Values equal to or greater than 1 will be ignored, and a value of 0 will completely shut your piehole.
xg_graph_pie_hole='none'//fyi piehole is ignored if 3d is true - no 3D donut graphs; but always default to none
xg_graph_pie_slice_visibility_threshold=0
xg_graph_pie_slice_other_label='Other'
xg_graph_pie_slice_other_color='#cccccc'
if(xg_graph_type_use=='d'){
	xg_graph_3d=false
	xg_graph_pie_hole='medium'
	xg_graph_type_use='p'
}
xg_graph_line_curve_type='n'//n/y Google default='None', 'y'='Function'
xg_graph_line_line_dash_style=[]
xg_graph_line_line_width=2//px - zero hides lines -> set points_visible to true to show points rather than lines
xg_graph_line_point_shape='circle'
xg_graph_line_point_shapes=['circle','triangle','square','diamond','star','pentagon']//Google uses polygon to default to pentagon. I'm not allowing other polygons.
xg_graph_line_point_size=0//px 7 is default for scatter charts (point only)
xg_graph_line_points_visible=false//google default is true
xg_graph_table_allow_html=true//google default is false
xg_graph_table_alternating_row_style=true
xg_graph_table_show_row_number=true
//you can override ..._sort_column and sort_ascending, but it will take longer to display your table. Best to presort it.
xg_graph_table_sort_column=-1
xg_graph_table_sort_ascending=true
xg_graph_geo_dataless_region_color='#F5F5F5'
xg_graph_geo_default_color='#267114'
xg_graph_geo_display_mode='auto'
xg_graph_geo_region='world'
xg_graph_geo_resolution='countries'
xg_graph_gauge_min_max=[0,100]
xg_graph_gauge_green=['#109618',-1,-1]
xg_graph_gauge_yellow=['#FF9900',-1,-1]
xg_graph_gauge_red=['#DC3912',-1,-1]
}
// XG_GRAPH_GOOGLE_TYPE
//graph_type if null, then svg --> s
//donut --> d - pie chart with a hole
//pie --> p - pie chart
//bar --> b - horizontal bar chart
//column --> c - vertical bar chart
//table --> t - data table that the user can sort
//geo --> g geo chart - Note that the geochart is not scrollable or draggable, and it's a line drawing rather than a terrain map; if you want any of that, consider a map visualization instead. - if you want to use geocoding or non-standard codes, you'll need a maps API key. If you want to use markers or text on geo, that requires geocoding, so you'll need a maps API key.
function xg_graph_google_type(graph_type){
var graph_type_use,graph_type_use_2
if(graph_type===undefined || graph_type==''){graph_type_use=='s'}//'svg'
else{graph_type_use=graph_type.substr(0,1).toLowerCase()}
if(graph_type_use=='>' || graph_type_use=='h'){graph_type_use='b'}
if(graph_type_use=='^' || graph_type_use=='v'){graph_type_use='c'}
if(graph_type_use=='|'){graph_type_use='l'}
if(graph_type_use=='o'){graph_type_use='p'}
if(graph_type_use=='#'){graph_type_use='t'}
if(graph_type_use=='@'){graph_type_use='g'}
if(graph_type_use=='/'){graph_type_use='gg'}
if(graph_type_use=='g'){
	graph_type_use=graph_type.substr(0,2)
	if(graph_type_use=='ge'){graph_type_use='g'}
	else{graph_type_use='gg'}
}
return graph_type_use
}
// XG_GRAPH_GOOGLE_APPLY_COLOR
function xg_graph_google_apply_color(data_array,color_array){
var i,cnt,data_array_sorted=[]
xg_graph_colors=[]
//if(xg_graph_type_use=='b'){alert(color_array)}
if(xg_graph_type_use=='p'){
	if(color_array.length<31){color_array=x_array_repeat(color_array,31,[])}//31 is number of default colors google has before repeating. Could loop for data_array.length, but bar and column need to loop for width or width-1 in some cases.
	for(i=0;i<data_array.length-1;i++){xg_graph_colors[i]=color_array[i]}
	xg_graph_color_scheme='slices'
}
if(xg_graph_type_use=='b' || xg_graph_type_use=='c' || xg_graph_type_use=='l'){
	if(color_array.length<31){color_array=x_array_repeat(color_array,31,[])}//31 is number of default colors google has before repeating. Could loop for data_array.length, but bar and column need to loop for width or width-1 in some cases.
	if(xg_graph_color_scheme=='default'){
		for(i=0;i<data_array.length-1;i++){xg_graph_colors[i]=color_array[i]}
		xg_graph_color_scheme='series'
	}
	else{
		if(xg_graph_color_scheme=='primary'){
			for(i=0;i<data_array.length-1;i++){xg_graph_colors[i]=color_array[i]}
			data_array=xg_graph_google_apply_role(data_array,'color',color_array)
			return data_array
		}
		else{//series or primary+series
			for(i=0;i<data_array[0].length;i++){xg_graph_colors[i]=color_array[i]}
		}
	}
}
if(xg_graph_type_use=='t'){
//color table:
//Default allowHTML to true; alternatingRowStyle=true
//cssClassNames={tableRow:class or oddTableRow:class} - would require too many classes; otherwise, there's google.visualization.ColorFormat() which applies a range of colors.
	xg_graph_color_scheme='css classes'
}
if(xg_graph_type_use=='g'){
//colorAxis option - colorAxis:{colors:[]} - colors specify range/gradient. Can specify more than 2 values, but still gradient.
//colors option - also uses gradient
//use xg_graph_color_scheme - normal/gradient;colors
	if(xg_graph_color_scheme=='specific'){//one color per value
	//***try with just 2 or three colors
		for(i=1;i<data_array.length;i++){data_array_sorted[i-1]=data_array[i][1]}
		data_array_sorted=data_array_sorted.sort()//order doesn't really matter, just looking for unique values. This sorts by strings, rather than numerically
		cnt=0
		if(data_array_sorted[0]==data_array_sorted[1]){cnt=1}
		for(i=1;i<data_array_sorted.length;i++){
			if(data_array_sorted[i-1]!=data_array_sorted[i]){cnt+=1}
		}
		if(data_array_sorted.length>1){
			if(data_array_sorted[data_array_sorted.length]!=data_array_sorted[data_array_sorted.length-1]){cnt+=1}
		}
		if(color_array.length<cnt){color_array=x_array_repeat(color_array,cnt,[])}
		for(i=0;i<cnt;i++){xg_graph_colors[i]=color_array[i]}
		//for(i=0;i<data_array.length;i++){xg_graph_colors[i]=color_array[i]}
		//alert(xg_graph_colors)
	}
	else{
		for(i=0;i<color_array.length;i++){xg_graph_colors[i]=color_array[i]}//do not repeat colors
		xg_graph_color_scheme='gradient'
	}
}
if(xg_graph_type_use=='gg'){
	xg_graph_gauge_green=color_array[0];xg_graph_gauge_yellow=color_array[1];xg_graph_gauge_red=color_array[2]
	xg_graph_color_scheme='green_yellow_red'
}
}
// XG_GRAPH_GOOGLE_APPLY_ROLE
// each column can have type, label, id, role, pattern - don't specify pattern if specifying format in data
//   column roles in Google Charts https://developers.google.com/chart/interactive/docs/roles
//   annotation, annotationText (tooltip for annotation), certainty, emphasis, interval, scope, style: color, opacity, stroke-width, stroke-color, stroke-opacity, fill-color, fill-opacity, tooltip, domain (extra labels), data
// no real need to set roles, other than style and animation
function xg_graph_google_apply_role(data_array,role_type,role_array){
var i,wid=data_array[0].length
//alert(role_type)
if(role_array.length<data_array.length){role_array=x_array_repeat(role_array,data_array.length-1,[])}
//alert(role_array)
if(role_type=='color' || role_type=='style'){data_array[0][wid]={role:'style'}}
else{data_array[0][wid]=role_type}
for(i=1;i<data_array.length;i++){data_array[i][wid]=role_array[i-1]}
return data_array
}
// XG_GRAPH_GOOGLE_DRAW
// Coding for Pie, Bar, Column, Table, and Geo Charts
// Other types of charts that Google supplies: annotation, area, bubble, calendar, candlestick, combo, diff, gantt, guage, histograms, interval, line, map (requires google maps api uses satellite images rather than line drawings as geo does), org, sankey diagram, scatter, stepped area, timelines, tree map, trendlines, vega (experimental - uses vega visualization grammar), waterfall, word trees 
function xg_graph_google_draw(title,data_array,el){
//graph type - from xg_graph_google_init
// bar=bar,b,horizontal,hor,h,>
// column=column,col,c,vertical,ver,v,^
// pie=pie,p,o
// table=table,tab,t,#
// geographic=geographic,geo,g,@
xg_graph_el=el
xg_graph_title=title
//xg_data_table=google.visualization.arrayToDataTable(data_array)//Cannot read properties of undefined (reading 'arrayToDataTable') This method was suggested, but didn't work and not needed with how I'm doing it
xg_graph_data_table=data_array
xg_graph_el_array[xg_graph_count]=xg_graph_el
xg_graph_title_array[xg_graph_count]=xg_graph_title
xg_graph_data_table_array[xg_graph_count]=xg_graph_data_table
xg_graph_type_array[xg_graph_count]=xg_graph_type_use
xg_graph_3d_array[xg_graph_count]=xg_graph_3d
xg_graph_background_color_array[xg_graph_count]=xg_graph_background_color
xg_graph_font_array[xg_graph_count]=xg_graph_font
xg_graph_color_scheme_array[xg_graph_count]=xg_graph_color_scheme
xg_graph_colors_array[xg_graph_count]=xg_graph_colors
xg_graph_stacked_array[xg_graph_count]=xg_graph_stacked
xg_graph_pie_hole_array[xg_graph_count]=xg_graph_pie_hole
xg_graph_pie_slice_visibility_threshold_array[xg_graph_count]=xg_graph_pie_slice_visibility_threshold
xg_graph_pie_slice_other_label_array[xg_graph_count]=xg_graph_pie_slice_other_label
xg_graph_pie_slice_other_color_array[xg_graph_count]=xg_graph_pie_slice_other_color
xg_graph_line_curve_type_array[xg_graph_count]=xg_graph_line_curve_type
xg_graph_line_line_dash_style_array[xg_graph_count]=xg_graph_line_line_dash_style
xg_graph_line_line_width_array[xg_graph_count]=xg_graph_line_line_width
xg_graph_line_point_shape_array[xg_graph_count]=xg_graph_line_point_shape
xg_graph_line_point_size_array[xg_graph_count]=xg_graph_line_point_size
xg_graph_line_points_visible_array[xg_graph_count]=xg_graph_line_points_visible
xg_graph_table_allow_html_array[xg_graph_count]=xg_graph_table_allow_html
xg_graph_table_alternating_row_style_array[xg_graph_count]=xg_graph_table_alternating_row_style
xg_graph_table_show_row_number_array[xg_graph_count]=xg_graph_table_show_row_number
xg_graph_table_sort_column_array[xg_graph_count]=xg_graph_table_sort_column
xg_graph_table_sort_ascending_array[xg_graph_count]=xg_graph_table_sort_ascending
xg_graph_geo_dataless_region_color_array[xg_graph_count]=xg_graph_geo_dataless_region_color
xg_graph_geo_default_color_array[xg_graph_count]=xg_graph_geo_default_color
xg_graph_geo_display_mode_array[xg_graph_count]=xg_graph_geo_display_mode
xg_graph_geo_region_array[xg_graph_count]=xg_graph_geo_region
xg_graph_geo_resolution_array[xg_graph_count]=xg_graph_geo_resolution
xg_graph_gauge_min_max_array[xg_graph_count]=xg_graph_gauge_min_max
xg_graph_gauge_green_array[xg_graph_count]=xg_graph_gauge_green
xg_graph_gauge_yellow_array[xg_graph_count]=xg_graph_gauge_yellow
xg_graph_gauge_red_array[xg_graph_count]=xg_graph_gauge_red
xg_graph_count+=1
//alert(xg_graph_data_table_array)
//alert(xg_graph_type_use)
}
// XG_GRAPH_GOOGLE_DRAW_CHART
function xg_graph_google_draw_chart(){
xg_graph_count
var i,j,pie_hole_use,pie_hole_lc
for(i=0;i<xg_graph_count;i++){
	if(xg_graph_type_array[i]=='p'){
		pie_hole_use=0
		pie_hole_lc=xg_graph_pie_hole_array[i].toLowerCase()
		if(pie_hole_lc=='none'){pie_hole_use=0}
		if(pie_hole_lc=='small'){pie_hole_use=0.2}
		if(pie_hole_lc=='medium' || pie_hole_lc=='med'){pie_hole_use=0.4}
		if(pie_hole_lc=='large'){pie_hole_use=0.6}
		if(pie_hole_lc=='xl'){pie_hole_use=0.8}
		if(pie_hole_lc=='none'){}else{xg_graph_3d_array[i]=false}
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"PieChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"pieHole":pie_hole_use,"sliceVisibilityThreshold":xg_graph_pie_slice_visibility_threshold_array[i],"pieResidueSliceLabel":xg_graph_pie_slice_other_label_array[i],"pieResidueSliceColor":xg_graph_pie_slice_other_color_array[i]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"PieChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"pieHole":pie_hole_use,"sliceVisibilityThreshold":xg_graph_pie_slice_visibility_threshold_array[i],"pieResidueSliceLabel":xg_graph_pie_slice_other_label_array[i],"pieResidueSliceColor":xg_graph_pie_slice_other_color_array[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='b'){
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"BarChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"isStacked":xg_graph_stacked[i]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"BarChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"isStacked":xg_graph_stacked[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='c'){
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"ColumnChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"isStacked":xg_graph_stacked[i]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"ColumnChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"isStacked":xg_graph_stacked[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='l'){
		if(xg_graph_line_curve_type_array[i].substr(0,1).toLowerCase()=='n'){xg_graph_line_curve_type_array[i]='none'}
		if(xg_graph_line_curve_type_array[i].substr(0,1).toLowerCase()=='y'){xg_graph_line_curve_type_array[i]='function'}
		if(xg_graph_line_line_width_array[i]==0 && xg_graph_line_point_size_array[i]==0){xg_graph_line_points_visible_array[i]=true;xg_graph_line_point_size_array[i]=7}
		if(xg_graph_line_points_visible_array[i] && xg_graph_line_point_size_array[i]==0){xg_graph_line_point_size_array[i]=7}
		if(xg_graph_line_point_shape_array[i]=='pentagon'){xg_graph_line_point_shape_array[i]='polygon'}
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"LineChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"curveType":xg_graph_line_curve_type_array[i],"fontName":xg_graph_font_array[i],"lineDashStyle":xg_graph_line_line_dash_style_array[i],"lineWidth":xg_graph_line_line_width_array[i],"pointShape":xg_graph_line_point_shape_array[i],"pointSize":xg_graph_line_point_size_array[i],"pointsVisible":xg_graph_line_points_visible_array[i],"title":xg_graph_title_array[i]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"LineChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"curveType":xg_graph_line_curve_type_array[i],"fontName":xg_graph_font_array[i],"lineDashStyle":xg_graph_line_line_dash_style_array[i],"lineWidth":xg_graph_line_line_width_array[i],"pointShape":xg_graph_line_point_shape_array[i],"pointSize":xg_graph_line_point_size_array[i],"pointsVisible":xg_graph_line_points_visible_array[i],"title":xg_graph_title_array[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='t'){
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"Table",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"allowHtml":xg_graph_table_allow_html_array[i],"alternatingRowStyle":xg_graph_table_alternating_row_style_array[i],"showRowNumber":xg_graph_table_show_row_number_array[i],
					"sortColumn":xg_graph_table_sort_column_array[i],"sortAscending":xg_graph_table_sort_ascending_array[i]
				}	
			})
		}
		else{
			let css_class_names={headerRow:'xg_table_header_color',tableRow:'xg_table_row_color',oddTableRow:'xg_table_alternating_row_color'}
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"Table",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"cssClassNames":css_class_names,"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"allowHtml":xg_graph_table_allow_html_array[i],"alternatingRowStyle":xg_graph_table_alternating_row_style_array[i],"showRowNumber":xg_graph_table_show_row_number_array[i],
					"sortColumn":xg_graph_table_sort_column_array[i],"sortAscending":xg_graph_table_sort_ascending_array[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='g'){//xg_graph_geo_display_mode_array can be 'auto','regions','markers','text'. markers and text require geocoding which requires Maps API Key. auto is based on data, but seems to be same as regions. Leaving it at auto for now. Markers and text will not show up without API Key. Can override to regions if auto is not working.
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"GeoChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"datalessRegionColor":xg_graph_geo_dataless_region_color_array[i],"defaultColor":xg_graph_geo_default_color_array[i],"displayMode":xg_graph_geo_display_mode_array[i],"region":xg_graph_geo_region_array[i],"resolution":xg_graph_geo_resolution_array[i]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"GeoChart",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"datalessRegionColor":xg_graph_geo_dataless_region_color_array[i],"defaultColor":xg_graph_geo_default_color_array[i],"displayMode":xg_graph_geo_display_mode_array[i],"region":xg_graph_geo_region_array[i],"resolution":xg_graph_geo_resolution_array[i]
				}	
			})
		}
	}
	if(xg_graph_type_array[i]=='gg'){
		if(xg_graph_color_scheme_array[i]=='default'){
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"Gauge",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"min":xg_graph_gauge_min_max_array[i][0],"max":xg_graph_gauge_min_max_array[i][1]
				}	
			})
		}
		else{
			google.visualization.drawChart({
				"containerId":xg_graph_el_array[i],
				"dataTable":xg_graph_data_table_array[i],
				"chartType":"Gauge",
				"options":{"backgroundColor":xg_graph_background_color_array[i],"colors":xg_graph_colors_array[i],"fontName":xg_graph_font_array[i],"title":xg_graph_title_array[i],"is3D":xg_graph_3d_array[i],
					"min":xg_graph_gauge_min_max_array[i][0],"max":xg_graph_gauge_min_max_array[i][1],"greenColor":xg_graph_gauge_green_array[i][0],"greenFrom":xg_graph_gauge_green_array[i][1],"greenTo":xg_graph_gauge_green_array[i][2],"yellowColor":xg_graph_gauge_yellow_array[i][0],"yellowFrom":xg_graph_gauge_yellow_array[i][1],"yellowTo":xg_graph_gauge_yellow_array[i][2],"redColor":xg_graph_gauge_red_array[i][0],"redFrom":xg_graph_gauge_red_array[i][1],"redTo":xg_graph_gauge_red_array[i][2]
				}	
			})
		}
	}
}
}
//XG_SHAPE
//XG_SHAPE_DRAW
function xg_shape_draw(shape_element_id,shape_class=[''],shape_position=['absolute',0,0,-1,-1],shape_size=['100px','100px'],shape_border,shape_style_extra='',shape_content_center=[['center','center'],['0','0']],shape_content=''){
var shape_element=document.getElementById(shape_element_id)
//shape_style='position:absolute;[left:?;][top:?;][right:?;][bottom:?;]width:?;height:?;[border:?;][extra];justify-content:?;align-items:?;transform:translate(?,?)' + class
var shape_style='position:'+shape_position[0]
if(shape_position[1]>-1){shape_style+=';left:'+shape_position[1]}
if(shape_position[2]>-1){shape_style+=';top:'+shape_position[2]}
if(shape_position[3]>-1){shape_style+=';right:'+shape_position[3]}
if(shape_position[4]>-1){shape_style+=';bottom:'+shape_position[4]}
shape_style+=';width:'+shape_size[0]
shape_style+=';height:'+shape_size[1]
if(shape_border==''){}else{shape_style+=';border:'+shape_border}
if(shape_style_extra==''){}else{shape_style+=';'+shape_style_extra}
shape_style+=';display:flex;justify-content:'+shape_content_center[0][0]+';align-items:'+shape_content_center[0][1]+';transform:translate('+shape_content_center[1][0]+','+shape_content_center[1][1]+')'
shape_element.setAttribute('style',shape_style)
shape_element.classList.add(...shape_class)
if(shape_content==''){}else{shape_element.innerHTML=shape_content}
}
//XG_SHAPE_STYLE
//INHERIT is parent value. Can get with ComputedStyle, but element does not exist yet or if it does, would have to pass it. So, not allowed to use INHERIT for drawing shapes
//INITIAL is default value
function xg_shape_style(style,shape_sizes_array=[[0,0],[0,0]],mify='minify'){
//shape_sizes is [[old_width,old_height],[new_width,new_height]]
//m_ify is minify,midify,maxify
//clip-path - similar to shape_outside. Too difficult, didn't do
//Add box-shadow. can be none||offsetx offsety color||offsetx offsety blurradius color||offsetx offsety blurradius spreadradius color||inset offsetx offsety color or inset any of the above||shadow,shadow,shadow,...|||color is optional and can't be a number unless preceded by #. All other numbers have unit unless 0. color can be rgb(), so can contain spaces - splitting entire property on space won't work in this case. So, require programmer to not have spaces in color. How would I adjust blurradius and spreadradius, since they're single values (not x and y)? Not using box-shadow - not adding for now.
//shape-outside? shape_outside:circle/ellipse/polygon/inset. circle has border-radius + optional at coordinate pair, ellipse has border-radius pair at coordinate pair, polygon has any number of coordinate pairs, inset has left,top,right,bottom + border-radius (optional). Not all 4 sides need to be set on inset - follows border rules for that. But how to know if also have border-radius then? Coordinate pair can be in any units. Too difficult, didn't do
//transform:skew is angle, so remains the same: Not coded for
if(shape_sizes_array==''){shape_sizes_array=[[0,0],[0,0]]}
if(mify==''){mify='minify'}
var style_array=style.split(':')//splits style name from style
var i,x,shape_sizes_ratio_array=[],style_maxified,shape_sizes_amt_array=[],shape_sizes_unit_array=[],style_values_amt_array=[],style_values_unit_array=[],style_values_array=[]
var style_property=style_array[0].trim()
var border_width,border_style,border_color,border_property_array
if(xg_shape_border_sides_variants_array.indexOf(style_property>=0)){
	border_property_array=style_array[1].split(' ')
	border_width=border_property_array[0]
	border_style=border_property_array[1]
	border_color=border_property_array[2]
}
x=xg_shape_style_mify(style,'maxify')
style_values_amt_array=xg_shape_style_array_retain(x[2],'number')
style_values_unit_array=xg_shape_style_array_retain(x[2],'text')
if(style_property=='border-radius'){
	if(shape_sizes_array==[[0,0],[0,0]] || (shape_sizes_array[0][0]==shape_sizes_array[1][0] && shape_sizes_array[0][1]==shape_sizes_array[1][1])){}//array is empty or old==new
	else{// adjust values based on shape_sizes_array
		shape_sizes_amt_array=xg_shape_style_array_retain(shape_sizes_array,'number')
		shape_sizes_unit_array=xg_shape_style_array_retain(shape_sizes_array,'text')
		shape_sizes_ratio_array[0]=shape_sizes_amt_array[1][0]/shape_sizes_amt_array[0][0]
		shape_sizes_ratio_array[1]=shape_sizes_amt_array[1][1]/shape_sizes_amt_array[0][1]
		for(i=0;i<4;i++){
			if(style_values_unit_array[i].toString().trim()=='%'){
				style_values_array[i]=style_values_amt_array[i]+style_values_unit_array[i]
			}
			else{style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[0]).toFixed(1)+style_values_unit_array[i]}
		}
		for(i=4;i<8;i++){
			if(style_values_unit_array[i].toString().trim()=='%'){
				style_values_array[i]=style_values_amt_array[i]+style_values_unit_array[i]
			}
			else{style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[1]).toFixed(1)+style_values_unit_array[i]}
		}
		//rebuild style and re-ify it
		style_maxified=style_property+':'
		for(i=0;i<4;i++){
			if(i>0){style_maxified+=' '}
			style_maxified+=style_values_array[i]
		}
		style_maxified+=' / '
		for(i=4;i<8;i++){
			if(i>4){style_maxified+=' '}
			style_maxified+=style_values_array[i]
		}
		x=xg_shape_style_mify(style_maxified,mify)	
	}
}
if(xg_shape_border_sides_variants_array.indexOf(style_property>=0)){
	if(shape_sizes_array==[[0,0],[0,0]] || (shape_sizes_array[0][0]==shape_sizes_array[1][0] && shape_sizes_array[0][1]==shape_sizes_array[1][1])){}//array is empty or old==new
	else{// adjust values based on shape_sizes_array
		shape_sizes_amt_array=xg_shape_style_array_retain(shape_sizes_array,'number')
		shape_sizes_unit_array=xg_shape_style_array_retain(shape_sizes_array,'text')
		shape_sizes_ratio_array[0]=shape_sizes_amt_array[1][0]/shape_sizes_amt_array[0][0]
		shape_sizes_ratio_array[1]=shape_sizes_amt_array[1][1]/shape_sizes_amt_array[0][1]
		//if border: and ratios not equal, becomes border-left:,etc.
		for(i=0;i<style_values_amt_array.length;i++){
			if(style_values_unit_array[i].toString().trim()=='%'){
				style_values_array[i]=style_values_amt_array[i]+style_values_unit_array[i]
			}
			else{
				if(['thin','medium','thick'].indexOf(style_values_unit_array[i].toString().trim())>-1){
					style_values_array[i]=style_values_unit_array[i]
				}
				else{
					if(['border-left','border-right'].indexOf(style_property)>-1){
						style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[0]).toFixed(1)+style_values_unit_array[i]
					}
					if(['border-top','border-bottom'].indexOf(style_property)>-1){
						style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[1]).toFixed(1)+style_values_unit_array[i]
					}
					if(['border'].indexOf(style_property)>-1){
						if([0,2].indexOf(i)>-1){
							style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[0]).toFixed(1)+style_values_unit_array[i]
						}
						else{
							style_values_array[i]=(style_values_amt_array[i]*shape_sizes_ratio_array[1]).toFixed(1)+style_values_unit_array[i]
						}
					}
				}
			}
		}
		//rebuild style and re-ify it
		if(style_property=='border'){
			style_maxified='border-left:'+style_values_array[0]+' '+border_style+' '+border_color+';'
			style_maxified+='border-top:'+style_values_array[1]+' '+border_style+' '+border_color+';'
			style_maxified+='border-right:'+style_values_array[2]+' '+border_style+' '+border_color+';'
			style_maxified+='border-bottom:'+style_values_array[3]+' '+border_style+' '+border_color
			style_midified=style_maxified
			style_minified=style_maxified
			if(style_values_array[0]==style_values_array[1] && style_values_array[1]==style_values_array[2] && style_values_array[2]==style_values_array[3]){
				style_midified=style_property+':'+style_values_array[0]+' '+border_style+' '+border_color
				style_minified=style_property+':'+style_values_array[0]+' '+border_style+' '+border_color
			}
		}
		else{
			style_maxified=style_property+':'+style_values_array[0]+' '+border_style+' '+border_color
			style_midified=style_property+':'+style_values_array[0]+' '+border_style+' '+border_color
			style_minified=style_property+':'+style_values_array[0]+' '+border_style+' '+border_color
		}
		//rebuild x[1] by hand, rather than calling xg_shape_style_mify
		x[1][0]=style_minified
		x[1][1]=style_midified
		x[1][2]=style_maxified
	}
}
if(mify=='minify'){return x[1][0]}
if(mify=='midify'){return x[1][1]}
if(mify=='maxify'){return x[1][2]}
}
function xg_shape_style_mify(style,mify){
var i,j,style_array=style.split(':'),style_values_array=[];new_style='';style_minified='';style_midified='';style_maxified=''
var style_property=style_array[0].trim()
var border_width,border_style,border_color,border_width_style_color,border_property_array
if(style_property=='border-radius'){
	style_values_array=style_array[1].replace(' / ',' ').replace('/','').split(' ')
	for(i=0;i<style_values_array.length;i++){if(style_values_array[i].toLowerCase()=='initial'){style_values_array[i]='0%'}}
	//expand to 8 values
	if(style_values_array.length==1){style_values_array[1]=style_values_array[0]}
	if(style_values_array.length==2){style_values_array[2]=style_values_array[0]}
	if(style_values_array.length==3){style_values_array[3]=style_values_array[1]}
	if(style_values_array.length==4){for(i=4;i<8;i++){style_values_array[i]=style_values_array[i-4]}}
	style_maxified=style_property+':'
	for(i=0;i<4;i++){
		if(i>0){style_maxified+=' '}
		style_maxified+=style_values_array[i]
	}
	style_midified=style_maxified.trim()
	style_maxified+='/ '
	for(i=4;i<8;i++){
		if(i>4){style_maxified+=' '}
		style_maxified+=style_values_array[i]
	}
	style_maxified=style_maxified.trim()
	if(style_values_array[0]==style_values_array[4] && style_values_array[1]==style_values_array[5] && style_values_array[2]==style_values_array[6] && style_values_array[3]==style_values_array[7]){}
	else{style_midified=style_maxified}
	if(style_midified==style_maxified){style_minified=style_maxified}
	else{
		style_minified=style_property+':'
		if(style_values_array[0]==style_values_array[1] && style_values_array[1]==style_values_array[2] && style_values_array[2]==style_values_array[3] && style_values_array[3]==style_values_array[4]){style_minified+=style_values_array[0]}
		else{
			if(style_values_array[0]==style_values_array[2] && style_values_array[1]==style_values_array[3]){style_minified+=style_values_array[0]+' '+style_values_array[1]}
			else{
				if(style_values_array[1]==style_values_array[3]){style_minified+=style_values_array[0]+' '+style_values_array[1]+' '+style_values_array[2]}
				else{style_minified=style_midified}
			}
		}
	}
	for(i=0;i<8;i++){if(style_values_array[i]=='0'){style_values_array[i]+='%'}}
	return [style_property,[style_minified,style_midified,style_maxified],style_values_array]
}
if(xg_shape_border_sides_variants_array.indexOf(style_property>=0)){
	//border:border-width border-style border-color
	//border-width is optional, but must be specified for this function. style and color are also optional. Must also be specified for this function.
	//border-width can be initial, inherit, revert, revert-layer, unset. initial can be specified (medium), others cannot
	border_property_array=style_array[1].split(' ')
	border_width=border_property_array[0]
	border_style=border_property_array[1]
	border_color=border_property_array[2]
	border_width_style_color=border_width+' '+border_style+' '+border_color
	style_values_array[0]=border_width
	if(border_width.toLowerCase()=='initial'){border_width='medium'}
	style_maxified=style_property+':'+border_width_style_color
	style_midified=style_maxified
	style_minified=style_maxified
	if(style_property=='border'){
		style_maxified=style_property+'-left:'+border_width_style_color+';'
		style_maxified=style_maxified+';'+style_property+'-top:'+border_width_style_color+';'
		style_values_array[1]=style_values_array[0]
		style_maxified=style_maxified+';'+style_property+'-right:'+border_width_style_color+';'
		style_values_array[2]=style_values_array[0]
		style_maxified=style_maxified+';'+style_property+'-bottom:'+border_width_style_color
		style_values_array[3]=style_values_array[0]
	}
	for(i=0;i<style_values_array.length;i++){if(style_values_array[i]=='0'){style_values_array[i]+='%'}}
	return [style_property,[style_minified,style_midified,style_maxified],style_values_array]
}
}
function xg_shape_style_array_retain(array_in,retain){
//use x=structureClone(y) to make x be a deep (separate) copy of y
var i,j,numstr,num,txt,array_out=structuredClone(array_in)//to set size
var value_i_j
for(i=0;i<array_in.length;i++){
	if(Array.isArray(array_in[i])){
		for(j=0;j<array_in[i].length;j++){
			value_i_j=array_in[i][j]
			numstr=value_i_j.toString().replace(/[^0-9.-]/g,'');num=+numstr//remove text; convert to number
			txt=value_i_j.toString().replace(/[0-9.-]/g,'')
			if(retain=='number'){array_out[i][j]=num}
			else{array_out[i][j]=txt}
		}
	}
	else{
		numstr=array_in[i].toString().replace(/[^0-9.-]/g,'');num=+numstr//remove text; convert to number
		txt=array_in[i].toString().replace(/[0-9.-]/g,'')
		if(retain=='number'){array_out[i]=num}
		else{array_out[i]=txt}
	}
}
return array_out
}
function xg_shape_style_array_recombine(array_number,array_text){
//use x=structureClone(y) to make x be a deep (separate) copy of y
var i,j,array_out=structuredClone(array_number)//to set size
if(Array.isArray(array_number[0])){array_out=[0,0]}else{array_out=[0]}
for(i=0;i<array_number.length;i++){
	if(Array.isArray(array_number[i])){
		for(j=0;j<array_in[i].length;j++){
			array_out[i][j]=array_number[i][j]+array_text[i][j]
		}
	}
	else{array_out[i]=array_number[i]+array_text[i]}
}
return array_out
}
/* xg_canvas functions
simplify html canvas javascript functions

*** Intensive Canvas might take up too much resources. For that and for drawing you don't want the user to see (perhaps intermediate drawings) create an OffscreenCanvas
*** Specify width and height as attributes of canvas rather than as style attributes on the canvas. If you specify them as style attributes, your drawing will get scaled, probably when you don't want it to
*** Is there a way to specify resolution? Default doesn't look fine / high enough. 1px wide line is too wide.
*** set in xg_canvas functions can mean set variables or set within canvas object

xg_canvas allows you to set global vars rather than passing parameters to functions. This means that you don't have to remember the order of the parameters. xg_canvas functions have more meaningful names

You might want to xg_context.restore() to a previous xg_context.save() - xg_canvas_init does the first .save for you.

*** Next Steps
Add draw_rectangle; fill_rectangle
Add skew

*/

// initialize xg_canvas vars and the canvas 
function xg_canvas_init(canvas_el,dimension_engine){
//pass cavas_el - the id of the canvas element; dimension_engine - 2d or 3d / webgl. 3d gets interpreted as webgl.
/* initializes xg vars:
	xg_canvas - canvas object
	xg_canvas_context - used for all drawing within canvas - usually referred to as ctx in internet examples
	xg_canvas_00 - an array of [0,0];xg_canvas_01 - an array of [0,1];xg_canvas_10 - an array of [1,0];xg_canvas_11 - an array of [1,1]
	xg_canvas_from_xy - array of x,y coordinates in canvas element
	xg_canvas_scale_xy
	xg_canvas_skew_xy
	xg_canvas_move_xy
	xg_canvas_size - array of width,height of canvas
*/
xg_canvas=document.getElementById(canvas_el);xg_canvas_wh=[xg_canvas.width,xg_canvas.height]
if(dimension_engine===undefined || dimension_engine==''){dimension_engine='2d'}
if(dimension_engine=='3d'){dimension_engine='webgl'}
xg_canvas_context=xg_canvas.getContext(dimension_engine)
xg_canvas_00=[0,0];xg_canvas_01=[0,1];xg_canvas_10=[1,0];xg_canvas_11=[1,1]
xg_canvas_from_xy=xg_canvas_00
xg_canvas_erase_rectangle(xg_canvas_00,xg_canvas_wh)/*clear canvas*/
xg_canvas_reset_xy_etc()
xg_canvas_context.save()
}
// init transformation scales, skews, moves
function xg_canvas_init_scales_skews_moves(){
xg_canvas_scale_xy=xg_canvas_11
xg_canvas_skew_xy=xg_canvas_00
xg_canvas_move_xy=xg_canvas_00
}
// applies transformation scales, skews, and moves - use this when want to start new drawing or start drawing somewhere else.
function xg_canvas_apply_scales_skews_moves(){
// set the following vars before -> should not have to set anything - need set and reset functions? 
xg_canvas_context.setTransform(xg_canvas_scale_xy[0], xg_canvas_skew_xy[0], xg_canvas_move_xy[0], xg_canvas_scale_xy[1], xg_canvas_skew_xy[1], xg_canvas_move_xy[1])
}
// init and set transformation scales, skews, moves; used to reset coordinates
function xg_canvas_init_apply_scales_skews_moves(){
xg_canvas_init_scales_skews_moves()
xg_canvas_apply_scales_skews_moves()
}
// use to reset xy and more
// ***actually doesn't directly reset xy - don't understand how it works
function xg_canvas_reset_xy_etc(){xg_canvas_init_apply_scales_skews_moves()}
// *** rename to ..._rectangle
// clears a rectangle within the canvas
function xg_canvas_erase_rectangle(start_xy,wh){
// pass start_xy - array of start coordinates; wh - array of width and height of rectangle
xg_canvas_context.clearRect(start_xy[0],start_xy[1],wh[0],wh[1])/*clear canvas*/
}
function xg_canvas_draw_rectangle(){
// pass start_xy - array of start coordinates; wh - array of width and height of rectangle
xg_canvas_context.beginPath()
xg_canvas_context.lineWidth=1
alert(xg_canvas_from_xy)
alert(xg_canvas_to_xy)
xg_canvas_context.strokeRect(xg_canvas_from_xy[0], xg_canvas_from_xy[1], xg_canvas_to_xy[0], xg_canvas_to_xy[1])
xg_canvas_context.stroke();
}
/* draw a light colored grid on the canvas */
function xg_canvas_draw_grid(){
alert(xg_canvas_wh)
xg_canvas_context.lineWidth=1
xg_canvas_context.strokeStyle="WhiteSmoke"
let i
xg_canvas_from_xy=xg_canvas_00
xg_canvas_to_xy=xg_canvas_wh /*draw down first*/
let imax=xg_canvas_wh[1]
for(i=0;i<imax;i=i+10){
	xg_canvas_from_xy[1]+=10
	xg_canvas_to_xy[1]=xg_canvas_from_xy[1]
	xg_canvas_draw_line()
}
alert(xg_canvas_wh)
xg_canvas_from_xy=xg_canvas_00
xg_canvas_to_xy=xg_canvas_wh
imax=xg_canvas_wh[0]
for(i=0;i<imax;i=i+10){
	xg_canvas_from_xy[0]+=10
	xg_canvas_to_xy[0]=xg_canvas_from_xy[0]
	xg_canvas_draw_line()
}
//globalCompositeOperation = "destination-over"
//alert('grid drawn?')
}
/* need to make generic with for loop and also vertical hatchmarks */
function xg_canvas_draw_hatchmark(hatchmark_count){
xg_canvas_from_xy=[0,xg_canvas_wh[1]/(hatchmark_count+1)]
xg_canvas_to_xy=[10,xg_canvas_wh[1]/(hatchmark_count+1)]
xg_canvas_draw_line()
xg_canvas_from_xy=[xg_canvas_wh[0],xg_canvas_wh[1]/(hatchmark_count+1)]
xg_canvas_to_xy=[xg_canvas_wh[0]-10,xg_canvas_wh[1]/(hatchmark_count+1)]
xg_canvas_draw_line()
//xg_canvas_init_apply_scales_skews_moves()
}
function xg_canvas_draw_line(){
xg_canvas_context.beginPath();
xg_canvas_context.moveTo(xg_canvas_from_xy[0],xg_canvas_from_xy[1]);
xg_canvas_context.lineTo(xg_canvas_to_xy[0],xg_canvas_to_xy[1]);
xg_canvas_context.stroke();
}
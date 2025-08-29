//xf_form.js  by Dale Stubbart

//xf_form_INIT
function xf_form_init(){
//    version
xf_form_version_major=1;xf_form_version_minor=4;xf_form_version_revision=0;
xf_form_version=xf_form_version_major.toString()+'.'+xf_form_version_minor.toString()+'.'+xf_form_version_revision.toString();
xf_form_size='<25KB';xf_form_lines='<750'
xf_form_elements=['label','input','select','textarea','button','fieldset','legend','output','option','optgroup']
xf_input_main_elements=['input','select','textarea']
xf_input_main_elements_string=xf_input_main_elements.join()
xf_label_partners=['button','input','output','select','textarea','meter','progress']//input hidden cannot have a label
xf_base='a';xf_based='&#x1d5ba'
xf_email_label_before='';xf_email_label_after=':'
}
// use data- attributes to qualify input tags in form
// data-process-encode/decode, ...
// data-emailpart=to/cc/subject/body
// data-emaillabel=true
// data-calceqs;data-calceq
// data-menulevel
// data-lockable
// get value with element.dataset.process... (camelcase), element.dataset.order, element.dataset.emailFrom/To/Cc/Bcc/Subject/Body, element.dataset.menuVisible
// can use class instead, but wrong usage and may not be any faster
function xf_form_lock_toggle(form_element){
var idxi,fchild,lockable=false,fchildid
var form_children=document.getElementById(form_element).querySelectorAll(xf_input_main_elements_string)
for(idxi=0;idxi<form_children.length;idxi++){
	fchild=form_children[idxi]
	try{lockable=fchild.dataset.lockable}
	catch{lockable=false}
	if(fchild.readonly){
		if(lockable){fchild.readonly=false}
	}
	else{
		if(lockable){fchild.readonly=true}
	}
}
}
//
// XF_SEND_EMAIL - gets form elements and places them in an email for the user to submit. Suggest using smpt.js if they don't want the user to see their email address or if they don't want the user to have to submit twice.
// radio buttons and checkboxes can be grouped using name attribute. However, if you want group labeling to apply, use fieldset and legend to group (still need to use name for radio buttons and it can help for checkboxes.
function xf_send_email(form_element){
var idxi,idxj,fchild,fchildtag,fchildtype,fchildlabel='',email='',email_part,email_to='',email_cc='',email_subject='',email_body='',email_label,inputisemaillabel='false',ccchildren=[],newline='%0D%0A',toprocess
var form_children=document.getElementById(form_element).querySelectorAll(xf_input_main_elements_string)
for(idxi=0;idxi<form_children.length;idxi++){
//	alert('idxi'+idxi)
	fchild=form_children[idxi]
//	alert(fchild.id)
	fchildtag=fchild.tagName.toLowerCase()
//	alert(fchildtag)
	if(xf_label_partners.includes(fchildtag)){
		if(fchildtag=='input' && fchild.type.toLowerCase()=='hidden'){}
		else{
			if(fchild.labels.length==0){fchildlabel=' '}
			else{fchildlabel=fchild.labels[0].innerHTML}//possibly could be innerText, but want to retreive HTML to change <br> to space, then eliminate the rest.
		}
	}
	fchildvalue=fchild.value
//	alert(fchildvalue)
	try{email_part=fchild.dataset.emailpart.toLowerCase()}
	catch{email_part="none"}
	if(email_part=='to'){
		if(fchildvalue==''){
			try{toprocess=fchild.dataset.process}
			catch{alert('data-process missing for data-emailpart="to"')}
			email_to=xf_process(toprocess)}// need to unencrypt to keep safe
		else{email_to=fchildvalue}
	}
	if(email_part=='cc'){
		if(fchild.checked){
			ccchildren=fchild.parentElement.children
			for(idxj=0;idxj<ccchildren.length;idxj++){
				if(ccchildren[idxj].type=='email'){email_cc=ccchildren[idxj].value}
			}
		}
	}
	if(email_part=='subject'){email_subject=decodeURIComponent(fchildvalue)}//have to decode spaces; might need data-decode=none,decode,url, then an x_function to decode/encode properly. Might also need a data-encode
	if(email_part=='body'){
		if(fchildtag=='input'){
			fchildtype=fchild.type.toLowerCase()
			if(fchildvalue==''){}
			else{
				if(fchildtype=='radio' || fchildtype=='checkbox'){
					if(fchild.checked){
						email_label=xf_email_label_before+document.getElementById(fchild.name).innerHTML.replaceAll('<br>',newline)+xf_email_label_after;if(email_label.replace(' ','')==xf_email_label_before+xf_email_label_after){email_label=''}
						email_body+=email_label+decodeURIComponent(fchildvalue)+newline
					}
				}
				else{
					try{inputisemaillabel=fchild.dataset.emaillabel.toLowerCase()}
					catch{inputisemaillabel="false"}
					if(inputisemaillabel=="true" || inputisemaillabel=="yes" || inputisemaillabel=="y"){
						email_body+=xf_email_label_before+decodeURIComponent(fchildvalue)+xf_email_label_after+newline
					}
					else{
						email_label=xf_email_label_before+fchildlabel+xf_email_label_after;if(email_label.replace(' ','')==xf_email_label_before+xf_email_label_after){email_label=''}
						email_body+=email_label+decodeURIComponent(fchildvalue)+newline
					}
				}
			}
		}
		if(fchildtag=='textarea'){if(fchildvalue==''){}
		else{
			email_label=xf_email_label_before+fchildlabel+xf_email_label_after;if(email_label.replace(' ','')==xf_email_label_before+xf_email_label_after){email_label=''}
			//just leaving linefeeds doesn't work and changing them to newline doesn't work. Have to change them to something here, then change that to newline later for some reason
			email_body+=email_label+decodeURIComponent(fchildvalue.replace(/\n\r?/g,'<br>'))+newline}
		}
		if(fchildtag=='select' || fchildtag=='datalist'){//1 or more options can be selected if multiple. First is selected by default if none selected.
			email_label=xf_email_label_before+fchildlabel+xf_email_label_after;if(email_label.replace(' ','')==xf_email_label_before+xf_email_label_after){email_label=''}
			email_body+=email_label
			for(idxj=0;idxj<fchild.options.length;idxj++){//option tag can have disabled (not able to be selected). It can have selected attribute, or neither.
				if(fchild.options[idxj].selected){
					if(fchild.options[idxj].value==fchild.options[idxj].text){//if value not specified, value=text; Can have data-value to include value, but why would you have it and not return it unless you're using it in other context; and what can be the harm in returning it?
						email_body+=fchild.options[idxj].text+newline
					}
					else{
						email_body+=fchild.options[idxj].value+' '+fchild.options[idxj].text+newline
					}
				}
			}
		}
	}
}
//alert('outofloop'+email_to+email_cc+email_subject+email_body)
email='mailto:'+email_to
email_body=email_body.replaceAll('<br>',newline)
if(email_body=='&body='){email_body=''}
if(email_cc==''){email+='?subject='+email_subject+'&body='+email_body}
else{email+='?cc='+email_cc+'&subject='+email_subject+'&body='+email_body}
//alert(email)
location.href=email
//window.open(email)
//location.assign(email)
//loation.replace(email)
//https://geekstutorials.com/compare-window-location-href-vs-replace-vs-assign-vs-open/ - could use window.open, location.href, or location.assign() to have backbutton to navigate back, or location.replace() - no back button. This is email - window.open and location.href both open email in new window. window.open outside of user response function, tries to open popup-window
}
//XF_CALC
//Not finding input fields of fieldset, even though email routine did
function xf_calc(form_element){
//calc each set of equations from n to 1, storing result in xf_calc_resultn
var idxi,idxj,idxk,idxl,fchild,fchildtag,fchildtype,fchildlabel='',fchildcalceq,calc_eqs='',calc_eq=[],n,y
var fform=document.getElementById(form_element),form_children=fform.querySelectorAll(xf_input_main_elements_string),fchild,fchildtag
var valid_operators=['**','*','/','+','-']
try{calc_eqs=Number(fform.dataset.calceqs)}
catch{alert('data-calceqs missing on form element')}
idxl=0
n=calc_eqs
while(n>0){
	calc_eq=[];idxj=0
	for(idxi=0;idxi<form_children.length;idxi++){
		fchild=form_children[idxi]
		fchildtag=fchild.tagName.toLowerCase()
		fchildvalue=fchild.value
		try{fchildcalceq=Number(fchild.dataset.calceq)}
		catch{fchildcalceq=1}
		if(fchildcalceq==n){
			if(valid_operators.includes(fchildvalue)){calc_eq[idxj]=fchildvalue}
			else{calc_eq[idxj]=Number(fchildvalue)}
			idxj++
		}
	}
	y=xf_math_eval(calc_eq)
	document.getElementById('xf_calc_result'+n).value=y
	n--
}
}
function xf_math_eval(eq_array){
var valid_operators=['**','*','/','+','-']
var i,j,k,x=0,y,eq_array_new=[],eq_array_newest=[],n=eq_array.length,a,b
j=0
for(i=0;i<eq_array.length;i++){eq_array_new[i]=eq_array[i];if(eq_array_new[i]=='^'){eq_array_new[i]='**'}}
while(n>1){//order of precedence is **, then *,/ from left to right, then +,- from left to right
	i=eq_array_new.indexOf('**')
	if(i>0){
		y=eq_array_new[i-1]**eq_array_new[i+1]
		eq_array_newest=[]
		for(j=0;j<i-1;j++){eq_array_newest[j]=eq_array_new[j]};j=eq_array_newest.length
		eq_array_newest[j]=y;j++
		for(k=i+1+1;k<eq_array_new.length;k++){eq_array_newest[j]=eq_array_new[k];j++}
		eq_array_new=[]
		for(j=0;j<eq_array_newest.length;j++){eq_array_new[j]=eq_array_newest[j]}
		n=eq_array_new.length
		continue
	}
	a=eq_array_new.indexOf('*');b=eq_array_new.indexOf('/');if(a<0){i=b}else{if(b<0){i=a}else{i=Math.min(a,b)}}
	if(i>0){
		if(eq_array_new[i]=='*'){y=eq_array_new[i-1]*eq_array_new[i+1]}
		if(eq_array_new[i]=='/'){y=eq_array_new[i-1]/eq_array_new[i+1]}
		eq_array_newest=[]
		for(j=0;j<i-1;j++){eq_array_newest[j]=eq_array_new[j]};j=eq_array_newest.length
		eq_array_newest[j]=y;j++
		for(k=i+1+1;k<eq_array_new.length;k++){eq_array_newest[j]=eq_array_new[k];j++}
		eq_array_new=[]
		for(j=0;j<eq_array_newest.length;j++){eq_array_new[j]=eq_array_newest[j]}
		n=eq_array_new.length
		continue
	}
	a=eq_array_new.indexOf('+');b=eq_array_new.indexOf('-');if(a<0){i=b}else{if(b<0){i=a}else{i=Math.min(a,b)}}
	if(i>0){
		if(eq_array_new[i]=='+'){y=eq_array_new[i-1]+eq_array_new[i+1]}
		if(eq_array_new[i]=='-'){y=eq_array_new[i-1]-eq_array_new[i+1]}
		eq_array_newest=[]
		for(j=0;j<i-1;j++){eq_array_newest[j]=eq_array_new[j]};j=eq_array_newest.length
		eq_array_newest[j]=y;j++
		for(k=i+1+1;k<eq_array_new.length;k++){eq_array_newest[j]=eq_array_new[k];j++}
		eq_array_new=[]
		for(j=0;j<eq_array_newest.length;j++){eq_array_new[j]=eq_array_newest[j]}
		n=eq_array_new.length
		continue
	}
}
return y
}
function xf_process(process_string){
var i,x,process_parts=process_string.split(';'),process_parms=[]
if(process_parts[1]=='xf_email_code_simple'){
	return x_code_simple('simple',process_parts[2],process_parts[3],process_parts[4].split(','),process_parts[5].split(','))
}
//if(process_parts[1]=='xf_validate_pattern'){//just use pattern attribute
//	if(process_parts[2].match(process_parts[3])){
//		if(process_part[0]=='return'){return process_parts[4]}
//		else{alert(process_parts[4])}
//	}
//}
if(process_parts[1]=='xf_email_code_simple'){}//skip anything already processed
else{
	for(i=2;i<process_parts.length;i++){process_parms[i-2]=process_parts[i]}
	if(process_parts[0]=='return'){return window[process_parts[1]](process_parms)}
	else{window[process_parts[1]](process_parms)}
}
//https://www.sitepoint.com/call-javascript-function-string-without-using-eval/ window[function].apply(null,parms_array); looks like apply could be replaced by call. call specifies parms separately; apply specifies parms as array
//https://www.w3docs.com/snippets/javascript/how-to-execute-a-javascript-function-when-you-have-its-name-as-a-string.html window[function](parms_array)
}
function xf_menu_toggle(form_element,toggle_array){
var fform=document.getElementById(form_element)
var form_children=fform.getElementsByTagName('button')
var fchild,fchild_level,togglej
var i,j
for(i=0;i<form_children.length;i++){
	fchild=form_children[i]
	try{fchild_level=Number(fchild.dataset.menulevel)}
	catch{fchild_level=0}
	if(toggle_array.includes(fchild_level)){
		if(fchild.style.visibility=='visible'){fchild.style.visibility='hidden'}
		else{fchild.style.visibility='visible'}
	}
}
}
function xf_menu_open(form_element,open_array){
var fform=document.getElementById(form_element)
var form_children=fform.getElementsByTagName('button')
var fchild,fchild_level
var i,j
for(i=0;i<form_children.length;i++){
	fchild=form_children[i]
	try{fchild_level=Number(fchild.dataset.menulevel)}
	catch{fchild_level=0}
	if(open_array.includes(fchild_level)){fchild.style.visibility='visible'}
}
}
function xf_menu_close(form_element,close_array){
var fform=document.getElementById(form_element)
var form_children=fform.getElementsByTagName('button')
var fchild,fchild_level
var i,j
for(i=0;i<form_children.length;i++){
	fchild=form_children[i]
	try{fchild_level=Number(fchild.dataset.menulevel)}
	catch{fchild_level=0}
	if(close_array.includes(fchild_level)){fchild.style.visibility='hidden'}
}
}
function xf_fields_equal(form_element){
var x,y
x=document.getElementById(form_element).value
try{y=document.getElementById(x.dataset.equals).value}
catch{alert('data-equals missing from '+document.getElementById(form_element).id)}
if(x==y){return true}
return false
}
//XF_ADD_CLASS_BY_ATTRIBUTE
//This adds the class to the label and to the element itself.
//For radio buttons and checkboxes, it adds the class to the group label and the element
function xf_add_class_by_attribute(form_element){
var idxi,idxj,fchild,fchildtag,fchildtype,fchildlabeli,fchildgrouplabel
var form_children=document.getElementById(form_element).querySelectorAll(xf_input_main_elements_string)
for(idxi=0;idxi<form_children.length;idxi++){
//	alert('idxi'+idxi)
	fchild=form_children[idxi]
//	alert(fchild.id)
	fchildtag=fchild.tagName.toLowerCase()
//	alert(fchildtag)
	if(xf_label_partners.includes(fchildtag)){
		if(fchildtag=='input'){fchildtype=fchild.type.toLowerCase()}else{fchildtype=''}
		if(fchildtag=='input' && fchild.type.toLowerCase()=='hidden'){}
		else{
			if(fchildtype=='radio' || fchildtype=='checkbox'){
				fchildgrouplabel=document.getElementById(fchild.name)
				if(fchild.required){fchildgrouplabel.classList.add('xf_label_required')}
				else{fchildgrouplabel.classList.add('xf_label_optional')}
				if(fchild.disabled){fchildgrouplabel.classList.add('xf_label_disabled')}
				if(fchild.readonly){fchildgrouplabel.classList.add('xf_label_readonly')}
				if(fchild.multiple){fchildgrouplabel.classList.add('xf_label_multiple')}
			}
			else{
				if(fchild.labels.length==0){}
				else{
					for(fchildlabeli=0;fchildlabeli<fchild.labels.length;fchildlabeli++){
						if(fchild.required){fchild.labels[fchildlabeli].classList.add('xf_label_required')}
						else{fchild.labels[fchildlabeli].classList.add('xf_label_optional')}
						if(fchild.disabled){fchild.labels[fchildlabeli].classList.add('xf_label_disabled')}
						if(fchild.readonly){fchild.labels[fchildlabeli].classList.add('xf_label_readonly')}
						if(fchild.multiple){fchild.labels[fchildlabeli].classList.add('xf_label_multiple')}
					}
				}
			}
			if(fchild.required){fchild.classList.add('xf_field_required')}
			else{fchild.classList.add('xf_field_optional')}
			if(fchild.disabled){fchild.classList.add('xf_field_disabled')}
			if(fchild.readonly){fchild.classList.add('xf_field_readonly')}
			if(fchild.multiple){fchild.classList.add('xf_field_multiple')}
		}
	}
}
}
//XF_DISABLED_TOGGLE
function xf_disabled_toggle(checkbox_element,checked_action_array,affected_array,required_array){
//alert(checkbox_element)
//alert(checked_action_array)
//alert(affected_array)
//alert(required_array)
//alert(document.getElementById(checkbox_element).checked)
var i,j,k,myel,mycheckbox=document.getElementById(checkbox_element)
if((checked_action_array[0]=='checked' && mycheckbox.checked) ||
(checked_action_array[0]=='unchecked' && mycheckbox.checked==false)){
	if(checked_action_array[1]=='enable'){
		for(j=0;j<affected_array.length;j++){
			myel=document.getElementById(affected_array[j])
//			alert(myel.id)
			myel.disabled=false
			myel.classList.remove('xf_field_disabled')
			xf_toggle_label_class('remove',myel.id,'xf_label_disabled')
			if(required_array[j]=='required'){//alert('required')
				myel.classList.remove('xf_field_optional')
				myel.classList.add('xf_field_required')
				xf_toggle_label_class('remove',myel.id,'xf_label_optional')
				xf_toggle_label_class('add',myel.id,'xf_label_required')
			}
			else{
				myel.classList.add('xf_field_optional')
				myel.classList.remove('xf_field_required')
				xf_toggle_label_class('add',myel.id,'xf_label_optional')
				xf_toggle_label_class('remove',myel.id,'xf_label_required')
			}
		}
	}
	else{
		for(j=0;j<affected_array.length;j++){
			myel=document.getElementById(affected_array[j])
			myel.disabled=true
			myel.classList.add('xf_field_disabled')
			xf_toggle_label_class('add',myel.id,'xf_label_disabled')
			myel.classList.add('xf_field_optional')
			myel.classList.remove('xf_field_required')
			xf_toggle_label_class('add',myel.id,'xf_label_optional')
			xf_toggle_label_class('remove',myel.id,'xf_label_required')
		}
	}
}
else{//undo action or do action opposite
	if(checked_action_array[1]=='disable'){
		for(j=0;j<affected_array.length;j++){
			myel=document.getElementById(affected_array[j])
			myel.disabled=false
			myel.classList.remove('xf_field_disabled')
			xf_toggle_label_class('remove',myel.id,'xf_label_disabled')
			if(required_array[j]=='required'){
				myel.classList.remove('xf_field_optional')
				myel.classList.add('xf_field_required')
				xf_toggle_label_class('remove',myel.id,'xf_label_optional')
				xf_toggle_label_class('add',myel.id,'xf_label_required')
			}
			else{
				myel.classList.add('xf_field_optional')
				myel.classList.remove('xf_field_required')
				xf_toggle_label_class('add',myel.id,'xf_label_optional')
				xf_toggle_label_class('remove',myel.id,'xf_label_required')
			}
		}
	}
	else{
		for(j=0;j<affected_array.length;j++){
			myel=document.getElementById(affected_array[j])
			myel.disabled=true
			myel.classList.add('xf_field_disabled')
			xf_toggle_label_class('add',myel.id,'xf_label_disabled')
			myel.classList.add('xf_field_optional')
			myel.classList.remove('xf_field_required')
			xf_toggle_label_class('add',myel.id,'xf_label_optional')
			xf_toggle_label_class('remove',myel.id,'xf_label_required')
		}
	}
}
}
function xf_toggle_label_class(add_remove,xf_el,el_class){
	//What about group labels?
//alert(add_remove)
//alert(xf_el)
//alert(el_class)
var i,myel=document.getElementById(xf_el),grouplabel
//alert(myel.tagName.toLowerCase())
//alert(myel.type)
if(xf_label_partners.includes(myel.tagName.toLowerCase())){
	if(myel.tag=='input' && myel.type.toLowerCase()=='hidden'){}
	else{
		if(myel.tag=='input' && (fchildtype=='radio' || fchildtype=='checkbox')){
			grouplabel=document.getElementById(myel.name)
			if(add_remove=='add'){
				grouplabel.classList.add(el_class)
				if(el_class=='xf_label_disabled'){grouplabel.disabled=true}
			}
			else{
				grouplabel.classList.remove(el_class)
				if(el_class=='xf_label_disabled'){grouplabel.disabled=false}
				}
		}
		else{
			//alert(myel.labels.length)
			for(i=0;i<myel.labels.length;i++){
	//			alert(myel.labels[i].innerText)
				if(add_remove=='add'){
	//				alert('add')
					myel.labels[i].classList.add(el_class)
					if(el_class=='xf_label_disabled'){myel.labels[i].disabled=true}
				}
				else{
	//				alert('remove')
					myel.labels[i].classList.remove(el_class)
					if(el_class=='xf_label_disabled'){myel.labels[i].disabled=false}
					}
			}
		}
	}
}
}
//XF_OPTION_INIT - init options of select,optgroup,datalist
function xf_options_init(parent_el,options_array){
xf_options_clear(parent_el)
var i,this_parent_el=document.getElementById(parent_el)
for(i=0;i<options_array.length;i++){
	this_parent_el[i]=new Option(options_array[i][0],options_array[i][1],options_array[i][2],options_array[i][3])
	this_parent_el[i].disabled=options_array[i][4];this_parent_el[i].hidden=options_array[i][5]
}
}
function xf_options_clear(parent_el){
var i,this_parent_el=document.getElementById(parent_el)
this_parent_el.options.length=0
}
function xf_options_filter(parent_el,options_array,filter_el){
var i,j,options_array_filtered=[],value_filtered=document.getElementById(filter_el).value,value_matched
var regex_filtered=new RegExp(value_filtered,'gi')
j=0
for(i=0;i<options_array.length;i++){
	//defaultSelected, disabled
	if(value_filtered='' || (options_array[i][2] && options_array[i][4])){
		options_array_filtered[j]=options_array[i];j++
	}
	else{
		value_matched=options_array[i][0].match(regex_filtered)
		if(value_matched===null){value_matched=''}
		if(value_matched.length>0){
			options_array_filtered[j]=options_array[i];j++
		}
	}
}
xf_options_init(parent_el,options_array_filtered)
}
function xf_options_open(parent_el,options_array,options_size){
xf_options_init(parent_el,options_array)
document.getElementById(parent_el).size=options_size
}
function xf_validate_distinct(form_element,group_label,distinct_fields,skip_values){
var fform=document.getElementById(form_element),i_value,j_value,i,j
for(i=0;i<distinct_fields.length;i++){
	i_value=document.getElementById(distinct_fields[i]).value
//	alert('i_'+distinct_fields[i]+':'+i_value)
	if(skip_values.indexOf(i_value)>=0){}
	else{
		for(j=0;j<distinct_fields.length;j++){
			if(i==j){}
			else{
				j_value=document.getElementById(distinct_fields[j]).value
//				alert('j_'+distinct_fields[j]+':'+i_value)
				if(skip_values.indexOf(j_value)>=0){}
				else{
					if(i_value==j_value){
//						alert('All values in '+group_label+' are not distinct')
						return false
					}
				}
			}
		}
	}
}
return true
}
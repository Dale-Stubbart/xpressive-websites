async function xd_get_data_source(type) {
  // Open file picker and destructure the result the first handle
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  if(type=='json'){const fetched_json = await file.json();return fetched_json}
  if(type=='array'){const fetched_array = await file.arrayBuffer();return fetched_array}
  if(type=='blob'){const fetched_blob = await file.blob();return fetched_blob}
  if(['json','array','blob'].indexOf(type)>=0){const fetched_text=await file.text();return fetched_text}
  return content; // should also return file
}
async function xd_save_data_source(data) {
  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write out file
  await writableStream.write(data);

  // close the file and write the contents to disk.
  await writableStream.close();
}
async function xf_fetch_url(url,type) {
  const response = await fetch(url);
  if(type=='json'){const fetched_json = await response.json();return fetched_json}
  if(type=='array'){const fetched_array = await response.arrayBuffer();return fetched_array}
  if(type=='blob'){const fetched_blob = await response.blob();return fetched_blob}
  if(['json','array','blob'].indexOf(type)>=0){const fetched_text=await response.text();return fetched_text}
}
/*
Use the FileReader API, but there is no filewriter. Also, only blob or text, not json
<input type="file" id="file-input" onchange="handleFileSelect()">

function handleFileSelect() {
  const input = document.getElementById('file-input');
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    const contents = reader.result;
    // Process the contents of the file
  };
  reader.readAsText(file);
}
*/
/*
// this uploads and displays an image file. Should be able to display text file using <p> rather than <img>.
// for json, other, should be able to move to hidden <div> then parse the innerhtml content of that <div>
<p><input type="file"  accept="image/*" name="image" id="file"  onchange="loadFile(event)" style="display: none;"></p>
<p><label for="file" style="cursor: pointer;">Upload Image</label></p>
<p><img id="output" width="200" /></p>

<script>
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};
</script>
*/
// TO DO:  Change "Edit" button to show "Save" when in .editMode

//=========
//VARIABLES
//=========

//the customer name
var add_customer = document.getElementById("add_customer");
//the button that adds jobs to the temporary list
var add_button = document.getElementById("add_button");
//the <ol> of temporary jobs to add to Google Calendar
var temp_job_list = document.getElementById("temp_job_list");


//==========
//PROTOTYPES
//==========

//=========================================================================
var create_temp_job = function() {
//=========================================================================
  //VARIABLES
  var list_item = document.createElement("li");						//<li>
  var cust_label = document.createElement("label");				//<label>
  var edit_cust_label = document.createElement("input");	//<input>
  var edit_button = document.createElement("button");			//<button>
  var delete_button = document.createElement("button");		//<button>

  //Each element needs to be modifiable
  edit_cust_label.type = "text";
  if (typeof edit_button.innerText === "undefined") {
    edit_button.textContent = "Edit";
  } else {
    edit_button.innerText = "Edit";
  }
  edit_button.className = "edit";
  delete_button.innerText = "Delete";
  delete_button.className = "delete";
  cust_label.innerText = add_customer.value;
  
  //Each element needs to be appended
  list_item.appendChild(cust_label);
  list_item.appendChild(edit_cust_label);
  list_item.appendChild(edit_button);
  list_item.appendChild(delete_button);
  
  return list_item;
}

//=========================================================================
var add_temp_job = function() {
//=========================================================================
	console.log("CALLED add_temp_job");
	//VARIABLES
	var list_item = create_temp_job();	//temp <li> from "Add new jobs"
	
	//append list_item to temp_job_list
	temp_job_list.appendChild(list_item);
	bind_job_events(list_item);
}

//=========================================================================
var bind_job_events = function(list_item) {
//=========================================================================
  console.log("CALLED bind_job_events");
  //select job_list_item's children
  var edit_button = list_item.querySelector("button.edit");
  var delete_button = list_item.querySelector("button.delete");
  
  //bind edit_job to edit button
  edit_button.onclick = edit_temp_job;
  
  //bind delete_job to delete button
  delete_button.onclick = delete_temp_job;
}

//Edit an existing task
//=========================================================================
var edit_temp_job = function() {
//=========================================================================
  console.log("Edit task...");
  
  var list_item = this.parentNode;
  var edit_customer = list_item.querySelector("input[type=text]");
  var cust_label = list_item.querySelector("label.temp_customer");
  
  //if the class of the parent is .editMode
  if (list_item.classList.contains("edit_mode")) {
    //Switch from .editMode
    //label text becomes the input's value
    cust_label.innerText = edit_customer.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    edit_customer.value = cust_label.innerText;
  }
  //Toggle .editMode on the parent <li>
  list_item.classList.toggle("edit_mode");
}

//Delete an existing task
//=========================================================================
var delete_temp_job = function() {
//=========================================================================
  console.log("Delete task...");
  //Remove the parent list item from the ul
  var list_item = this.parentNode;
  var ul = list_item.parentNode;
  ul.removeChild(list_item);
}

//a test function to show how multiple events can be triggered
//=========================================================================
var ajaxRequest = function() {
//=========================================================================
  console.log("AJAX request"); 
}

//==============
//MAIN ALGORITHM
//==============

//Set the click-handler to the addTask function
add_button.addEventListener("click", add_temp_job);
add_button.addEventListener("click", ajaxRequest);

//cycle over temp_job_list <ol> list items (the li's)
for (var i = 0; i < temp_job_list.children.length; i++) {
  //bind events to list item's children (tasksIncomplete)
  bind_job_events(temp_job_list.children[i]);
}

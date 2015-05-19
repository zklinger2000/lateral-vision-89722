// TO DO:  Change "Edit" button to show "Save" when in .editMode

//=========
//VARIABLES
//=========

//the crew name element
var add_crew = document.getElementById("add_crew");
//the customer name element
var add_customer = document.getElementById("add_customer");
//the address element
var add_address = document.getElementById("add_address");
//the price element
var add_price = document.getElementById("add_price");
//the button that adds jobs to the temporary list
var add_button = document.getElementById("add_button");
//the <ol> of temporary jobs to add to Google Calendar
var temp_job_list = document.getElementById("temp_job_list");


//=========
//FUNCTIONS
//=========

//=========================================================================
var create_temp_job = function() {
//=========================================================================
  //VARIABLES
  var list_item = document.createElement("li");							//<li>
	var edit_crew = document.createElement("select");					//<select>
	var group_foreman = document.createElement("optgroup");		//<select>
	var opt_gary = document.createElement("option");					//<select>
	var opt_ken = document.createElement("option");						//<select>
	var opt_xcrew = document.createElement("option");					//<select>
	var group_all = document.createElement("optgroup");				//<select>
	var opt_all = document.createElement("option");						//<select>
  var cust_label = document.createElement("label");					//<label>
  var edit_cust_label = document.createElement("input");		//<input>
  var address_label = document.createElement("label");			//<label>
  var edit_address_label = document.createElement("input");	//<input>
	var dollar_sign = document.createElement("p");						//<p> for '$'
  var price_label = document.createElement("label");				//<label>
  var edit_price_label = document.createElement("input");		//<input>
  var edit_button = document.createElement("button");				//<button>
  var delete_button = document.createElement("button");			//<button>

	//set up crew select group
  console.log(add_crew.value);
	edit_crew.type = "select";
	edit_crew.id = "edit_crew";
	group_foreman.label = "Foreman";
	edit_crew.appendChild(group_foreman);
/*
	edit_crew.<optgroup label="Foreman">' + 
												'<option value="gary">Gary</option>' +
                  			'<option value="ken">Ken</option>' +
                 				'<option value="x_crew">The Incredible Bulk</option>' +
                				'</optgroup>' +
                				'<optgroup label="Everyone">' +
                 				'<option value="all_crews">All Crews</option>' +
                				'</optgroup>';
	*/

  //set up customer name label and input
	edit_text_input("cust", cust_label, edit_cust_label, add_customer);
	//set up address label and input
	edit_text_input("address", address_label, edit_address_label, add_address);
	//set up '$'
	dollar_sign.className = "dollar";
	dollar_sign.innerText = "$";
	//set up price label and input
	edit_text_input("price", price_label, edit_price_label, add_price);
	//set up 'Edit' button
  if (typeof edit_button.innerText === "undefined") {
    edit_button.textContent = "Edit";
  } else {
    edit_button.innerText = "Edit";
  }
  edit_button.className = "edit";
	//set up 'Delete' button
  if (typeof delete_button.innerText === "undefined") {
    delete_button.textContent = "Delete";
  } else {
    delete_button.innerText = "Delete";
  }
  delete_button.className = "delete";
  
  //Each element needs to be appended
  list_item.appendChild(edit_crew);
  list_item.appendChild(cust_label);
  list_item.appendChild(edit_cust_label);
  list_item.appendChild(address_label);
  list_item.appendChild(edit_address_label);
  list_item.appendChild(dollar_sign);
  list_item.appendChild(price_label);
  list_item.appendChild(edit_price_label);
  list_item.appendChild(edit_button);
  list_item.appendChild(delete_button);
  
  return list_item;
}

//=========================================================================
var edit_text_input = function(name, label, edit_label, element) {
//=========================================================================
  //set up label and input
  label.id = name + "_label";
  label.innerText = element.value;
	edit_label.type = "text";
	edit_label.id = "edit_" + name;
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
	//clearing the fields after adding the job to the temp job list
	add_customer.value = "";
	add_address.value = "";
	add_price.value = "";
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
  var edit_crew = list_item.querySelector("#edit_crew");
  var cust_label = list_item.querySelector("#cust_label");
  var edit_cust = list_item.querySelector("#edit_cust");
  var address_label = list_item.querySelector("#address_label");
  var edit_address = list_item.querySelector("#edit_address");
  var price_label = list_item.querySelector("#price_label");
  var edit_price = list_item.querySelector("#edit_price");
  
  //if the class of the parent is .editMode
  if (list_item.classList.contains("edit_mode")) {
    //Switch from .editMode
    //label text becomes the input's value
    cust_label.innerText = edit_cust.value;
    address_label.innerText = edit_address.value;
    price_label.innerText = edit_price.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
		//
		//edit_crew.value....
    edit_cust.value = cust_label.innerText;
    edit_address.value = address_label.innerText;
    edit_price.value = price_label.innerText;
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


//==========
//PAGE SETUP
//==========

//Set the click-handler to the addTask function
add_button.addEventListener("click", add_temp_job);
add_button.addEventListener("click", ajaxRequest);

//cycle over temp_job_list <ol> list items (the li's)
for (var i = 0; i < temp_job_list.children.length; i++) {
  //bind events to list item's children (tasksIncomplete)
  bind_job_events(temp_job_list.children[i]);
}

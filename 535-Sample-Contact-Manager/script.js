class Contact {

  constructor(cstr_firstName, cstr_lastName, cstr_phoneNumber, cstr_eMail) {
    this.p_firstName = cstr_firstName;
    this.p_lastName = cstr_lastName;
    this.p_phoneNumber = cstr_phoneNumber;
    this.p_eMail = cstr_eMail;
  }

  get firstName() {
    return this.p_firstName;
  }

  get lastName() {
    return this.p_lastName;
  }

  get phoneNumber() {
    return this.p_phoneNumber;
  }

  get eMail() {
    return this.p_eMail;
  }

}


class ContactManager {

  constructor(cstr_contactManagerDescription) {
    this.p_contactManagerDescription = cstr_contactManagerDescription;
    this.p_contactsContainer = [];
    this.p_contactManagerActivePageDisplay = 1;
    this.p_contactManagerLastPage = 1;
    this.p_contactManagerTableRowsPerPage = 15;

    this.p_contactManagerSearchModeIsEnabled = false;

    this.p_filteredContactsContainer = [];
    this.p_filteredContactsActivePageDisplay = 1;
    this.p_filteredContactsLastPage = 1;
    this.p_filteredContactsTableRowsPerPage = 15;
  }

  get contactManagerDescription() {
    return this.p_contactManagerDescription;
  }

  get contactManagerActivePageDisplay() {
    return this.p_contactManagerActivePageDisplay;
  }

  addContact(c) {
    let pages;

    this.p_contactsContainer.push(c);

    pages = ( parseInt(this.numberOfContacts() / this.p_contactManagerTableRowsPerPage) + 1 );

    this.setContactManagerLastPage(pages);
  }

  numberOfContacts() {
    return this.p_contactsContainer.length;
  }

  numberOfFilteredContacts() {
    return this.p_filteredContactsContainer.length;
  }

  setContactManagerActivePageDisplay(page_num) {
    this.p_contactManagerActivePageDisplay = page_num;
  }

  setFilteredContactManagerActivePageDisplay(page_num) {
    this.p_filteredContactsActivePageDisplay = page_num;
  }

  setContactManagerLastPage(page_num) {
    this.p_contactManagerLastPage = page_num;
  }

  setFilteredContacsLastPage() {
    let filteredPages;

    filteredPages = ( parseInt(this.numberOfFilteredContacts() / this.p_filteredContactsTableRowsPerPage) + 1 );

    this.p_filteredContactsLastPage = filteredPages;
  }

  static get initialTableHeaderStub() {
    let headerStub =      '<colgroup>'
                      +      '<col span="1" class="Index">'
                      +      '<col span="1" class="FirstName">'
                      +      '<col span="1" class="LastName">'
                      +      '<col span="1" class="PhoneNumber">'
                      +      '<col span="1" class="EMail">'
                      +    '</colgroup>'
                      +    '<thead>'
                      +      '<tr>'
                      +        '<th>Index</th>'
                      +        '<th>First Name</th>'
                      +        '<th>Last Name</th>'
                      +        '<th>Phone Number</th>'
                      +        '<th>E-mail</th>'
                      +      '</tr>'
                      +    '</thead>'
                      +    '<tbody>';

    return headerStub;
  }

  displayRecentlyCreatedContact(con) {
    let reccon =    '<table class="RecentlyCreatedContactTable">' + ContactManager.initialTableHeaderStub
                  +      '<tr>'
                  +        '<td>' + (this.numberOfContacts() - 1) + '</td>'
                  +        '<td>' + con.firstName + '</td>'
                  +        '<td>' + con.lastName + '</td>'
                  +        '<td>' + con.phoneNumber + '</td>'
                  +        '<td>' + con.eMail + '</td>'
                  +      '</tr>'
                  +    '</tbody>'
                  +    '<caption>'
                  +      'Contact Manager contains <span>' + this.numberOfContacts() + ' contact(s)</span>.<br>The contact below has been created.'
                  +    '</caption>'
                  +  '</table>'
      ;

    return reccon;
  }

  listContacts(isFiltered) {
    let contmax;
    let contmin;
    let content;

    if ( !(isFiltered) ) {
      contmin = ( (this.p_contactManagerActivePageDisplay - 1) * this.p_contactManagerTableRowsPerPage);

      if ( this.numberOfContacts() < (this.p_contactManagerTableRowsPerPage * this.p_contactManagerActivePageDisplay) ) {
        contmax = this.numberOfContacts();
      }
      else {
        contmax = (this.p_contactManagerTableRowsPerPage * this.p_contactManagerActivePageDisplay);
      }

      console.log("contmin: " + contmin);
      console.log("contmax: " + contmax);

      content =        '<table class="AllContactsTable">' + ContactManager.initialTableHeaderStub;


      for (contmin; contmin < contmax; contmin++) {

        content +=         '<tr>'
                    +        '<td>' + contmin.toString() + '</td>'
                    +        '<td>' + this.p_contactsContainer[contmin].firstName + '</td>'
                    +        '<td>' + this.p_contactsContainer[contmin].lastName + '</td>'
                    +        '<td>' + this.p_contactsContainer[contmin].phoneNumber + '</td>'
                    +        '<td>' + this.p_contactsContainer[contmin].eMail + '</td>'

                    +      '</tr>'
        ;
      }

        content +=      '</tbody>'
                    +    '<caption>'
                    +      this.contactManagerDescription + ' [<span>' + this.numberOfContacts() + ' Contact(s) Listed</span>]'
                    +    '</caption>'
                    +  '</table>'
        ;
    }
    else {
      contmin = ( (this.p_filteredContactsActivePageDisplay - 1) * this.p_filteredContactsTableRowsPerPage);

      if ( this.p_filteredContactsContainer.length < (this.p_filteredContactsTableRowsPerPage * this.p_filteredContactsActivePageDisplay) ) {
        contmax = this.p_filteredContactsContainer.length;
      }
      else {
        contmax = (this.p_filteredContactsTableRowsPerPage * this.p_filteredContactsActivePageDisplay);
      }

      console.log("contmin: " + contmin);
      console.log("contmax: " + contmax);

      content =        '<table class="AllContactsTable">' + ContactManager.initialTableHeaderStub;


      for (contmin; contmin < contmax; contmin++) {

        content +=         '<tr>'
                    +        '<td>' + this.p_filteredContactsContainer[contmin].p_Index.toString() + '</td>'
                    +        '<td>' + this.p_filteredContactsContainer[contmin].p_firstName + '</td>'
                    +        '<td>' + this.p_filteredContactsContainer[contmin].p_lastName + '</td>'
                    +        '<td>' + this.p_filteredContactsContainer[contmin].p_phoneNumber + '</td>'
                    +        '<td>' + this.p_filteredContactsContainer[contmin].p_eMail + '</td>'
                    +      '</tr>'
        ;
      }

        content +=      '</tbody>'
                    +    '<caption>'
                    +      this.contactManagerDescription + ' [<span>' + this.p_filteredContactsContainer.length.toString() + ' Filtered Contact(s) Listed</span>]'
                    +    '</caption>'
                    +  '</table>'
        ;
    }

    this.enableDisablePageNavigationButtons(isFiltered);

    return content;
  }

  enableDisablePageNavigationButtons(isFiltered) {
    if ( !(isFiltered) ) {
      if (this.numberOfContacts() > this.p_contactManagerTableRowsPerPage) {
        document.getElementById("PrevNext").style.display = "block";

        if (this.p_contactManagerActivePageDisplay === 1) {
          document.getElementById("Previous").disabled = true;
        }
        else {
          document.getElementById("Previous").disabled = false;
        }

        if (this.p_contactManagerActivePageDisplay === this.p_contactManagerLastPage) {
          document.getElementById("Next").disabled = true;
        }
        else {
          document.getElementById("Next").disabled = false;
        }
      }
      else {
        document.getElementById("PrevNext").style.display = "none";
      }
    }
    else {
      if (this.numberOfFilteredContacts() > this.p_filteredContactsTableRowsPerPage) {
        document.getElementById("PrevNext").style.display = "block";

        if (this.p_filteredContactsActivePageDisplay === 1) {
          document.getElementById("Previous").disabled = true;
        }
        else {
          document.getElementById("Previous").disabled = false;
        }

        if (this.p_filteredContactsActivePageDisplay === this.p_filteredContactsLastPage) {
          document.getElementById("Next").disabled = true;
        }
        else {
          document.getElementById("Next").disabled = false;
        }
      }
      else {
        document.getElementById("PrevNext").style.display = "none";
      }
    }

  }

  resetContactSearchResults() {
    this.p_filteredContactsContainer.length = 0;  /*this will "empty" the p_filteredContactsContainer array */
    this.p_filteredContactsActivePageDisplay = 1;
    this.p_filteredContactsLastPage = 1;
  }

}

/*--------------------------------------------------
----------------------------------------------------
--------------------------------------------------*/

document.getElementById("FirstName").addEventListener("keydown", checkInput, false);
document.getElementById("FirstName").addEventListener("keyup", checkInput, false);

document.getElementById("LastName").addEventListener("keydown", checkInput, false);
document.getElementById("LastName").addEventListener("keyup", checkInput, false);

document.getElementById("PhoneNumber").addEventListener("keydown", checkInput, false);
document.getElementById("PhoneNumber").addEventListener("keyup", checkInput, false);

document.getElementById("EMail").addEventListener("keydown", checkInput, false);
document.getElementById("EMail").addEventListener("keyup", checkInput, false);

document.getElementById("SearchContactsChkBx").addEventListener("click", enableSearchMode, false);
document.getElementById("SearchContactsChkBxLabel").addEventListener("click", enableSearchMode, false);


let contman = new ContactManager('Sample Contact Manager');


function createContact() {
  let fn = document.getElementById("FirstName").value;
  let ln = document.getElementById("LastName").value;
  let pn = document.getElementById("PhoneNumber").value;
  let em = document.getElementById("EMail").value;

  let con = new Contact(fn, ln, pn, em);

  contman.addContact(con);

  document.getElementById("FieldsetLegend").innerHTML = contman.contactManagerDescription + ' [<span>' + contman.numberOfContacts() + ' Contact(s)</span>]';
  document.getElementById("ContactDisplay").innerHTML = contman.displayRecentlyCreatedContact(con);

  if (contman.numberOfContacts() > 0) {
    document.getElementById("ListContacts").disabled = false;
  }

  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("PhoneNumber").value = "";
  document.getElementById("EMail").value = "";

  document.getElementById("CreateContact").disabled = true;
}

function listContactManagerContacts(isFiltered) {
  document.getElementById("ContactDisplay").innerHTML = contman.listContacts(isFiltered);
}

function checkInput() {
  let mfrm = document.getElementById("MainForm");

  document.getElementById("CreateContact").disabled = !(mfrm.checkValidity());
}

function enableSearchMode() {
  let frm = document.getElementById("MainForm");
  let chkbx = document.getElementById("SearchContactsChkBx");

  if (chkbx.checked) {
    /*frm.setAttribute("novalidate", "novalidate");*/
    document.getElementById("SearchContacts").style.display = "inline";

    document.getElementById("CreateContact").style.display = "none";
    document.getElementById("ListContacts").style.display = "none";
    document.getElementById("AddManyContacts").style.display = "none";
  }
  else {
    /*frm.removeAttribute("novalidate");*/
    document.getElementById("SearchContacts").style.display = "none";

    document.getElementById("CreateContact").style.display = "inline";
    document.getElementById("ListContacts").style.display = "inline";
    document.getElementById("AddManyContacts").style.display = "inline";
  }

  contman.p_contactManagerSearchModeIsEnabled = chkbx.checked;

  console.log("contman.p_contactManagerSearchModeIsEnabled: " + contman.p_contactManagerSearchModeIsEnabled);
}

function searchContacts() {
  let fn = document.getElementById("FirstName").value;
  let ln = document.getElementById("LastName").value;
  let pn = document.getElementById("PhoneNumber").value;
  let em = document.getElementById("EMail").value;

  let noofcon = contman.numberOfContacts();

  let fltcritobj;

  console.log("noofcon: " + noofcon);
  console.log("fn: " + fn);
  console.log("ln: " + ln);
  console.log("pn: " + pn);
  console.log("em: " + em);

  contman.resetContactSearchResults();


  if ( (noofcon > 0) && ( (fn.length > 0) || (ln.length > 0) || (pn.length > 0) || (em.length > 0) ) ) {

    let fltcritstr = '{"p_firstName":"' + fn + '", "p_lastName":"' + ln + '", "p_phoneNumber":"' + pn + '", "p_eMail":"' + em + '"}';

    fltcritobj = JSON.parse(fltcritstr);


    Object.keys(fltcritobj).forEach   (  key =>   {  if ( (fltcritobj[key] === null) || (fltcritobj[key].length === 0) ) {
                                                      delete fltcritobj[key];
                                                  }
                                                }
                                      );

    console.log("fltcritstr: " + fltcritstr);
    console.log("fltcritobj: " + JSON.stringify(fltcritobj));

    /*fltrd_con = contman.p_contactsContainer.filter( (p_con, index) => filterRecursively(p_con, index, fltcritobj));*/
    contman.p_filteredContactsContainer = contman.p_contactsContainer.filter( (p_con, index) => filterRecursively(p_con, index, fltcritobj));
    contman.setFilteredContacsLastPage();

    /*console.log("fltrd_con: " + JSON.stringify(fltrd_con));*/
    console.log("contman.p_filteredContactsContainer: " + JSON.stringify(contman.p_filteredContactsContainer));

    /*document.getElementById("ContactDisplay").innerHTML = contman.listFilteredContacts(fltrd_con);*/
    document.getElementById("ContactDisplay").innerHTML = contman.listContacts(contman.p_contactManagerSearchModeIsEnabled);
  }
}


function filterRecursively(arrayPassed, index, p_fltcritobj) {
  let aryIncludesResult;
  let aryResultFinal;

  for (var key in p_fltcritobj) {

    aryIncludesResult = arrayPassed[key].toLowerCase().includes(p_fltcritobj[key].toLowerCase());

    if (typeof(aryResultFinal) === 'undefined') {    //check if aryResultFinal has been used already or not
      aryResultFinal = aryIncludesResult;
    }

    if (aryResultFinal !== aryIncludesResult) {
      aryResultFinal = false;
    }

  }

  if (aryResultFinal) {
    arrayPassed.p_Index = index;
    //https://stackabuse.com/guide-to-javascripts-filter-method/
  }

  return aryResultFinal;
}
/*https://gist.github.com/schuchard/a60daa25a1840d9371eae023c5be417a*/
/*https://www.scraggo.com/recursive-filter-function/*/
/*https://stackoverflow.com/questions/37896484/multiple-conditions-for-javascript-includes-method*/
/*https://www.encodedna.com/javascript/how-to-search-array-in-javascript-like-sql-like-statement.htm*/


function addManyContacts() {
  var queryURL = "./Assets/JSON/MOCK_DATA.json";

  var xhr = new XMLHttpRequest();
  xhr.open('GET', queryURL, true);

  // called when the response is arrived
  xhr.onload = function(e) {
    var jsonResponse = xhr.response;

    // turn the response into a JavaScript object
    var manyContacts = JSON.parse(jsonResponse);
    addManyContactsToContactManager(manyContacts);
  }

  // in case of error
  xhr.onerror = function(err) {
    console.log("Error: " + err);
  }

  // sends the request
  xhr.send();
}

function addManyContactsToContactManager(contacts) {
    // iterate on the array of contacts
  contacts.forEach(function(thisContact) {

    // adds a dash to the phone number (currently, the dash doesn't exist in the JSON)
    let adjustedPhone = thisContact.phone.substring(0, 9) + "-" + thisContact.phone.substring(thisContact.phone.length - 4);

    // creates a Contact class using the current contact in the for-each loop
    let newCon = new Contact(thisContact.first_name, thisContact.last_name, adjustedPhone, thisContact.email);

    // add the contact in the Contact Manager (contman)
    contman.addContact(newCon);
   });

  document.getElementById("ListContacts").disabled = false;
  document.getElementById("AddManyContacts").disabled = true;
  document.getElementById("FieldsetLegend").innerHTML = contman.contactManagerDescription + ' [<span>' + contman.numberOfContacts() + ' Contact(s)</span>]';

  listContactManagerContacts(contman.p_contactManagerSearchModeIsEnabled);
}

function adjustContactManagerActivePageDisplay(btn_pressed) {
  let page_dis_no;
  let isFiltered = contman.p_contactManagerSearchModeIsEnabled;  /* true or false depending on whether filtered contacts are displayed or not */

  if ( !(isFiltered) ) {  /* p_contactManagerSearchModeIsEnabled = false --> not filtered */
    page_dis_no = contman.contactManagerActivePageDisplay;
  }
  else {  /* p_contactManagerSearchModeIsEnabled = true --> filtered */
    page_dis_no = contman.p_filteredContactsActivePageDisplay;
  }

  if (btn_pressed === "Next") {
    page_dis_no++;
  }

  if ( (btn_pressed === "Previous") && (page_dis_no > 1) ) {
    page_dis_no--;
  }

  if ( !(isFiltered) ) {  /* p_contactManagerSearchModeIsEnabled = false --> not filtered */
    contman.setContactManagerActivePageDisplay(page_dis_no);
  }
  else {  /* p_contactManagerSearchModeIsEnabled = true --> filtered */
    contman.setFilteredContactManagerActivePageDisplay(page_dis_no);
  }

  contman.enableDisablePageNavigationButtons(isFiltered);

  listContactManagerContacts(isFiltered);

  console.log("Button Pressed: " + btn_pressed);
  console.log("Active Page Display: " + page_dis_no);
}
let tasks = [
  {
    "id": 0,
    "title": "Neuen Mitarbeiter einarbeiten",
    "catergory": "Test Catergory",
    "description": "Bitte alle Basics vermitteln",
    "created": "27.07.2022",
    "duedate": "05.09.2022",
    "urgency": "high",
    "status": "done"
  },
  { 
    "id": 0,
    "title": "Büromaterial bestellen",
    "catergory": "Test Catergory",
    "description": "Kopierpapier, Druckerpatrone, Kugelschreiber usw.",
    "created": "27.07.2022",
    "duedate": "01.09.2022",
    "urgency": "low",
    "status": "todo"
  },
  {
    "id": 0,
    "title": "Software fertigstellen",
    "catergory": "Test Catergory",
    "description": "Komplett programmieren und auf Funktion testen",
    "created": "27.07.2022",
    "duedate": "10.09.2022",
    "urgency": "intermediate",
    "status": "todo"
  },
  {
    "id": 0,
    "title": "Kaffee kochen",
    "catergory": "Test Catergory",
    "description": "Bitte schnell, wir haben durst :-)",
    "created": "01.08.2022",
    "duedate": "01.08.2022",
    "urgency": "high",
    "status": "inprogress"
  }
];

let accounts = [
  {
    "id": 1,
    "firstName": "Stefan",
    "lastName": "Richter",
    "email": "stefan.richter@gmail.de",
    "password": "12345",
    "img": "src/img/profile-1.jfif"
  },
  {
    "id": 2,
    "firstName": "Erika",
    "lastName": "Schneider",
    "email": "erika.schneider@gmail.com",
    "password": "12345",
    "img": "src/img/profile-1.jfif"
  },
  {
    "id": 3,
    "firstName": "Jens",
    "lastName": "Schmidt",
    "email": "jens.schmidt@gmail.com",
    "password": "12345",
    "img": "src/img/profile-1.jfif"
  },
  {
    "id": 4,
    "firstName": "Laura",
    "lastName": "Scholz",
    "email": "laura.scholz@gmail.com",
    "password": "12345",
    "img": "src/img/profile-1.jfif"
  },
  {
    "id": 5,
    "firstName": "Max",
    "lastName": "Hofmann",
    "email": "max.hofmann@gmail.com",
    "password": "12345",
    "img": "src/img/profile-1.jfif"
  }
];

let currentTask = [];
let isMenuOpen = false;
let isUserDataShown = false;
let currentDraggedElement;

let tasks2 =[];

/**
 * This function is used to 
 * 
 */
async function init(){
  setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');
  await downloadFromServer();
  showNavigation();
  setMenuActive();
}

async function initBoard(){
  init();
  createIds();
  showTasks();
}

async function initBacklog(){
  init();
  createBacklogTask();
}

async function initTask(){
  init();
}

function showNavigation() {
  showDesktopNavigation();
  showMobileNavigation();
}


/* START DESKTOP NAVIGATION */
function showDesktopNavigation(){
  let desktopNav = `
  <a href="index.html" class="logo-wrapper myLink" data-pathname="/index.html">
    <img class="logo" src="src/icons/join_logo.png" alt="">
  </a>
  
  <div class="menu-wrapper">
    <a href="index.html" class="menu-item myLink" data-pathname="/index.html">Board</a>
    <a href="backlog.html" class="menu-item myLink" data-pathname="/backlog.html">Backlog</a>
    <a href="task.html" class="menu-item myLink" data-pathname="/task.html">Add Task</a>
    <a href="help.html" class="menu-item myLink" data-pathname="/help.html">Help</a>
  </div>
  
  <!-- 
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a href="imprint.html" class="menu-item myLink" data-pathname="/imprint.html">Imprint</a>
    <a href="privacy.html" class="menu-item myLink" data-pathname="/privacy.html">Privacy</a>
  </div>
  
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a class="menu-item" href="login.html">Logout</a>
  </div>
  -->
  
  <img class="profile-img" src="src/img/profile1.jpg" alt="">
  `;
  document.getElementById('desktop-nav').innerHTML = desktopNav;
}
/* END DESKTOP NAVIGATION */

/* START MOBILE NAVIGATION */
function showMobileNavigation(){
  let mobileNav = `
    <div class="nav-header">
      <img src="src/img/profile1.jpg" class="profile-img" alt="">
      <a href="index.html"><img src="src/icons/logo.png" class="logo" alt=""></a>
      <div id="menu-btn" class="menu-btn" onclick="toggleMobileNavigation()">
        <div class="menu-line"></div>
      </div>
    </div>
    <!-- <div id="nav-body-wrapper" class="nav-body-wrapper"> -->
      <div id="nav-body" class="nav-body">
        <a href="index.html">Board</a>
        <a href="backlog.html">Backlog</a>
        <a href="task.html">Add Task</a>
        <a href="help.html">Help</a>
        <!--
        <a href="imprint.html">Imprint</a>
        <a href="privacy.html">Privacy</a>
        <a href="login.html">Logout</a>
        -->
      </div>
      <!-- </div> -->

  `;
  document.getElementById('mobile-nav').innerHTML = mobileNav;

 
  // This function is for testing the board
}
/* END MOBILE NAVIGATION */

function setMenuActive(){
  let links = document.getElementsByClassName("myLink");
  let URL = window.location.pathname;
  URL = URL.substring(URL.lastIndexOf('/'));
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.pathname == URL) {
      links[i].classList.add("active");
    }
  }
}

function toggleMobileNavigation() {
  const menuBtn = document.getElementById('menu-btn');
  navBody = document.getElementById("nav-body");
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        //navBody.style.height = '280px';
        navBody.style.height = '160px';
      } else {
        menuBtn.classList.remove('open');
        navBody.style.height = '0';
      }
  }
}

/*
function toggleUserTooltip(id){
  id =  id.substring(5);
  let userText = document.getElementById(`tooltip-user-${id}`);
  if(isUserDataShown){
    isUserDataShown = !isUserDataShown;
    userText.style.visibility = "hidden";
  }
  else{
    isUserDataShown = !isUserDataShown;
    userText.style.visibility = "visible";
  }
}
*/

function checkMediaQuery() {
  let mobileNav = document.getElementById('mobile-nav');
  let desktopNav = document.getElementById('desktop-nav');
  //let content = document.getElementById('content');

  if (window.innerWidth <= 768 && mobileNav && desktopNav) {
    mobileNav.classList.remove('d-none');
    desktopNav.classList.add('d-none');
    //content.style.gridArea = "content";
    //content.style.gridColumnStart = "1";
  }
  if(window.innerWidth > 768 && mobileNav && desktopNav) {
    mobileNav.classList.add('d-none');
    desktopNav.classList.remove('d-none');
    //content.style.gridArea = "nav";
    //content.style.gridColumnStart = "2";
  }
}
window.addEventListener('load', checkMediaQuery);
window.addEventListener('resize', checkMediaQuery);


//Start Board Test-Functions
function createIds() {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]['id'] = i + 1;
  }
}

/*async function addTask() {
  tasks2.push('Task1');
  await backend.setItem('tasks2', JSON.stringify(tasks2));
}*/

function createBacklogTask() {

  let backlogTask = ` <div class="task-container">
  <div class="category-color">
    <div class="task-wrapper">
      <div class="assigned-wrapper">
        <div>ASSIGNED TO</div>
        <div class="image-wrapper">
          <div class="tooltip-click">
            <img onclick="toggleUserTooltip(id)" id="user-1" src="src/img/profile1.jpg" alt="">
            <span id="tooltip-user-1" class="tooltiptext">Darrin S. Jones<br><a href="mailto:darrin.jones@gmail.de">darrin.jones@gmail.de</a></span>
          </div>
          <div class="tooltip-click">
            <img onclick="toggleUserTooltip(id)" id="user-2" src="src/img/profile2.jpg" alt="">
            <span id="tooltip-user-2" class="tooltiptext">Darrin S. Jones<br><a href="mailto:darrin.jones@gmail.de">darrin.jones@gmail.de</a></span>
          </div>
        </div>
      </div>
      <div class="title-wrapper">
        <div>TITLE</div>
        <div id="backlog-title">Title</div>
      </div>
      <div class="category-wrapper">
        <div>CATEGORY</div>
        <div id="backlog-category" >Marketing</div>
      </div>
      <div class="date-wrapper">
        <div>DUE DATE</div>
        <div id="backlog-date" >31/08/2022</div>
      </div>
      <div class="urgency-wrapper">
        <div>URGENCY</div>
        <div id="backlog-urgency" >Medium</div>
      </div>
      <div class="description-wrapper">
        <div>DESCRIPTION</div>
        <div id="backlog-description"  class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus itaque est nihil repudiandae aspernatur laborum sed eos animi inventore alias! Id porro perferendis rem quis ab nihil, necessitatibus quibusdam. Nam?</div>
      </div>
      <div class="button-wrapper">
        <div class="tooltip">
          <img src="src/icons/move.svg" alt="">
          <span class="tooltiptext">Move To Board</span>
        </div>
        <div class="tooltip">
          <img src="src/icons/edit.svg" alt="">
          <span class="tooltiptext">Edit</span>
        </div>
        <div class="tooltip">
          <img src="src/icons/delete.svg" alt="">
          <span class="tooltiptext">Delete</span>
        </div>
      </div>
    </div>
  </div>`

//document.getElementById('task-container').innerHTML = backlogTask;


}


function addToTask() {

  let title = document.getElementById('title')  
  let date = document.getElementById('date')
  let catergory = document.getElementById('catergory')
  let urgency  = document.getElementById('urgency')
  let description = document.getElementById('description')

  let allTasks= {
    "id": 0,
    "title": title.value,
    "catergory": catergory.value,
    "description": description.value,
    "created": "27.07.2022",
    "duedate": date.value,
    "urgency": urgency.value,
    "status": "todo"
  };

  currentTask.push(allTasks)
  console.log(currentTask)

  // Save tasks on the server
  backend.setItem('tasks', JSON.stringify(allTasks));

  title.value = '';
  date.value = '';
  catergory.value = '';
  urgency.value = '';
  description.value = '';

  createBacklogTask(allTasks)

}
function myInit() {
  
    setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');

    let users = [];

    users.push('Andi Bandi');
    backend.setItem('users', JSON.stringify(users));
}


function showTasks() {
  renderTasks('todo');
  renderTasks('inprogress');
  renderTasks('testing');
  renderTasks('done');
}

function renderTasks(selectedStatus) {
  let content = document.getElementById(`${selectedStatus}`);
  content.innerHTML = '';
  let getTasks = tasks.filter(function (currentTask) {
    return currentTask.status == `${selectedStatus}`;
  });
  for (let i = 0; i < getTasks.length; i++) {
    content.innerHTML += /*html*/ `
      <div class="board-task" id="task-${i}" draggable="true" ondragstart="setCurrentDraggedElement(${getTasks[i]['id']})">
        <span>${getTasks[i].title}</span>
        <span>${getTasks[i].duedate}</span>
      </div>`
  };  
}

function setCurrentDraggedElement(id) {
  currentDraggedElement = id;
}


function moveTo(status) {
  let currentDroppedElement = status;
  tasks[currentDraggedElement -1].status = currentDroppedElement;
  
  hoverHighlight(status, false);
  showTasks();
}


function allowDrop(ev) {
  ev.preventDefault();
}

function hoverHighlight(status, toSet) {
  if (toSet) {
    document.getElementById(`${status}`).classList.add('highlight');
  } else {
    document.getElementById(`${status}`).classList.remove('highlight');
  }
  
}
//End Board Test-Functions








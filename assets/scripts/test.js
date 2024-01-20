//class Item
//class List of items
//class App
//class tooltip
//get the items ids
//add event listner to the buttons

class DOMHelper {
  static clearEvnetLis(element) {
    //to make sure that we won't acuumalte eventlisners over time
    //this helper function swaps the element
    const clonedElement = element.cloneNode(true); //true to make it deep clone // The true argument indicates that the cloning should include all child nodes of the element.
    element.replaceWith(clonedElement); //to git rid of memory leak and to have the old ones garbage collected
    return clonedElement;
  }
  static moveElement(elementId, newDestSelector) {
    //to switch the Dom node element
    const element = document.getElementById(elementId);
    const destElement = document.querySelector(newDestSelector);
    destElement.append(element);
    //here the dom node will not be copied , it will  be moved because it is already a part of the Dom
  }
}

//implment tooltip with moreInfoBtn:
class ToolTip {
  constructor(closeNotiferFunction) {
    this.closeNotifer = closeNotiferFunction;
  }
  closeToolTip = () => {
    this.detach();
    this.closeNotifer();
  };
  //this is a remove function to remove tooltib text by clicking on it
  detach = () => {
    this.element.remove();
  };

  attach() {
    console.log("The ToolTip ...");
    const toolEl = document.createElement("div");
    toolEl.className = "card";
    toolEl.textContent = "DUMMY!!!";
    toolEl.addEventListener("click", this.closeToolTip);
    //to have access to the toolEl i stored it into a property
    this.element = toolEl;
    document.body.append(toolEl);
  }
}
//implement structure
class Item {
  hasActiveToolTip = false;
  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.swithcBtnHandler(type);
    this.moreInfoBtnHandler();
  }
  swithcBtnHandler(type) {
    const itemEl = document.getElementById(this.id);
    let switchBtn = itemEl.querySelector("button:last-of-type"); // in every item the last button is the switch button active and finish
    switchBtn = DOMHelper.clearEvnetLis(switchBtn); //this always clears any existing eventlisners
    switchBtn.textContent = type === "active" ? "finish" : "activate";
    console.log(switchBtn);
    //switchBtn.addEventListener("click");
    //this methods aims to remove the item from a project list and add it to the next section
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    ); // in the end it will execute we we passed when we created an instance from this class the switchProject function
  }
  //The update method is designed to update the updateProjectListHandler property and refresh the "switch" button handler.
  update(updateProjectFun, type) {
    this.updateProjectListHandler = updateProjectFun;
    this.swithcBtnHandler(type); //to run the switchbtn handler function again
    //memory leak happens because of this that we run switch btn again
  }
  infoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    this.hasActiveToolTip = true; // this to make sure that the tooltip will not show more than once
    const tooltip = new ToolTip(() => {
      this.hasActiveToolTip = false;
    });
    tooltip.attach();
  }
  moreInfoBtnHandler() {
    const itemEl = document.getElementById(this.id);
    const infoBtn = itemEl.querySelector("button:first-of-type");
    console.log(infoBtn);
    infoBtn.addEventListener("click", this.infoHandler);
  }
}
//for handleing list of items
class ListItems {
  items = [];
  //pass a callback function===switchHandler function()
  constructor(type) {
    this.type = type;
    //pass type of list-section
    const list = document.querySelectorAll(`#${this.type}-projects li`);
    console.log(list);
    for (const item of list) {
      //this part focusing on the id
      //here we are going through DOM nodes
      //this.items.push(item.id); we don't want to push the ids of items but an instance that include the id
      this.items.push(
        new Item(item.id, this.switchProject.bind(this), this.type)
      ); // we accssed the id property of the Dom node //we mean the value here =>the id string value
    } //switch project is called when an item is switched from one list to another
    console.log(this.items); //return an array with not Dom nodes objects but regulat objects //at the end focusing on id property
  }
  //to pass the project we want to switch:
  //which we can reach it by the items of projects array using find
  setSwitchHandlerFunction(switchHandlerFunction) {
    //it accepts an argument then we store the callbackfunction argument into a property
    this.switchHandler = switchHandlerFunction; // we want to call this function on our instances
  }
  addProject(project) {
    console.log(this);
    this.items.push(project); // moved the item from array in instance A to array in instance B
    //when i clicked the switchbtn in a active project list
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`); //to move the actual Dom Node
    //update method:1- update the caption  //2- update the eventlistner
    //pass our new switchHandler
    project.update(this.switchProject.bind(this), this.type); //the type is important to update the button caption
  }
  switchProject(projectId) {
    this.switchHandler(this.items.find((e) => e.id === projectId));
    // const projectIndex = this.items.findIndex(e => e.id === projectId);
    // this.items.splice(projectIndex, 1);
    // this.items = this.items.filter((e) => {
    //   e.id !== projectId;
    // to just keep the items whete it is return true
    this.items = this.items.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeList = new ListItems("active");
    const finishedList = new ListItems("finished");
    activeList.setSwitchHandlerFunction(
      finishedList.addProject.bind(finishedList)
    ); // the point to use addProject() on the other instance from this instance
    // we don't execute the function so just point to it
    //
    finishedList.setSwitchHandlerFunction(
      activeList.addProject.bind(activeList)
    );
  }
}
// it is called once when the script is parsed
App.init();

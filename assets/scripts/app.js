class DOMHelper {
  static clearEvnetLis(element) {
    //to make sure that we won't acuumalte eventlisners over time , avoid memory leak
    const clonedElement = element.cloneNode(true); //true to make it deep clone
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(elementId, newDestSelector) {
    const element = document.getElementById(elementId);
    const destElement = document.querySelector(newDestSelector);
    destElement.append(element);
    //here the dom node will not be copied , it will  be moved because it is already a part of the Dom
  }
}
/*************************************************************************************************** */
class ToolTip {
  constructor(closeNotiferFunction) {
    this.closeNotifer = closeNotiferFunction;
  }
  closeToolTip = () => {
    this.detach();
    this.closeNotifer();
  };
  detach = () => {
    this.element.remove();
  };

  attach() {
    console.log("The ToolTip ...");
    const toolEl = document.createElement("div");
    toolEl.className = "card";
    toolEl.textContent = "DUMMY!!!";
    toolEl.addEventListener("click", this.closeToolTip);
    this.element = toolEl;
    document.body.append(toolEl);
  }
}
/*************************************************************************************************** */
//implement the structure
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
    let switchBtn = itemEl.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEvnetLis(switchBtn); //this always clears any existing eventlisners
    switchBtn.textContent = type === "active" ? "finish" : "activate";
    console.log(switchBtn);
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }
  //The update method is designed to update the updateProjectListHandler property and refresh the "switch" button handler.
  update(updateProjectFun, type) {
    this.updateProjectListHandler = updateProjectFun;
    this.swithcBtnHandler(type);
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
/*************************************************************************************************** */
//for handling list of items(projects)
class ListItems {
  items = [];
  constructor(type) {
    this.type = type;
    const list = document.querySelectorAll(`#${this.type}-projects li`);
    console.log(list);
    for (const item of list) {
      this.items.push(
        new Item(item.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.items);
  }
  setSwitchHandlerFunction(switchHandlerFunction) {
    //it accepts an argument then we store the callbackfunction argument into a property
    this.switchHandler = switchHandlerFunction;
  }
  addProject(project) {
    console.log(this);
    this.items.push(project); // moved the item from array in instance A to array in instance B
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`); //to move the actual Dom Node
    //update method:1- update the button caption  //2- update the eventlistner
    //pass our new switchHandler
    project.update(this.switchProject.bind(this), this.type);
  }
  switchProject(projectId) {
    this.switchHandler(this.items.find((e) => e.id === projectId));
    // const projectIndex = this.items.findIndex(e => e.id === projectId);
    // this.items.splice(projectIndex, 1);
    this.items = this.items.filter((p) => p.id !== projectId);
  }
}
/*************************************************************************************************** */
class App {
  static init() {
    const activeList = new ListItems("active");
    const finishedList = new ListItems("finished");
    activeList.setSwitchHandlerFunction(
      finishedList.addProject.bind(finishedList)
    ); 
    finishedList.setSwitchHandlerFunction(
      activeList.addProject.bind(activeList)
    );
  }
}

App.init();

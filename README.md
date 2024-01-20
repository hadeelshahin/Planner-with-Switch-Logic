"# Planner-with-Switch-Logic" 
This planner project focuses on efficiently switching between projects in two lists: the "Active" list and the "Finished" list. The key features and concepts of this project are summarized below:

#Switching Logic:
The project utilizes a flexible switching logic between active and finished projects.
The switching is facilitated by the switchHandler callback function, allowing dynamic handling of switch operations between instances.

#Memory Leak Prevention:
To prevent memory leaks caused by accumulating event listeners, the project employs a smart approach.
Every switch button is cloned using cloneNode(true) to create independent copies, and the original buttons are replaced. This ensures that event listeners are cleanly removed, preventing memory leaks.

#Callback Functions:
Callback functions play a crucial role in handling switch operations between project lists.
The switchHandler method allows for specifying different switch handlers dynamically, promoting code modularity and reusability.

#More Info Button:
The project features a "More Info" button for each item, which is designed to be created only once for each item.
Clicking on the "More Info" button allows users to access additional information about a project.

#Switching Button Captions:
The switch buttons dynamically update their captions ("Finish" or "Activate") based on the current state of the project.
![Screenshot (17)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/4db865a6-b8df-4ad4-bbb1-575d0eca92c8)
![Screenshot (18)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/7d66d045-bc5a-4c7a-919d-fbe5991a4d37)


![Screenshot (19)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/54e7b71a-8f9e-4b5d-9662-d22c80617fc7)
![Screenshot (20)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/5feb262e-4333-469b-8e9d-f1918d6291c8)
![Screenshot (21)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/a3919fb3-a092-4126-a808-0a718fa14ecc)

![Screenshot (22)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/e27813a0-126a-48bf-ac34-ae26963250f2)

![Screenshot (23)](https://github.com/hadeelshahin/Planner-with-Switch-Logic/assets/106568841/aa828e36-cfc3-4169-a4e8-641af4080e27)




# task_manager(v1)

# Modules

    - task module includes CRUD operations for tasks(create a task, edit task, delete task, get all tasks, get specific task)
    - user module includes registration, authentication and change password functionality
    - _helper module includes general functions(database connection and user auth file)

# Starting Point

    - app.js

# Assumptions

    - The user who created the task can edit/delete the respective tasks
    - If the user is registering on portal than he/she will be logged in to perform further tasks
    - The status for task can be either Pending or Completed

# Installation

    - In command line enter following command
        $ git clone https://github.com/kinjaljha/task_manager.git
    - After cloning
        $ npm init
    - Then
        $ npm start

# Testing

    - To test the APIs install postman and hit the API with respective endpoints

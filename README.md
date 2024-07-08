## Overview of the Recruitment Exercise

This is a dummy project, which is used to demonstrate knowledge of node and Angular as well as development in general. It serves as an example with some bad practices included.

### Technologies:

- Backend: Node.js
- Frontend: Angular
- API: REST with an openapi.yaml file

**Duration: 5-8 hours**

## Exercise Structure

### Repository Structure:

`/backend` - Should contain all backend-related files.

`/frontend` - Contains all frontend-related files.

`/docs` - Contains the openapi.yaml file and any additional documentation.

#### Backend (/backend):

index.ts - Should contain main server file using Node.js.

#### Frontend (/frontend):

app.component.ts - Main application file for Angular.

##### API Definition (/docs):

openapi.yaml

## Tasks:

### Backend:
- [ ] Implement the backend architecture from scratch, which will support the Angular application's API calls.
- [ ] Implement error handling.
- [ ] Implement the plugin system for extensibility (Chatbot).
- [ ] Add authentication for message sending.
### Frontend:
- [ ] Optimize data bindings and state management.
- [ ] Improve the user interface responsiveness.
- [ ] Implement a feature to display message status (sent, received).
- [ ] Add seamless communication with the backend application.
- [ ] Create a login form to allow users to log in and send messages.
### API:
- [ ] Review and if necessary correct RESTful API practices.
- [ ] Ensure best practices in the API definition.

## General instructions

- Make sure to follow best practices.
- Pay attention to the code quality as well as software architecture. We value maintainability and readability.
- We recommend documenting your changes and the reasoning behind them.
- Git history is important. Make sure to commit your changes as you progress.
- Feel free to ask questions if you have any doubts.
- We are looking for a clean, well-structured solution that demonstrates your understanding of the technologies used.

## Deliverables

- [ ] send in files with your comments by (one of)
    - Inline-Code-Comments and send us the files
    - drop the files anywhere and send us the link
    - upload the code to your own Repository (Avoid forking the repository and creating a PR, as this would make your solution visible to others)
- [ ] A brief report summarizing the changes you made, why, and any additional recommendations if they had more time.

## Run instructions

- !!! Before running backend create .env file from .env.example file
- Backend: `cd backend && npm install && npm run start`
- Frontend: `cd frontend && npm install && npm run start`
- API: `openapi.yaml` file contains the API definition.
- Access the frontend at `http://localhost:4200`.
- Access the backend at `http://localhost:3000`.
- Note: The project is set up to run on localhost by default


## Igor's report

### Frontend changes
1. Project Structure: Moved all components, services, and models from app.component.ts to their respectable files/folders. 
    - All components moved to the components/[name-of-the-component] folder
    - All services moved to the services folder
    - Models moved to the models folder

Since this is a small project this structure would suffice, but the alternative approach would be to structure the project based on the scope/feature. For example:

- Messages or Chat could be one feature/folder and inside would be all elements (components, services, etc.) of that scope. 
- Another feature could be auth which would contain all code related to users, login, authentication, etc.

2. State management has been limited to services and changes are reflected in the components via signals. Signals are a great solution for managing the state. 

3. Inside of the project there are two different ways of interacting with HTTP requests. Fetch and HttpClient. They both have their good and bad sides, but ideally, it would be nice to have just a mechanism for interacting with the backend(s). I would refactor the code to leave only HttpClient (HttpClient does some magic such as automatic retrying of requests. Also,
it's already included in Angular, so supporting old browsers would not need a polyfill like with fetch.).

It would be nice to introduce interceptors and attach a JWT token to each authenticated request instead of just adding Auth headers for one request for sending messages.

4. JWT Tokens are used for authentication management as a standard way of handling authentication for HTTP requests. It would be nice to implement automatic logout after the token expires since that is something that hasn't been done so far. 

5. Components have been lazy-loaded (it is very easy to do that now with standalone components)

6. The UI/UX aspect of the app has not been changed a lot but the addition of custom login/signup pages results in an ugly code mixture of custom CSS and tailwind. It would be better to go just with the Tailwind, but I haven't worked with it so far and could not spend time learning. Also, there is a chance to introduce some css preprocessors like Sass and use the BEM standard (that is my preferred way of handling css)

7. The message statuses feature is only handled on the frontend and it would be nice to have a mechanism for it on the backend as well. Persisting status in the database, and adding an endpoint for patching a message is a better way of handling that.

8. One more thing that I would implement on the front end would be at least unit and integration tests if not end-to-end tests. This would take a lot of time so it hasn't been done so far, but that would be the first thing to do if this was a project being built for production.

### Backend implementation

1. Express was the framework of choice for this task because it is perfect for small projects like this since it gives us a lot of useful stuff with small amounts of code. 

2. MongoDB is the database choice because in apps like this (chats with a lot of messages) retrieving a lot of data fast is an important part. It offers powerful querying options as well. Mongoose is a nice addition to the tool belt since it helps us define schemas and offers some extra useful methods and mechanisms.

3. Unit tests and integration tests would also be a must on the backend as well. 

4. Error handling could be better, with clearly defined error types.

5. Typescript was added here as well because it is a better way of understanding and writing code, as well as the smaller chance of bug occurrences.

6. CORS has been handled inside a middleware in the index.ts file. Simple and elegant solution. 

7. Nodemon has been added for automatic restarting and making developers' lives easier. 

8. Environment variables are handled via the dotenv package. It is a secure way of handling sensitive data and is useful for storing constants that are being used in multiple places in the app. Variables for this project will be provided via email. 

9. Backend structure includes splitting code into routes, controllers, middleware, models, and utils. This structure is a standard and allows developers to easily follow the flow of data through the backend. 

10. One thing that would also be a must is input validation on the routes level. I would use something like an express-validator package for this project, but for a bigger project maybe Joi would be more suited.

11. Instead of just adding a `user` property into the message object it would be nice to have something like `sender` and `recipient` in order to have a clear way of knowing who sent the message and to whom. That would be a prerequisite for handling the message status feature fully. 

12. Chatbot is something that I did not add yet. Since the time for completing the assignment ran out and it seems very interesting (I have never implemented it before) I will add it after you review my assignment.

13. The OpenAPI yml file has been updated to reflect the current backend status.

14. Secrets from .env.example file would be removed in a real life situation. 
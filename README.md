Welcome to MD Plus
===================


The live demo can be viewed at http://...
patient credentials:  email: password:
doctor credentials: email: password:

Run the project locally
```
$ git clone https://github.com/shermify/md-plus
$ cd md-plus
$ npm install
$ npm start
```
MongoDB is required for data storage.  When the app is started, the database will automatically be populated with random data.  Watch the console output for credentials.

Description
-------------
I decided to code the app mostly from scratch using react, redux, and express for the api.

The app uses token authentication and roles to restrict access.  Patients cannot access api routes belonging to other patients.  Doctors have access to all patient info.

The UI should be user friendly.  Doctors can accept or decline appointments.  Patients can see their info and schedule appointments.  When a doctor schedules an appointment, it is automatically approved.  Files can be uploaded by clicking the upload button at the top of the file list.

Given the time constraints this is obviously a functional prototype and not production ready.
>**TODO:**

> - Write unit and integration tests for api routes and react components.
> - Refactor api routes.
> - Refactor some of the react containers and extract presentational components.
> - Move modal state to redux
> - Add a separate view for patient files
> - etc...
> 

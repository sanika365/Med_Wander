Form Application
Description
MedWander is a web application that allows users to submit medical forms and updates an online Excel sheet with the submitted data. It utilizes React.js for the frontend and Node.js with Express.js for the backend.
Installation
Backend Setup
1.Clone the repository:
     git clone https://github.com/Sanika365/Med_Wander.git
2.Navigate to the backend directory:
    cd backend
3.Install dependencies:
    npm install
4.Set up the database:

Ensure MySQL is installed and running.
Create a MySQL database named medwander.
Update database/config.js with your MySQL username and password.

 5.Run migrations to create tables:
     npx sequelize-cli db:migrate
6.start the backend server:The server will start at http://localhost:5000.
      npm start
      The server will start at http://localhost:5000.

Frontend Setup

      1.Navigate to the frontend directory:
               cd ../frontend
       2.Install dependencies:
              npm install
        3.Start the React development server:
               npm start
               The React application will start at http://localhost:3000.
               
 How to Run the Application

       1. Backend: Once installed, the backend server can be started with npm start in the backend directory. It runs on port 5000.

       2. Frontend: After installing dependencies, start the React development server with npm start in the frontend directory. It runs on port 3000 and will automatically open in your default browser.
       
Functionality Implemented

The application displays two buttons labeled "Form A" and "Form B".

Clicking on either button will display a form with input fields for Name, Country Code, and Phone Number.

The form header dynamically displays "Form A" or "Form B" based on the selected button.

Form Submission: Users can fill out medical forms (Form A or Form B) with their name, country code, and phone number. Validation ensures correct data formats.

After submitting the form, the data is stored in a SQL database.

A "Refresh" button is available on the interface, which updates an online Excel sheet with the new data from the SQL database when clicked.

Excel Sheet Update: Upon form submission, the backend updates an online Excel sheet with the submitted data using the Google Sheets API.

Additonal features:

Local Storage: Form data is saved locally using browser storage, allowing users to continue where they left off if they revisit the application.

The application is responsive and designed to work on both mobile and desktop devices.


  





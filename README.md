# Expenses Tracker

This is an expense tracker application built using Node.js, allowing users to add, update, delete, and list expenses.

## Features
- Add new expenses
- Update existing expenses
- Delete expenses
- List all expenses
- Show summary of expenses

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/boulos707/expenses-tracker.git

2. Navigate to the project directory:
   cd expenses-tracker
3. Install dependencie:
   npm install

## Usage
To run the application, use the following commands:

Add an expense:
node app.js add "description" amount

Update an expense:
node app.js update id "new description" new_amount

Delete an expense:
node app.js delete id

List all expenses:
node app.js list

Show summary of expenses:
node app.js summary
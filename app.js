import fs, { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const expensesFilePath = path.resolve('expenses.json');

// Helper function to read
const readExpense = () => {
  if (fs.existsSync(expensesFilePath)) {
    const data = readFileSync(expensesFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

// Helper function to write
const writeExpense = (expenses) => {
  writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
};

// Increment ID by 1
const getNextId = () => {
  const expenses = readExpense();
  if (expenses.length === 0) return 1; 
  return Math.max(...expenses.map((exp) => exp.id)) + 1; 
};


// Add function
const addExpense = (description, amount) => {
  const expenses = readExpense();
  const newExpense = {
    id: getNextId(),
    description,
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0],
  };
  expenses.push(newExpense);
  writeExpense(expenses);
  console.log("Expense added successfully!");
};

// Update expense function
const updateExpense = (id, newDescription, newAmount) => {
  const expenses = readExpense();
  const expense = expenses.find((exp) => exp.id === parseInt(id));
  if (expense) {
    if (newDescription) {
      expense.description = newDescription;
    }
    if (newAmount) {
      expense.amount = parseFloat(newAmount);
    }
    writeExpense(expenses);
    console.log("Expense updated successfully!");
  } else {
    console.log("Expense not found.");
  }
};

// Delete expense function
const deleteExpense = (id) => {
  const expenses = readExpense();
  const updatedExpenses = expenses.filter((exp) => exp.id != id);

  if (updatedExpenses.length < expenses.length) {
    writeExpense(updatedExpenses);
    console.log("Expense deleted successfully!");
  } else {
    console.log("ID not found");
  }
};


// List expenses function
const listExpense = () => {
  const expenses = readExpense();
  if (expenses.length > 0) {
    console.log("ID     Description          Amount     Date");
    expenses.forEach((exp) =>
      console.log(`${exp.id}      ${exp.description.padEnd(20)} ${exp.amount}     ${exp.date}`)
    );
  } else {
    console.log("No expenses found.");
  }
};

// Summary function
const showSummary = (month = null) => {
  const expenses = readExpense();
  let total = 0;
  const filteredExpenses = month
    ? expenses.filter((exp) => new Date(exp.date).getMonth() + 1 === parseInt(month))
    : expenses;

  filteredExpenses.forEach((exp) => {
    total += exp.amount;
  });

  if (month) {
    console.log(`Total expense for month ${month}: ${total}`);
  } else {
    console.log(`Total expense: ${total}`);
  }
};

// Command-line arguments
const args = process.argv.slice(2);
const option = args[0];

switch (option) {
  case "add":
    if (args[1] && args[2]) {
      addExpense(args[1], args[2]);
    } else {
      console.log("Usage: node script.js add <description> <amount>");
    }
    break;
  case "update":
    if (args[1] && (args[2] || args[3])) {
      updateExpense(args[1], args[2], args[3]);
    } else {
      console.log("Usage: node script.js update <id> <newDescription> <newAmount>");
    }
    break;
  case "delete":
    if (args[1]) {
      deleteExpense(args[1]);
    } else {
      console.log("Usage: node script.js delete <id>");
    }
    break;
  case "list":
    listExpense();
    break;
  case "summary":
    showSummary(args[1]); // Optional month filter
    break;
  default:
    console.log("Unknown command. Available commands: add, update, delete, list, summary.");
    break;
}

import fs, { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const expensesFilePath = path.resolve('expenses.json');

// Helper function to read

const readExpense = () => {
  if(fs.existsSync(expensesFilePath)) {
    const data = readFileSync(expensesFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

// Helper function to write

const writeExpense = (expenses) =>{
  writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
}

// Add function

const addExpense = (description, amount) =>{
  const expenses = readExpense();
  const newExpense ={
    id: expenses.length + 1,
    description: description,
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0],
  };
  expenses.push(newExpense);
  writeExpense(newExpense);
  console.log("Expenses added successfully");
}

// Update expenses function

const updateExpense = (id, newDescription, newAmount) => {
  const expenses = readExpense();
  const expense = expenses.find((exp) => exp.id === id);
  if(expense) {
    if(newDescription){
      expense.description = newDescription;
    }
    if(newAmount){
      expense.amount = newAmount;
    }
  writeExpense(expenses);
  console.log("Updating completed!");
  } else{
    console.log("Expense not found")
  }
}
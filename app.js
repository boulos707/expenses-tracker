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

// Delete expenses function

const deleteExpense = (id) => {
  const expenses = readExpense();
  const expense = expenses.filter((exp) => exp.id != id);
  if(expense.length < expenses.length){
    writeExpense(expense);
    console.log("Deleted expenses!");
  }else{
    console.log("ID not found");
  }
}

// List expenses function

const listExpense = () => {
  const expenses = readExpense();
  if(expenses.length > 0){
    console.log("ID     Description     Amount      Date");
    expenses.forEach((exp) =>{ `${exp.id}      ${exp.description}      ${exp.amount}     ${exp.date}`});
  }else{
    console.log("We don't have any expense!");
  }
}

// Summary function (total expense; with an option month filter)

const showSummary = (month = null) =>{
  const expenses = readExpense();
  let total = 0;
  let filterExpense;

  if(month){
    filterExpense = expenses.filter((exp) => new Date(exp.date).getMonth() +1 === parseInt(month));
  } else{
    filterExpense = expenses;
  }

  filterExpense.forEach((exp) => {
    total += exp.amount;
  });

  if(month){
    console.log(`Total expense for month ${month} is ${total}`)
  }else{
    console.log(`Total expense is: ${total}`);
  }
}
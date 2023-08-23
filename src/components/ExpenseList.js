import React from 'react';
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';

//구조 분해 할당 사용해서 props 사용안하고 받아오기
const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {

  return (
    <>
      <ul className='list'>
        {expenses.map(expense => {
          return <ExpenseItem
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        })}
      </ul>

      {expenses.length > 0 && (
        <button button
          className='btn'
          onClick={clearItems}
        >
          목록 지우기
        </button>
      )}
    </>
  )
}

export default ExpenseList;
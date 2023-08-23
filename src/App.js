import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';


const App = () => {

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 2000 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [edit, setEdit] = useState(false);
  //어떤 요소의 edit버튼을 눌렀는지 기억하기 위한 state
  const [id, setId] = useState("");

  const [alert, setAlert] = useState({ show: false, type: "", text: "" });

  
  const clearItems = () => {
    setExpenses([]);

  }

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false, type: "", text: "" });
    }, 5000);
  }

  const handleCharge = (event) => {
    // console.log(event.target.value);
    setCharge(event.target.value);
  }

  const handleAmount = (event) => {
    setAmount(event.target.valueAsNumber)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (charge !== "" && amount > 0) {

      if (edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        
        setExpenses(newExpenses);
        
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });

      } else {
        //expenses state에 새로운 객체 만들어서 추가해주기, state update
        //state update 할 때는 불변성을 지켜줘야 한다.
        //불변성을 지킨다는 것은 이전에 있던 값을 건드리지 않고, 새로운 값을 만들어서 교체
  
        //새로운 객체 생성
        const newExpense = { id: crypto.randomUUID(), charge, amount };
  
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);

        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      //추가된 값이 input 창에 남아있는걸 초기화시킴
      setCharge("");
      setAmount(0);

    } else {
      console.log('값을 입력해주세요');
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다." });
    }
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);

    //state 변경을 위해서 setState 함수를 이용
    setExpenses(newExpenses);
  }

  return (
    <main className='main-container'>

      { alert.show ? <Alert type={alert.type} text={alert.text} /> : null }

      <h1>예산 계산기</h1>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>{expenses.reduce((acc, cur) => {
            return (acc += cur.amount)
          }, 0)}원</span>
        </p>
      </div>
    </main>
  )
}

export default App;
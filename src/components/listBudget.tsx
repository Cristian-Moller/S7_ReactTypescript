import { useState } from "react";
import "../pages/budget.css"
import { arrayType } from "../types/types"
import { Button } from "./button";

type listProp = {
  newBudget: arrayType[];
}

export function ListBadget({newBudget}: listProp){
  const [newBudgetOrder, setNewBudgetOrder] = useState<arrayType[]>([])
  const [alphabetic, setAlphabetic] = useState<boolean>(false)
  const [date, setDate] = useState<boolean>(false)
  
  function alphabeticalOrder(): void {
    const arrayAlphabetic = [...newBudget]
    if(alphabetic){
      //ascendente
      arrayAlphabetic.sort((a, b) => {
        if(a.clientName < b.clientName) {
          return -1
        }
        if(a.clientName > b.clientName) {
          return 1
        }
        return 0
      })
    } else {
      //descendente
      arrayAlphabetic.sort((a, b) => {
        if(a.clientName < b.clientName) {
          return 1
        }
        if(a.clientName > b.clientName) {
          return -1
        }
        return 0
      })
    }
    setAlphabetic(!alphabetic)
    return setNewBudgetOrder(arrayAlphabetic)
  }

  function dateOrder(): void {
    const arrayDate = [...newBudget]
    if(date){
      //ascendente
      arrayDate.sort((a, b) => {
        if(a.day < b.day) {
          return -1
        }
        if(a.day > b.day) {
          return 1
        }
        return 0
      })
    } else {
      //descendente
      arrayDate.sort((a, b) => {
        if(a.day < b.day) {
          return 1
        }
        if(a.day > b.day) {
          return -1
        }
        return 0
      })
    }
    setDate(!date)
    return setNewBudgetOrder(arrayDate)
  }

  function resetArray(): void {
    const array = [...newBudget]
    return setNewBudgetOrder(array)
  }
  
  return (
    <div className='list-budget'>
          <h2>My Budgets</h2>
        <div className='filter-row'>
          <Button className='order' handleClick={alphabeticalOrder} text='ABC' ></Button>
          <Button className='order' handleClick={dateOrder} text='DAY' ></Button>
          <Button className='order' handleClick={resetArray} text='Reset' ></Button>
          
        </div>
        <div className='itemBudget'>
          {
            ((newBudgetOrder < newBudget) ? newBudget : newBudgetOrder) 
            .map((itemData, index) => (
              <div key={index} className='subItemBudget'>
                <div>Name: <span>{itemData.clientName}</span></div>
                <div>Budget Name: <span>{itemData.pressupostName}</span></div>
                <div><span>{itemData.services[0] && 'WEB'}</span></div>
                <div><span>{itemData.services[1] && 'SEO'}</span></div>
                <div><span>{itemData.services[2] && 'ADS'}</span></div>
                <div>Number of Page: <span>{itemData.page}</span></div>
                <div>Number of Languaje: <span>{itemData.language}</span></div>
                <div>Date: <span>{itemData.day +'/'+ itemData.month +'/'+ itemData.year}</span></div>
                <div>TOTAL: <span>{itemData.total}</span>€</div>
              </div>
            ))
          }
        </div>
      </div>
  )
}
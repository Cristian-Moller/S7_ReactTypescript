import "../pages/budget.css"
import { arrayType } from "../types/types"

type listProp = {
  newBudget: arrayType[];
}

export function ListBadget({newBudget}: listProp){

  
  
  return (
    <div className='list-budget'>
          <h2>My Budgets</h2>
        <div className='filter-row'>
          <button>Filter</button>
          <button>Filter</button>
          <button>Filter</button>
          <button>Filter</button>
          <button>Filter</button>
        </div>
        <div className='itemBudget'>
          {
            newBudget.map((itemData, index) => (
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
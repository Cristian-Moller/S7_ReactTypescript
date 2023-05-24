import { useState } from 'react'
import { arrayBudget } from './budget/arrayBudget'
import './App.css'

const getFormattedPrice = (price: number) => `${price}€`

function App() {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(arrayBudget.length).fill(false)
  )
  
  const [total, setTotal] = useState(0)

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + arrayBudget[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };
  return (
    <div className='budget'>
      <h3>Budget</h3>

      <ul>
        {arrayBudget.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                name={name}
                value={name}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              <label>{name} ({getFormattedPrice(price)})</label>
            </li>
          );
        })}
        <li>
          <div>
            Total: {getFormattedPrice(total)}
          </div>
        </li>
      </ul>
      
    </div>
  )
}

export default App

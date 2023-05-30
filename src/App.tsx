import { useEffect, useState } from 'react'
import { arrayBudget } from './budget/arrayBudget'
import './App.css'
import { Button } from './components/button';

const getFormattedPrice = (price: number) => `${price}€`;

function App() {

  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(arrayBudget.length).fill(false)
  )

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(1);

  function pageChange(toAdd: number){
    if(page >= 1){
      setPage(page + toAdd);
    }
  }
  function languageChange(toAdd: number){
    if(language >= 1){
      setLanguage(language + toAdd);
    } 
    
  }
  function controlPage(){
    if(page > 1){
      pageChange(-1)
    }
  } 
  function controlLenaguage(){
    if(language > 1){
      languageChange(-1);
    }
  }
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          if((currentState === true) && (index == 0)){
            return (sum + (arrayBudget[0].price  + (page *language * 30)))
          } else {
            return sum + arrayBudget[index].price;
          }
        }
        return sum;
      },
      0
    );
    setTotal(totalPrice);
  };

  useEffect(() => {
    handleOnChange(-1)
    console.log(page)
  }, [page, language])
  
  return (
    <div className='budget'>
      <h3>Budget</h3>
      <ul>
        {arrayBudget.map(({ name, price }, index) => {
          
          if ((index == 0) && (checkedState[0] == true)){
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
                <ul className='subList'>
                  <li>
                    <label htmlFor="">Número de páginas</label>
                    <Button handleClick={controlPage} className='less' text='-'/>
                    <input 
                      type="number"
                      name='page'
                      value={page}
                      onChange={() => handleOnChange(index)}
                    />
                    <Button handleClick={() => pageChange(1)} className='more' text='+'/>
                  </li>
                  <li>
                    <label htmlFor="">Número de idiomas</label>
                    <Button handleClick={controlLenaguage} className='less' text='-'/>
                    <input 
                      type="number"
                      name='language'
                      value={language}
                      onChange={() => handleOnChange(index)}
                    />
                    <Button handleClick={() => languageChange(1)} className='more' text='+'/>
                  </li>
                </ul>
              </li>
            );
          } else {
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
            }
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

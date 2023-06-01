import { useEffect, useState } from 'react'
import { arrayBudget } from '../budget/arrayBudget';
import { Button } from '../components/button';

const getFormattedPrice = (price: number) => `${price}€`;

function Budget() {

  const obtainPage = () => {
    const pages = localStorage.getItem('page');
    if(pages){
      return JSON.parse(pages)
    } else {
      return 1
    }
  }
  const obtainLanguage = () => {
    const languages = localStorage.getItem('language');
    if(languages){
      return JSON.parse(languages)
    } else {
      return 1
    }
  }
  const obtainPrice = () => {
    const totalPrices = localStorage.getItem('totalPrice');
    if(totalPrices){
      return JSON.parse(totalPrices)
    } else {
      return 0
    }
  }

  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(arrayBudget.length).fill(false)
  )

  const [page, setPage] = useState(obtainPage())
  const [language, setLanguage] = useState(obtainLanguage());
  const [total, setTotal] = useState(obtainPrice());

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
  
  const handleOnChange = (position?: number) => {
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
    handleOnChange()
  }, [page, language, total])

  useEffect(() => {
    const checkedStates = window.localStorage.getItem('checkedState');
      if(checkedStates) setCheckedState(JSON.parse(checkedStates));
  }, [])

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page))
    localStorage.setItem('language', JSON.stringify(language))
    localStorage.setItem('totalPrice', JSON.stringify(total))
    localStorage.setItem('checkedState', JSON.stringify(checkedState))
  }, [ page, language, checkedState, total])
  
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
                      type="text"
                      name='page'
                      value={page}
                      onChange={() => obtainPage()}
                    />
                    <Button handleClick={() => pageChange(1)} className='more' text='+'/>
                  </li>
                  <li>
                    <label htmlFor="">Número de idiomas</label>
                    <Button handleClick={controlLenaguage} className='less' text='-'/>
                    <input 
                      type="text"
                      name='language'
                      value={language}
                      onChange={() => obtainLanguage()}
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

export default Budget
import { useEffect, useState } from 'react'
import { arrayBudget } from '../budget/arrayBudget';
import { Button } from '../components/button';
import "./budget.css"
import { Popup } from '../components/popup';
import { ListBadget } from '../components/listBudget';
import { arrayType } from '../types/types';

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
  const [clientName, setClientName] = useState<string>('')
  const [pressupostName, setPressupostName] = useState<string>('')
  const [newBudget, setNewBudget] = useState<arrayType[]>([
    //array test para probar que ordena por fecha
    {
      clientName: "Mario",
      day: 1,
      language: 4,
      month: 6,
      page: 4,
      pressupostName: "IT Academy",
      services: ['web', 'ads'],
      total: 1180,
      year: 2023
    },
    {
      clientName: "Julian",
      day: 15,
      language: 4,
      month: 6,
      page: 4,
      pressupostName: "Correos",
      services: ['web', 'ads'],
      total: 1180,
      year: 2023
    }
  ])

  const handleSubmitInfo = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  const date = new Date()
  
  const handleSubmit = () => {
    const itemData: arrayType = {
      services: [],
      page: page,
      language: language,
      total: total,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      clientName: clientName,
      pressupostName: pressupostName,
    }
    itemData.services = checkedState.map((isChecked, index) => (isChecked ? arrayBudget[index].id : null))
    .filter((id) => id !== null) as string[]

    setNewBudget((arrayItemData) => [...arrayItemData, itemData])
  }

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
    localStorage.setItem('newBudget', JSON.stringify(newBudget))
  }, [page, language, checkedState, total, newBudget])
  
  return (
    <div className='budget'>
      <h3>Budget</h3>

      <form action="" className='form-budget' onSubmit={handleSubmitInfo}>
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
                      <Popup name='page' text='En este componente debe indicar el número de PÁGINAS que tendrá su sitio web.' handleClick={handleSubmitInfo} />
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
                      <Popup name='language' text='En este componente debe indicar el número de LENGUANJES que tendrá su sitio web.' handleClick={handleSubmitInfo} />
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
            <label htmlFor="">Nombre Cliente: </label>
            <input 
              type="text"
              value={clientName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setClientName(e.target.value)
              }}
            />
          </li>
          <li>
            <label htmlFor="">Nombre Presupuesto: </label>
            <input 
              type="text"
              value={pressupostName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPressupostName(e.target.value)
              }}
            />
          </li>
          <li>
            <div>
              Total: {getFormattedPrice(total)}
            </div>
          </li>
          <li>
            <input type="submit" value="Save Budget" onClick={handleSubmit} className='buttonSubmit'></input>
          </li>
        </ul>
      </form>

      <ListBadget newBudget={newBudget} />
      
    </div>
    
  )
}

export default Budget
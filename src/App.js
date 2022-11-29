import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [valute, setValute] = React.useState(1);
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);


  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then((json) => {
      json["Valute"]["RUB"] = {};
      json["Valute"]["RUB"]["Value"] = 1;
      setValute(json.Valute);
    })
    .catch((err) => {
      console.warn(err);
      alert('Не удалось получить данные!');
    })
  }, [])

  const onChangeFromPrice = (value) => {

    const result = (valute[fromCurrency]["Value"]/valute[toCurrency]["Value"] * value).toFixed(3);
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {

    const result = valute[toCurrency]["Value"]/valute[fromCurrency]["Value"] * value;
    setFromPrice(result);
    setToPrice(value);
  }

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    onChangeFromPrice(fromPrice);
  }

  const onChangeToCurrency = (cur) => {
    setToCurrency(cur);
    onChangeToPrice(toPrice);
  }

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={onChangeFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={onChangeToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;

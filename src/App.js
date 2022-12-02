import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryID, setCategoryID] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryID ? `category=${categoryID}` : '';

    fetch(
      `https://63878d8fd9b24b1be3f4047c.mockapi.io/collections?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных!');
      })
      .finally(() => setIsLoading(false));
  }, [categoryID, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              className={categoryID == index ? 'active' : ''}
              onClick={() => setCategoryID(index)}
              key={index}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page == i + 1 ? 'active' : ''} key={i}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

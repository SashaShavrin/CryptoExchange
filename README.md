![swap](https://github.com/SashaShavrin/CryptoExchange/assets/97390534/a51439b6-7006-47e9-af3f-e05aee25ef0e)# Crypto Exchange - криптовалютный конвертер

## Запуск
### `npm i`
### `npm start`


## Функция
Перевод криптовалютных единиц в зависимости от выбора и ввода пользователя

## Стек
<ul>
  <li>React</li>
  <li>Style Modules</li>
  <li>Для вирутального скролинка списка валют: react-virtualized</li>
  <li>Загрузка данных Fetch API</li>
</ul>


## Feature
1. Виртуальный рендер списка. Для обеспечения быстродействия отрисовываю только отображаемую часть списка на экране.
2. После выбора валюты в списке, список закрывается. При повторном клике на список сохраняется контекст выбранной валюты (автоматически скролю до нее + подсвечиваю как выбранную).
3. Открыть два списка одновременно нельзя, либо левый, либо правый. Фича обеспечивает отсутствие наложения списков на мобильных устройствах.
4. Возможность поменять выбранный контекст валют относительно друг друга (![Uploading sw<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_98)">
<path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE"/>
<path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE"/>
</g>
<defs>
<clipPath id="clip0_3_98">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
ap.svg…]())

5. Внутри списка можно искать валюты с помощью поиска. 


import React, { useState } from 'react';

import './App.css';

const App = () => {
  const [matrix, setMatrix] = useState([]);
  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [foundCoordinates, setFoundCoordinates] = useState([]);

  const toCreateMatrix = (row, column) => {
    const matrix = [];
    for (let i = 0; i < row; i++) {
        const rowMatrix = [];
        for (let j = 0; j < column; j++) {
            const elementOfRow = Math.floor(Math.random() * 16).toString(16);
            rowMatrix.push(elementOfRow);
        }
        matrix.push(rowMatrix);
    }
    return matrix;
}

const toCreateSubmatrix = (topLeft, topRight, bottomLeft, bottomRight) => {
  const submatrix = [[topLeft, topRight], [bottomLeft, bottomRight]];
  return submatrix
}

const toSearchInMatrix = (matrix, submatrix) => {

  if (matrix.length < submatrix.length || matrix[0].length < submatrix[0].length) {
      return false;
  }

  const arrayOfCoordinatesMatrix = [];

  const isSubmatrixMatch = (startRow, startColumn) => {

      const arrayCoordinates = [];

      for (let i = 0; i < submatrix.length; i++) {
          for (let j = 0; j < submatrix[i].length; j++) {
              if (matrix[startRow + i][startColumn + j] !== submatrix[i][j]) {                    
                  return false
              }
              arrayCoordinates.push({x: startRow + i, y: startColumn + j});
          }
      }  
         

      const coordinates = {
          topLeft: arrayCoordinates[0],
          topRight: arrayCoordinates[1],
          bottomLeft: arrayCoordinates[2],
          bottomRight: arrayCoordinates[3],
      };

      arrayOfCoordinatesMatrix.push(coordinates);        
      
      return true;
  };
  
  for (let i = 0; i <= matrix.length - submatrix.length; i++) {
      for (let j = 0; j <= matrix[0].length - submatrix[0].length; j++) {
        if (isSubmatrixMatch(i, j)) {
          setFoundCoordinates(arrayOfCoordinatesMatrix);
        }          
      }
  }
  
  return arrayOfCoordinatesMatrix;
}

const isFoundCoordinate = (x, y) => {
  return foundCoordinates.some(coord =>
    (coord.topLeft.x === x && coord.topLeft.y === y) ||
    (coord.topRight.x === x && coord.topRight.y === y) ||
    (coord.bottomLeft.x === x && coord.bottomLeft.y === y) ||
    (coord.bottomRight.x === x && coord.bottomRight.y === y)
  );
};

const handleInputChange = (e, setter) => {
  const value = e.target.value;
  const hexPattern = /^[0-9a-fA-F]*$/;
  if (hexPattern.test(value)) {
    setter(value);
  }
}

const handleGenerateMatrix = () => {
  setMatrix(toCreateMatrix(row, column));
  setFoundCoordinates([]);
}

const disabledGenerate = () => {
  if (row === '' || column === '') {
    return true;
} else {
    return false;
  }
}

const disabledSearch = () => {
  if (topLeft === '' || topRight === '' || bottomLeft === '' || bottomRight === '') {
    return true;
} else {
    return false;
  }
}



  return (
    <div className='container'>
      <div className='matrix_frame'>
        <div className='matrix_container'>
          {matrix && matrix.map((el, rowIndex) => {
            return (
              <div key={rowIndex} className='matrix_element'>
                {el.map((e, colIndex) => {
                  const className = isFoundCoordinate(rowIndex, colIndex) ? 'element_found' : 'element';
                  return (
                    <span className={className} key={colIndex}>{e}</span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className='container_content'>
      <div className='generate'>
        <div className='generate_content'>
          <span>Размеры:</span>
          <input  onChange={(e) => setRow(e.target.value)} type='text' />
          <span>X</span>
          <input onChange={(e) => setColumn(e.target.value)} type='text' />
        </div>
        <button disabled={disabledGenerate()} onClick={handleGenerateMatrix} className='generate_button'>Сгенерировать</button>
      </div>
      <div className='mask'>
        <span>Маска:</span>
        <div className='mask_element'>
          <div className='mask_element_container'> 
          <input
                maxLength={1}
                onChange={(e) => handleInputChange(e, setTopLeft)}
                type='text'
                pattern='[0-9a-fA-F]*'
                value={topLeft}
              />
          <input
                maxLength={1}
                onChange={(e) => handleInputChange(e, setTopRight)}
                type='text'
                pattern='[0-9a-fA-F]*'
                value={topRight}
              />
          </div>
          <div className='mask_element_container'> 
          <input
                maxLength={1}
                onChange={(e) => handleInputChange(e, setBottomLeft)}
                type='text'
                pattern='[0-9a-fA-F]*'
                value={bottomLeft}
              />
            <input
                maxLength={1}
                onChange={(e) => handleInputChange(e, setBottomRight)}
                type='text'
                pattern='[0-9a-fA-F]*'
                value={bottomRight}
              />
          </div>
        </div>
      </div>
      <button className='search_button' disabled={disabledSearch()}  onClick={() => toSearchInMatrix(matrix, toCreateSubmatrix(topLeft, topRight, bottomLeft, bottomRight))}>Найти</button>
    </div>
  </div>
  );
}

export default App
import React, { useState, memo } from 'react';
import "./dropdown.css";

function Dropdown(props) {

  const {
    arr,
    onSelectChange
  } = props;

  const [value, setValue] = useState(arr[0]);
  const [active, setActive] = useState(false);

  const selectHandler = (item) => {
    setValue(item);

    if(onSelectChange) {
      onSelectChange(item)
    }
  }

  const toggleActive = () => {
    setActive(prevState => !prevState);
  }

  return (
    <div className="dropdown-container">
      <div className="menu-container">
        <div 
          className="pools-dropdown"
          onClick={toggleActive} 
        >
          {value}  
          <i class="fas fa-caret-down"></i>
        </div>

        <div 
          className={active ? "menu active-dropdown" : "menu"}
          onMouseLeave={toggleActive} 
        >
          {
            arr.map(item => (
              <div 
                className="dropdown-item-cus"
                onClick={() => selectHandler(item)} 
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default memo(Dropdown);
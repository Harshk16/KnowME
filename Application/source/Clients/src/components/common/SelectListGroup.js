import React, {
} from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
   placeholder,
   name,
   value,
   error,
   info,
   onChange,
   options
}) => {
    const selectOption = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
   return ( 
       <div className="form-group">
             <select 
               className={classnames('form-control form-control-lg', {
                 'is-invalid': error
               })}
               placeholder={placeholder}
               name={name}
               value={value}
               onChange={onChange}>
               {selectOption}
            </select>
               
               {info && <small className="form-text text-muted">{info}</small>}
               {error && <div className="invalid-feedback">{error}</div>}

           </div>
   )
};

SelectListGroup.prototypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   info: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.string.isRequired,
   options: PropTypes.array.isRequired
}

export default SelectListGroup;

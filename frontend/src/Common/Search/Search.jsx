import React from 'react'

const Search = ({value, setValue, ...props}) => {
  return <>
    <input className={props.classes} placeholder={props.placeholder} onChange={e => setValue(e.target.value)} value={value} />
  </>
}

export default Search
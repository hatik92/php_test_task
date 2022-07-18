import React from 'react'

const Search = ({value, setValue}) => {
  return <>
    <input onChange={e => setValue(e.target.value)} value={value} />
  </>
}

export default Search
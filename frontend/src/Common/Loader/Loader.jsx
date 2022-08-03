import style from './loader.module.css';

const Loader = () => {
  return <>
    <div className='d-flex align-items-center'>
      <div className={style.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </>
}

export default Loader
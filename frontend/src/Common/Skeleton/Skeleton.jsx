import classNames from 'classnames'
import style from './skeleton.module.scss'
import bookImg from '../../images/book.jpg';

const Skeleton = () => {
  const skClassNames = classNames(style.loading_skeleton, 'card mb-3 w-100 shadow-none p-3 bg-light rounded')
  return <>
    <div className={skClassNames}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={bookImg} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Author:</p>
            <p className="card-text">Count:<small className="text-muted"></small></p>
          </div>
        </div>
      </div>
    </div>
    <div className={skClassNames}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={bookImg} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Author:</p>
            <p className="card-text">Count:<small className="text-muted"></small></p>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Skeleton
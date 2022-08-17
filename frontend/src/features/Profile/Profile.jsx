import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from './profileSlice';
import { useSelector } from 'react-redux';
import BookItem from './../Books/BookItem/BookItem';
import style from './profile.module.css';

const Profile = () => {
  const { user } = useSelector(store => store.app)


  return <>

    <div className="row py-5 px-4">
      <div className="col-md-6 mx-auto">
        {/* Profile widget */}
        <div className={"shadow rounded overflow-hidden " + style.profileBackground}>
          <div className={"px-4 pt-0 pb-4 " + style.cover}>
            <div className={"d-flex align-items-center " + style.profile_head}>
              <div className={"profile me-3 " + style.imgBlock}>
                <img src={user.image} alt="..." width="130" className="rounded mb-2 img-thumbnail" />
                <a href="#" className="btn btn-outline-dark btn-sm btn-block">Wish list</a>
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">{user.name} {user.surname}</h4>
                {/* <p className="small mb-4"><i className="fas fa-map-marker-alt me-2"></i>{user.facultet}</p> */}
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{user.books.length}</h5>
                <small className="text-muted"><i className="fas fa-image me-1"></i>Book count</small>
              </li>
              {/* <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">745</h5>
                <small className="text-muted"> <i className="fas fa-user me-1"></i>Followers</small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">340</h5>
                <small className="text-muted"> <i className="fas fa-user me-1"></i>Following</small>
              </li> */}
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0">Facultet</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">{user.facultet}</p>
              {/* <p className="font-italic mb-0">Lives in New York</p>
              <p className="font-italic mb-0">Photographer</p> */}
            </div>
          </div>
          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Taken books</h5>
            </div>
            <div className="row">
              {user.books.map(book =>
                <div key={book.id} className="col-lg-6 mb-2 pr-lg-1">
                  <BookItem book={book} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Profile
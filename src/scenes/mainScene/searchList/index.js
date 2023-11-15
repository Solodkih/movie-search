import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPageSearchObject,
  createSelectListWorkByArrayKey,
} from '../../../redux/searchSlice';

import PropTypes from 'prop-types';
import useIntersect from './useIntersect';
import ItemListBooks from '../../../components/itemListBooks';
import useUpdateList from './useUpdateList';
import './searchList.scss';

export default function SearchList({ className = '' }) {
  const dispatch = useDispatch();
  const url = window.location.href;
  const page = useSelector((state) => state.search.pageList[url]?.page) || 0;
  const maxPage = useSelector((state) => state.search.pageList[url]?.maxPage) || 0;
  const arrayUrl = useSelector((state) => state.search.seachList[url]) || [];
  const books = useSelector(createSelectListWorkByArrayKey(arrayUrl));

  const setPage = () => {
    dispatch(setPageSearchObject({ url, page: page + 1 }));
  };
  const resetPage = () => {
    dispatch(setPageSearchObject({ url, page: 1 }));
  };

  const containerRef = useRef(null);
  const intersection = useIntersect(containerRef);

  useEffect(() => {
    if (intersection) {
      if (page + 1 <= maxPage) {
        setPage();
      }
    }
  }, [intersection]);

  useUpdateList(page, maxPage, resetPage);

  return (
    <div className={`${className} list-books`}>
      <div className="list-books__container">
        {books.map((book) => {
          return (
            <ItemListBooks
              key={`${book.title}+${book.key}`}
              className="list-books__item"
              book={book}
            />
          );
        })}
      </div>
      <div id="ref" ref={containerRef} />
    </div>
  );
}

SearchList.propTypes = {
  className: PropTypes.string,
};

SearchList.defaultProps = {
  className: null,
};

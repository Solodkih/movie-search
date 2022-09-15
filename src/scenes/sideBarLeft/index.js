import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdvanceSearch from './advanceSearch';
import QuerySearch from './querySearch';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Logo from './logo';

import './sideBarLeft.scss';

export default function SideBarLeft({ className }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    queryData: { query: '', show: true },
    titleData: { title: '', show: true },
    authorData: { author: '', show: true },
    subjectData: { subject: '', show: true },
    placeData: { place: '', show: true },
    personData: { person: '', show: true },
    publisherData: { publisher: '', show: true },
  });
  useEffect(async () => {
    async function get() {
      return {
        title: searchParams.get('title'),
        author: searchParams.get('author'),
        query: searchParams.get('query'),
        subject: searchParams.get('subject'),
        place: searchParams.get('place'),
        person: searchParams.get('person'),
        publisher: searchParams.get('publisher'),
      };
    }
    let data = await get();
    setFilter({
      ...filter,
      titleData: { title: data.title, show: filter.titleData.show },
      authorData: { author: data.author, show: filter.authorData.show },
      queryData: { query: data.query, show: filter.queryData.show },
      subjectData: { subject: data.subject, show: filter.subjectData.show },
      placeData: { place: data.place, show: filter.placeData.show },
      personData: { person: data.person, show: filter.personData.show },
      publisherData: { publisher: data.publisher, show: filter.publisherData.show },
    });
  }, [searchParams]);

  function setTitle(title, show) {
    setFilter({ ...filter, titleData: { title: title, show: show } });
  }
  function setAuthor(author, show) {
    setFilter({ ...filter, authorData: { author: author, show: show } });
  }
  function setQuery(query, show) {
    setFilter({ ...filter, queryData: { query: query, show: show } });
  }
  function setSubject(subject, show) {
    setFilter({ ...filter, subjectData: { subject: subject, show: show } });
  }
  function setPlace(place, show) {
    setFilter({ ...filter, placeData: { place: place, show: show } });
  }
  function setPerson(person, show) {
    setFilter({ ...filter, personData: { person: person, show: show } });
  }
  function setPublisher(publisher, show) {
    setFilter({ ...filter, publisherData: { publisher: publisher, show: show } });
  }

  return (
    <aside className={`${className} side-bar-left`}>
      <div className="side-bar-left__container">
        <Logo className="side-bar-left__log" />
        <QuerySearch
          queryData={filter.queryData}
          setQuery={(query, show) => {
            setQuery(query, show);
          }}
          className="side-bar-left__item"
        />
        <AdvanceSearch
          titleData={filter.titleData}
          setTitle={(title, show) => {
            setTitle(title, show);
          }}
          authorData={filter.authorData}
          setAuthor={(author, show) => {
            setAuthor(author, show);
          }}
          subjectData={filter.subjectData}
          setSubject={(subject, show) => {
            setSubject(subject, show);
          }}
          placeData={filter.placeData}
          setPlace={(place, show) => {
            setPlace(place, show);
          }}
          personData={filter.personData}
          setPerson={(person, show) => {
            setPerson(person, show);
          }}
          publisherData={filter.publisherData}
          setPublisher={(publisher, show) => {
            setPublisher(publisher, show);
          }}
          className="side-bar-left__item"
        />
        <button
          className="menu-side-bar__button-search"
          onClick={(e) => {
            e.preventDefault();
            let queryUrlParams = filter.queryData.query
              ? `query=${filter.queryData.query}`
              : '';
            let titleUrlParams = filter.titleData.title
              ? `&title=${filter.titleData.title}`
              : '';
            let authorUrlParams = filter.authorData.author
              ? `&author=${filter.authorData.author}`
              : '';
            let subjectUrlParams = filter.subjectData.subject
              ? `&subject=${filter.subjectData.subject}`
              : '';
            let placeUrlParams = filter.placeData.place
              ? `&place=${filter.placeData.place}`
              : '';
            let personUrlParams = filter.personData.person
              ? `&person=${filter.personData.person}`
              : '';
            let publisherUrlParams = filter.publisherData.publisher
              ? `&publisher=${filter.publisherData.publisher}`
              : '';
            navigate(
              `/\search?${queryUrlParams}${titleUrlParams}${authorUrlParams}${subjectUrlParams}${placeUrlParams}${personUrlParams}${publisherUrlParams}`
            );
          }}
        >
          SEACH
        </button>
      </div>
    </aside>
  );
}

SideBarLeft.propTypes = {
  className: PropTypes.string.isRequired,
};

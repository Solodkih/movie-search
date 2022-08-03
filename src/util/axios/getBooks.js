import axios from 'axios';
import { getUrlImage, SIZE_IMAGE_LARGE } from '../image.js';

const urlMain = 'https://openlibrary.org';

const urlBook = '/subjects/love.json';

const reguestDataGetBook = {
  method: 'get',
  url: `${urlMain}${urlBook}`,
};

export async function getBookSubjects() {
  const responseBook = await axios(reguestDataGetBook);
  const arrayBooks = responseBook.data.works.map((item) => {
    return {
      title: item.title,
      urlBookByWork: item.key,
      authors: item.authors.map((itemAuthors) => {
        return itemAuthors.name;
      }),
      urlImage: `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`,
    };
  });
  return arrayBooks;
}

export async function getBookByWorks(urlWorks) {
  const responseBook = await axios({
    method: 'get',
    url: `${urlMain}/works/${urlWorks}.json`,
  });

  const description = () => {
    if (Object.prototype.hasOwnProperty.call(responseBook.data, 'description')) {
      if (
        Object.prototype.hasOwnProperty.call(responseBook.data.description, 'value')
      ) {
        return responseBook.data.description.value;
      }
      return responseBook.data.description;
    }
    return '';
  };

  return {
    subjectTimes: responseBook.data.subject_times
      ? responseBook.data.subject_times
      : [],
    subjectPlaces: responseBook.data.subject_places
      ? responseBook.data.subject_places
      : [],
    subjectPeople: responseBook.data.subject_people
      ? responseBook.data.subject_people
      : [],
    subjects: responseBook.data.subjects ? responseBook.data.subjects : [],
    title: responseBook.data.title,
    firstPublishDate: responseBook.data.first_publish_date,
    authors: responseBook.data.authors.map((itemAuthors) => {
      return itemAuthors.author.key;
    }),
    description: description(),
    arrayUrlImage: responseBook.data.covers.map((itemUrl) => {
      return `https://covers.openlibrary.org/b/id/${itemUrl}-L.jpg`;
    }),
  };
}

export async function getNameAuthorForBook(urlAuthor) {
  const responseAuthor = await axios({
    method: 'get',
    url: `${urlMain}${urlAuthor}.json`,
  });
  return responseAuthor.data.name;
}

export async function getAuthor(urlAuthor) {
  const responseAuthor = await axios({
    method: 'get',
    url: `${urlMain}${urlAuthor}.json`,
  });
  return {
    alternateNames: responseAuthor.data.alternate_names,
    bio: responseAuthor.data.bio
      ? responseAuthor.data.bio.value
        ? responseAuthor.data.bio.value
        : responseAuthor.data.bio
      : null,
    birthDate: responseAuthor.data.birth_date,
    deathDate: responseAuthor.data.death_date,
    name: responseAuthor.data.name,
    personalName: responseAuthor.data.personal_name,
    title: responseAuthor.data.title,
    photos: responseAuthor.data.photos
      ? responseAuthor.data.photos.map((item) => {
          return getUrlImage(SIZE_IMAGE_LARGE, item);
        })
      : [],
  };
}

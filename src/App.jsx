import { useState, useEffect, useCallback } from 'react';

import Backdrop from './components/Backdrop';
import Container from './components/Container';
import Header from './components/Header';
import PhotoList from './components/PhotoList';
import SearchBar from './components/SearchBar';

import unsplash from './api/unsplash';
import useDebouncedState from './hooks/useDebouncedState';
import ImageViewer from './components/ImageViewer';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, debouncedSearchQuery, setSearchQuery] = useDebouncedState(
    '',
    1000
  );
  const [imageViewer, setImageViewer] = useState({ open: false, image: null });

  const handleQueryChange = useCallback(
    event => setSearchQuery(event.target.value),
    [setSearchQuery]
  );

  useEffect(() => {
    setPhotos([]);
    setFetching(true);
    unsplash
      .get(debouncedSearchQuery ? '/search/photos' : '/photos', {
        params: {
          ...(debouncedSearchQuery ? { query: debouncedSearchQuery } : {}),
          per_page: 20,
        },
      })
      .then(res => {
        setPhotos(debouncedSearchQuery ? res.data.results : res.data);
        setFetching(false);
      });
  }, [debouncedSearchQuery]);

  return (
    <>
      <Header fixed>
        <Container>
          <SearchBar value={searchQuery} onChange={handleQueryChange} />
        </Container>
      </Header>
      <Container className='pt-1'>
        {photos.length > 0 ? (
          <PhotoList
            photos={photos}
            onPhotoClick={photo => setImageViewer({ open: true, image: photo })}
          />
        ) : (
          <span>
            {fetching
              ? `Getting some ${
                  debouncedSearchQuery ? `'${debouncedSearchQuery}' ` : ''
                }photos...`
              : `No results found${
                  debouncedSearchQuery ? ` for '${debouncedSearchQuery}'` : ''
                }.`}
          </span>
        )}
      </Container>
      <Backdrop
        open={imageViewer.open}
        onClick={() => setImageViewer(prev => ({ ...prev, open: false }))}
      >
        <ImageViewer src={imageViewer.image?.urls?.full} />
      </Backdrop>
    </>
  );
};

export default App;

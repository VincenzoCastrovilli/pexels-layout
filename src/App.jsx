import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [images, setImages] = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);

  async function getImages() {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await fetch(
        'https://api.pexels.com/v1/search?query=nature&per_page=3',
        {
          headers: {
            Authorization:
              '563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050',
          },
        }
      );
      const response = await data.json();
      const result = response.photos;
      setImages(result);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  const mainImage = images.map((item, index) => {
    if (index === activePhoto) {
      return (
        <>
          <div>{item.photographer}</div>
          <a href={item['photographer_url']}>{item['photographer_url']}</a>
          <img src={item.src.landscape} alt="" key={index} />
        </>
      );
    } else {
      return null;
    }
  });

  const thumbnails = images.map((item, index) => {
    return (
      <img
        src={item.src.tiny}
        alt=""
        key={index}
        onClick={() => {
          setActivePhoto(index);
        }}
      />
    );
  });

  return (
    <div className="container">
      <div className="image-picker">
        <button
          onClick={() => {
            setActivePhoto(0);
          }}
        >
          IMAGE 1
        </button>
        <button
          onClick={() => {
            setActivePhoto(1);
          }}
        >
          IMAGE 2
        </button>
        <button
          onClick={() => {
            setActivePhoto(2);
          }}
        >
          IMAGE 3
        </button>
      </div>
      {mainImage}
      {thumbnails}
    </div>
  );
}

import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const GEOLOCATION_KEY = 'geolocation';

export const clientGeolocation = async (): Promise<Coordinates> => {
  const storedGeolocation = localStorage.getItem(GEOLOCATION_KEY);
  if (storedGeolocation) {
    const { latitude, longitude } = JSON.parse(storedGeolocation);
    return { latitude, longitude };
  }

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          const geolocation = { latitude, longitude };
          localStorage.setItem(GEOLOCATION_KEY, JSON.stringify(geolocation));
          resolve(geolocation);
        },
        (error) => {
          axios
            .get('https://ipapi.co/json/')
            .then((response) => {
              const { latitude, longitude } = response.data;
              const geolocation = { latitude, longitude };
              localStorage.setItem(GEOLOCATION_KEY, JSON.stringify(geolocation));
              resolve(geolocation);
            })
            .catch(() => {
              reject(new Error('Location detection failed.'));
            });
        }
      );
    } else {
      axios
        .get('https://ipapi.co/json/')
        .then((response) => {
          const { latitude, longitude } = response.data;
          const geolocation = { latitude, longitude };
          localStorage.setItem(GEOLOCATION_KEY, JSON.stringify(geolocation));
          resolve(geolocation);
        })
        .catch(() => {
          reject(new Error('Location detection failed.'));
        });
    }
  });
};

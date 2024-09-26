/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAccessToken = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}
 
export const encodeData = (data: any): string => {
  const stringData = JSON.stringify(data);
  return encodeURIComponent(stringData);
};

export const decodeData = (encodedData: string): any => {
  try {
    const decodedString = decodeURIComponent(encodedData);
    return JSON.parse(decodedString);
  } catch (error: any) {
    console.error('Failed to decode data:', error);
    return null;
  }
};

export const getGenreByName = (categoryName: string) => {
  const data = {
    "k-drama": {
      id: 1,
      title: "드라마"
    },
    "k-movies": {
      id: 2,
      title: "영화"
    },
    "foreign": {
      id: 3,
      title: "국제 영화"
    },
    "animation-movies": {
      id: 4,
      title: "애니"
    },
    "entertainment": {
      id: 5,
      title: "음악프로"
    },
    "current-affairs-culture": {
      id: 6,
      title: "시사/다큐"
    }
  }

  if (data[categoryName as keyof typeof data]) {
    return data[categoryName as keyof typeof data];
  }
  return null;
}
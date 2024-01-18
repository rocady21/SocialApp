export const getFileNameFromUrl = (url) => {
    const path = url.split('/');
    return path[path.length - 1];
  };
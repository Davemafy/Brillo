const imageCache = new Set();

export const preloadImg = (src) => {
  if (imageCache.has(src)) return;
  
  const img = new Image();
  img.src = src;
  img.onload = () => imageCache.add(src);
};
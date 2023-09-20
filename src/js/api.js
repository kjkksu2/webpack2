export function getMotivationalPictures() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockedResponse = [
        "images/motivational-pictures/javascript.webp",
        "images/motivational-pictures/typescript.webp",
        "images/motivational-pictures/zoom.webp",
      ];

      resolve(mockedResponse);
    }, 7000);
  });
}

export function getAccessTokenInfo() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return;
  return accessToken;
}
export function getUserInfo() {
  const user = localStorage.getItem("userData");
  if (!user) return;
  return JSON.parse(user);
}

export const LoadToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const textEllipsisNewsTextShorter = (text) => {
  return text.length < 128 ? `${text}` : `${text.substring(0, 125)}...`;
};

export const textEllipsisCustom = (text, length) => {
  return text.length < length ? `${text}` : `${text.substring(0, 50)}...`;
};

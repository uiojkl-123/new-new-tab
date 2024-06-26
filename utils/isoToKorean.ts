export const isoToKorean = (iso?: string) => {
  if (!iso) return '';
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
};

export const compare = ( a, b ) => {
  if ( a.startTime < b.startTime ){
    return -1;
  }
  if ( a.startTime > b.startTime ){
    return 1;
  }
  return 0;
}
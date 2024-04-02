/**

@function
@name searchParam
@description 브라우저 URL의 search 부분에서 key 값에 해당하는 값을 반환합니다.
@param {string} key - search 부분에서 찾을 키 값
@returns {string | null} key에 해당하는 값을 반환합니다. 만약 값이 없을 경우 null을 반환합니다.
@example
searchParam('key'); // "value"
*/
function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

export default searchParam;

const DEFAULT_PAGE_LIMIT = 0; //returns all the records from db
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}
const directions = {
  ASC: 1,
  DESC: -1,
};
function getSorting(query) {
  const { sort, direction } = query;
  if(!sort){
      return {};
  }
  return{
      [sort]:directions[direction?.toUpperCase()] || directions.ASC
  }
}
module.exports = {
  getPagination,
  getSorting
};

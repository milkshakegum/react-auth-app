import cookie from 'react-cookies';

const initialOptions = { path: '/' };
function load(name) {
  return cookie.load(name);
}

function save(name, value, options = initialOptions) {
  return cookie.save(name, value, options);
}

function remove(name, options = initialOptions) {
  return cookie.remove(name, options);
}

export default { load, save, remove };

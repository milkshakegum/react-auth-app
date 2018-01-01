import cookie from 'react-cookies';


function load(name) {
  return cookie.load(name);
}

function save(name, value, options) {
  return cookie.save(name, value, options);
}

function remove(name, options) {
  return cookie.remove(name, options);
}

export default { load, save, remove };

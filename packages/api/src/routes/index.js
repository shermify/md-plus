import patients from './patients';
import doctors from './doctors';
import files from './files';

export default (router) => {
  patients(router);
  doctors(router);
  files(router);
};

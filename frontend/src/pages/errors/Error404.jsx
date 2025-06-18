import ErrorPage from '@components/main-components/ErrorPage';
import { MdError } from 'react-icons/md';
const Error404 = () => {
  return (
    <ErrorPage
      errorTitle="404"
      errorMessage="Запрашиваемый ресурс не найден."
      errorHint="Проверьте правильность URL или воспользуйтесь меню сайта."
      errorIcon={<MdError />}
    />
  );
};

export default Error404;

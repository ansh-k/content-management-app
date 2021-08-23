import { useTranslation } from "react-i18next";

const Header = (props: any) => {
  const { t } = useTranslation()
  return (
    <section className='text-center d-flex justify-content-center'>
      <button className='btn btn-secondary' onClick={() => props.history.push('/')}>
        {t('HOME')}
      </button>
      <h1>{t('APP_TITLE')}</h1>
    </section>
  );
}

export default Header;
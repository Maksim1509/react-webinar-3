import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    profile: state.profile.profile,
    waiting: state.profile.waiting,
  }));

  useInit(() => {
    if (!select.isAuth) return navigate('/login');
    store.actions.profile.load();
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <PageLayout head={<Header />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard profile={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);

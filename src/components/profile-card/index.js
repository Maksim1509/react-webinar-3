import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ profile, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profileTitle')}</h2>

      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profileName')}:</div>
        <div className={cn('value')}>{profile.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('phone')}:</div>
        <div className={cn('value')}>{profile.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{profile.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  t: (text) => text,
};

export default memo(ProfileCard);
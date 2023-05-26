import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination() {
  const cn = bem('Pagination');
  return (
    <div className={cn()}>
      <a className={cn('link', { active: true })}>1</a>
      <a className={cn('link')}>2</a>
      <a className={cn('link')}>3</a>
      <a className={cn('link')}>4</a>
      <a className={cn('points')}>...</a>
      <a className={cn('link')}>5</a>
    </div>
  );
}

export default Pagination;

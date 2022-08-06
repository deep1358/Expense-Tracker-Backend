import { Link } from 'react-router-dom';
import useStyles from './Breadcrumb.style.js';

const Breadcrumb = ({ crumbItems }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.breadcrumb}>
      {crumbItems.map((crumbItem, index) => (
        <div
          className={cx(classes.breadcrumbItem, {
            [classes.breadcrumbItemActive]: index === crumbItems.length - 1
          })}
          key={crumbItem.to}
        >
          <Link className={classes.breadcrumbItemLink} to={crumbItem.to}>
            {crumbItem.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;

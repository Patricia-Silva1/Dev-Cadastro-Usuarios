import { MyButton } from './styles';
import PropTypes from 'prop-types';

function Button({ children, variant = 'primary', ...props }) {
  return (
    <MyButton variant={variant} {...props}>
      {children}
    </MyButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;

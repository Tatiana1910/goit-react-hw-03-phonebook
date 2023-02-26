import { Label, Input } from './Filter.styled';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      Find contacts by name
      <Input
        name="filter"
        type="text"
        value={value}
        onChange={onChange}
      ></Input>
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

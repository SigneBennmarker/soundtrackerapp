
import useStyles from './styles'
import TextField from '@material-ui/core/TextField';


const TextInput = ({ label, value, setValue }) => {
  const classes = useStyles();

  return (
    <TextField className={classes.formStyle} id={label} label={label} value={value} required onChange={(e) => {
      setValue(e.target.value);
    }} />

  )

}

export default TextInput;

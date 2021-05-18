
import useStyles from './styles'
//import TextField from '@material-ui/core/TextField';


const TextInput = ({ label, value, setValue }) => {
  //const classes = useStyles();

  return (
    <input type="text" className="TextField" placeholder="Search for movie"
    label={label} value={value} required onChange={(e) => {
      setValue(e.target.value);
    }} />

  )

}

export default TextInput;

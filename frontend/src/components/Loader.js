import { CircularProgress} from '@mui/material';

const Loader = ({margin=60}) => {
  return (
      <div className={`flex justify-center items-center w-full my-${margin} `} >
          <CircularProgress color="warning" />
    </div>
  )
}
export default Loader;
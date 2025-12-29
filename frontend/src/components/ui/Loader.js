import { CircularProgress} from '@mui/material';

const Loader = () => {

  return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-97px)] " >
          <CircularProgress color="warning" />
    </div>
  )
}
export default Loader;
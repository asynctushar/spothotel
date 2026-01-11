import { Spinner } from '@/components/ui/spinner';

const Loader = () => {
    return (
        <div className='fixed inset-0 bg-background flex items-center justify-center z-50'>
            <Spinner className="size-6" />
        </div>
    );
};

export default Loader;
import { Facebook, Instagram, Podcast } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className='bg-secondary text-secondary-foreground border-t'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-2xl font-bold text-primary'>Spothotel</h4>
                        <h6 className='text-muted-foreground'>Your perfect stay, just a click away</h6>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='flex flex-col gap-3'>
                            <h5 className='font-semibold text-lg'>Company</h5>
                            <div className='flex flex-col gap-2'>
                                <Link to="" className='text-muted-foreground hover:text-primary transition-colors'>About Us</Link>
                                <Link to="" className='text-muted-foreground hover:text-primary transition-colors'>Contact Us</Link>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h5 className='font-semibold text-lg'>Legal</h5>
                            <div className='flex flex-col gap-2'>
                                <Link to="" className='text-muted-foreground hover:text-primary transition-colors'>Privacy Policy</Link>
                                <Link to="" className='text-muted-foreground hover:text-primary transition-colors'>Terms & Conditions</Link>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h5 className='font-semibold text-lg'>Socials</h5>
                            <div className='flex gap-3'>
                                <Link to="" className='w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group'>
                                    <Facebook className='w-5 h-5 text-primary group-hover:text-primary-foreground' />
                                </Link>
                                <Link to="" className='w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group'>
                                    <Instagram className='w-5 h-5 text-primary group-hover:text-primary-foreground' />
                                </Link>
                                <Link to="" className='w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group'>
                                    <Podcast className='w-5 h-5 text-primary group-hover:text-primary-foreground' />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <hr className='border-border' />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <div className='text-center'>
                    <span className='text-sm text-muted-foreground'>© 2023 - 2025 Spothotel. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
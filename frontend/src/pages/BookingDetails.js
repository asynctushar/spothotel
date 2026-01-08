import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import Loader from '../components/ui/Loader';
import NotFound from './NotFound';
import { format } from 'date-fns';
import Meta from '../utils/Meta';
import { useOwnBookingQuery } from '../redux/api/booking.api';

const BookingDetails = () => {
    const id = useParams().id;
    const { isLoading, data, isError, error } = useOwnBookingQuery(id);
    const [dates, setDates] = useState([]);
    const user = useSelector((state) => state.authState.user);
    const prices = data?.booking?.room.pricePerDay * dates?.length;
    const vat = data?.booking?.room.pricePerDay * dates?.length * (18 / 100);


    useEffect(() => {
        if (data && data?.booking) {
            const tempDates = data?.booking.dates.map((date) => format(new Date(date), 'yyyy-MM-dd'));
            setDates(tempDates);
        }
    }, [data]);

    return (
        <Fragment>
            <Meta title="Booking Details" />
            <Fragment>
                {isLoading ? <Loader /> : (
                    <Fragment>
                        {!data?.booking ? <NotFound /> : (
                            <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4 flex flex-col md:flex-row  md:justify-between">
                                <div className="flex flex-col items-center">
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium md:mt-5 mb-4">Your details:</h2>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="name" className="font-medium w-16">Name:</label>
                                            <input value={user?.name} disabled={true} id="name" type="text" className="outline-none py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400 text-gray-700 font-mono" />
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="email" className="font-medium w-16">Email:</label>
                                            <input value={user?.email} id="email" type="email" className="outline-none py-2 px-1 sm:px-2  rounded-md border border-solid border-gray-400 text-gray-700 font-mono" disabled={true} />
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="phone" className="font-medium w-16">Mobile:</label>
                                            <input value={data?.booking?.phone} disabled={true} placeholder="Your phone number" id="phone" type="number" className="outline-none py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400  font-mono" />
                                        </div>
                                    </div>
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium mb-4 mt-16">Room details:</h2>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Hotel Name:</span>
                                            <Link to={`/hotels/${data?.booking?.hotel._id}`} className="font-mono text-blue-700">{data?.booking?.hotel.name}</Link>
                                        </div>
                                        <div className="ml-8 flex  mb-4">
                                            <span className="font-medium inline-block  w-28">Room Name:</span>
                                            <span className="font-mono">{data?.booking?.room.name}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Room No:</span>
                                            <span className="font-mono">{data?.booking?.room.number}</span>
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <span className="font-medium inline-block  w-28">Room Type:</span>
                                            <span className="font-mono">{data?.booking?.room.type}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28">Price(per day):</span>
                                            <span className="font-mono">{data?.booking?.room.pricePerDay} taka</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center" >
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium mb-4 mt-16 md:mt-5">Booking details:</h2>
                                        <div className="ml-8 flex  mb-4">
                                            <span className="font-medium inline-block  w-28">Room ID:</span>
                                            <span className="font-mono break-all">{data?.booking?.room._id}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28"> Status:</span>
                                            <span className="font-mono">{data?.booking?.status}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Dates:</span>
                                            <textarea value={dates?.toString()} disabled={true} id="phone" rows={dates.length + 1} cols={10} className="py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400 text-gray-700 font-mono break-all resize-none" />
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Price({dates?.length}):</span>
                                            <span className="font-mono">{prices} taka</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Vat:</span>
                                            <span className="font-mono">{vat} taka</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28">Total Price:</span>
                                            <span className="font-mono">{data?.booking?.totalPrice} taka</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28"> Paid:</span>
                                            <span className="font-mono">{data?.booking?.paymentInfo.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                )}
            </Fragment>
        </Fragment>
    );
};
export default BookingDetails;
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { BiMap } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { DateRangePicker, DateRange } from 'react-date-range';
import { useState } from 'react';

const Home = () => {
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])


    const handleDate = (item) => {
        setDate([item.selection])
    }

    return (
        <div className="mx-auto px-4 md:px-10 lg:px-20 mt-4">
            <h1 className="text-3xl text-grey-400">Where to?</h1>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className=" md:w-4/12">
                    <label htmlFor="search" className="h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400" >
                        <BiMap className="text-red-400 text-xl" />
                        <div className="flex flex-col">
                            <span >Going to</span>
                            <span className="text-gray-600 text-sm hidden">Barishal</span>
                        </div>
                    </label>
                    <input type="checkbox" id="search" className="modal-toggle" />
                    <label htmlFor="search" className="modal cursor-pointer">
                        <label className="modal-box" htmlFor="">
                            <div className="h-96">
                                <label htmlFor="search">
                                    <IoMdClose className="rounded-full text-3xl text-red-500 cursor-pointer hover:bg-neutral-200 p-1 transition duration-200 mb-2" />
                                </label>
                                <input type="text" placeholder="Going to" className=" outline-none bg-transparent w-full border-b border-gray-400 border-solid py-2 px-4 mt-4" />
                                <div className="mt-12 flex flex-col items-center">
                                    <label htmlFor="search" className="cursor-pointer">
                                        <ImSearch className="text-4xl" />
                                    </label>
                                    <p className="mt-5 text-gray-600">Search by destination</p>
                                </div>
                            </div>
                        </label>
                    </label>
                </div>
                <div className=" md:w-4/12">
                    <label htmlFor="date" className="h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400">
                        <MdDateRange className="text-red-400 text-xl" />
                        <div className="flex flex-col">
                            <span >Dates</span>
                            <span className="text-gray-600 text-sm">Jan 22 - Jan 25</span>
                        </div>
                    </label>
                    <input type="checkbox" id="date" className="modal-toggle" />
                    <label htmlFor="date" className="modal cursor-pointer">
                        <label className="modal-box max-w-screen min-w-full md:min-w-fit" htmlFor="" >
                            <label htmlFor="date">
                                <IoMdClose className="rounded-full text-3xl text-red-500 cursor-pointer hover:bg-neutral-200 p-1 transition duration-200 mb-2" />
                            </label>
                            <DateRange
                                className="w-full"
                                ranges={date}
                                onChange={(item) => handleDate(item)}
                            />
                            <div className="flex justify-center">
                                <label htmlFor="date" className="btn btn-block rounded-full btn-primary mt-20 mb-2" >Done</label>
                            </div>
                        </label>
                    </label>
                </div>
                <div className=" md:w-4/12">
                    <label htmlFor="person" className="h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400 ">
                        <MdDateRange className="text-red-400 text-xl" />
                        <div className="flex flex-col">
                            <span >Travellers</span>
                            <span className="text-gray-600 text-sm">2 travellers, 1 room</span>
                        </div>
                    </label>
                    <input type="checkbox" id="person" className="modal-toggle" />
                    <label htmlFor="person" className="modal cursor-pointer">
                        <label className="modal-box" htmlFor="">
                            <label htmlFor="person">
                                <IoMdClose className="rounded-full text-3xl text-red-500 cursor-pointer hover:bg-neutral-200 p-1 transition duration-200 mb-2" />
                            </label>
                            <h4 className="text-2xl text-gray-800">Travellers</h4>
                            <div className="flex justify-between items-center my-5">
                                <h5 className=" text-xl text-gray-700 ">Person: </h5>
                                <div className="flex justify-end items-center gap-2">
                                    <button type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">+</button>
                                    <span>{5}</span>
                                    <button type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">-</button>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center my-5">
                                <h5 className="text-xl text-gray-700">Room: </h5>
                                <div className="flex justify-end items-center gap-2">
                                    <button type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">+</button>
                                    <span>{5}</span>
                                    <button type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">-</button>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <label htmlFor="person" className="btn btn-wide rounded-full btn-primary mt-20 mb-2" >Done</label>
                            </div>
                        </label>
                    </label>
                </div>
            </div>
            <div>
                search result
            </div>
        </div >
    )
}
export default Home;
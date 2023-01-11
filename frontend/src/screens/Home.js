import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Modal } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DateRange } from 'react-date-range';
import { useRef, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, format } from 'date-fns';

const Home = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isPersonOpen, setIsPersonOpen] = useState(false)
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection',
    }]);
    const [travellers, setTravellers] = useState({ room: 1, person: 2 })
    const searchRef = useRef();

    const dateRangeHanler = (item) => {
        setDateRange([item.selection]);
    }

    const searchHandler = () => {
        if (searchRef.current.value.length < 1) return;

        setKeyword(searchRef.current.value);
        setIsSearchOpen(!isSearchOpen);

        console.log(keyword)
        console.log(dateRange)
        console.log(travellers)
    }

    const travellersHandler = () => {
        setIsPersonOpen(!isPersonOpen);
    }

    return (
        <div className="mx-auto px-4 md:px-10 lg:px-20 mt-4">

            <h1 className="text-3xl text-grey-400">Where to?</h1>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:w-4/12 h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400" >
                    < FmdGoodIcon className="text-red-400 text-xl" />
                    <div className="flex flex-col">
                        <span >Going to</span>
                        <span className="text-gray-600 text-sm">{keyword}</span>
                    </div>
                </div>
                <Modal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} className="flex justify-center items-center">
                    <div className=" w-full md:w-2/3 h-full md:h-2/3 bg-white md:rounded-lg">
                        <CloseIcon fontSize="large" onClick={() => setIsSearchOpen(false)} className="rounded-full text-red-500 cursor-pointer hover:bg-neutral-200 transition duration-200 p-1 m-2" />
                        <input onKeyUp={(e) => e.key === "Enter" && searchHandler()} ref={searchRef} type="text" placeholder="Going to" className=" outline-none bg-transparent w-full border-b border-gray-400 border-solid py-2 px-4 mt-4" />
                        <div className="mt-12 flex flex-col items-center">
                            <div className="cursor-pointer text-5xl" onClick={searchHandler}>
                                <SearchIcon fontSize="inherit" />
                            </div>
                            <p className="mt-5 text-gray-600">Search by destination</p>
                        </div>
                    </div>
                </Modal>
                <div open={isDateOpen} onClick={() => setIsDateOpen(!isDateOpen)} className="md:w-4/12 h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400">
                    <DateRangeIcon className="text-red-400 text-xl" />
                    <div className="flex flex-col">
                        <span >Dates</span>
                        <span className="text-gray-600 text-sm">{format(dateRange[0].startDate, 'MMM dd')} - {format(dateRange[0].endDate, 'MMM dd')}</span>
                    </div>
                </div>
                <Modal open={isDateOpen} onClose={() => setIsDateOpen(false)} className="flex justify-center items-center mb-20">
                    <div className="flex flex-col bg-white h-96">
                        <CloseIcon fontSize="large" onClick={() => setIsDateOpen(false)} className="rounded-full text-red-500 cursor-pointer hover:bg-neutral-200 transition duration-200 p-1 m-2" />
                        <DateRange
                            onChange={dateRangeHanler}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            className="sm:p-12"
                        />
                    </div>
                </Modal>
                <div onClick={() => setIsPersonOpen(!isPersonOpen)} className="md:w-4/12 h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400 ">
                    <PersonIcon className="text-red-400 text-xl" />
                    <div className="flex flex-col">
                        <span >Travellers</span>
                        <span className="text-gray-600 text-sm">{travellers.person} travellers, {travellers.room} room</span>
                    </div>
                </div>
                <Modal open={isPersonOpen} onClose={() => setIsPersonOpen(false)} className="flex justify-center items-center">
                    <div className="w-full md:w-2/3 h-full md:h-2/3 bg-white md:rounded-lg">
                        <CloseIcon fontSize="large" onClick={() => setIsPersonOpen(false)} className="rounded-full text-red-500 cursor-pointer hover:bg-neutral-200 transition duration-200 p-1 m-2" />
                        <h4 className="text-2xl text-gray-800 px-6 mt-6">Travellers</h4>
                        <div className="flex justify-between items-center my-5 px-8">
                            <h5 className=" text-xl text-gray-700 ">Person: </h5>
                            <div className="flex justify-end items-center gap-2">
                                <button onClick={() => setTravellers({ ...travellers, person: travellers.person + 1 })} type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">+</button>
                                <span>{travellers.person}</span>
                                <button disabled={travellers.person === 1} onClick={() => setTravellers({ ...travellers, person: travellers.person - 1 })} type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">-</button>
                            </div>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center my-5 px-8">
                            <h5 className="text-xl text-gray-700">Room: </h5>
                            <div className="flex justify-end items-center gap-2">
                                <button onClick={() => setTravellers({ ...travellers, room: travellers.room + 1 })} type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">+</button>
                                <span>{travellers.room}</span>
                                <button disabled={travellers.room === 1} onClick={() => setTravellers({ ...travellers, room: travellers.room - 1 })} type="button" className=" border border-stone-800 hover:border-red-500 border-solid w-8 rounded-full text-2xl">-</button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-36">
                            <Button variant="contained" className="w-72 h-12 " onClick={travellersHandler}>Done</Button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div>
            </div>
        </div >
    )
}
export default Home;
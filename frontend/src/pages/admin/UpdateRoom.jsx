import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { Bed, Hash, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRoomQuery, useUpdateRoomMutation } from '@/redux/api/room.api';
import { useDispatch } from 'react-redux';
import { setError } from '@/redux/slices/app.slice';
import UpdateRoomLoader from '@/components/room/UpdateRoomLoader';

const availableSpecifications = [
    "Air Conditioning",
    "Private Bathroom",
    "Flat-Screen TV",
    "Balcony / City View",
];

const availableType = ['Single', 'Double', 'Family'];

const UpdateRoom = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [specification, setSpecification] = useState([]);
    const [errors, setErrors] = useState({ name: '', price: '', type: '' });

    const { isLoading, data, isError: isRoomError, error: roomError } = useRoomQuery(id);
    const [updateRoom, { isLoading: isUpdating, isSuccess, isError, error }] = useUpdateRoomMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.room) {
            setName(data.room.name);
            setNumber(data.room.number);
            setPrice(data.room.pricePerDay);
            setType(data.room.type);
            setSpecification(data.room.specification || []);
        }
    }, [data]);

    useEffect(() => {
        if (data && isSuccess) {
            navigate(`/admin/hotels/${data.room.hotel._id}/rooms`);
        }
    }, [isSuccess, data, navigate]);

    useEffect(() => {
        if (isError) {
            dispatch(setError(error.data?.message));
        }

        if (isRoomError) {
            dispatch(setError(roomError.data?.message));

        }
    }, [isError, error, isRoomError, roomError, dispatch]);

    const validateForm = () => {
        const newErrors = { name: '', price: '', type: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Room name is required';
            isValid = false;
        }

        if (!price || isNaN(price) || Number(price) <= 0) {
            newErrors.price = 'Must be a valid positive amount';
            isValid = false;
        }

        if (!type) {
            newErrors.type = 'Room type is required';
            isValid = false;
        }

        if (specification.length < 1) {
            newErrors.specification = 'At least one specification required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSpecificationToggle = (spec) => {
        setSpecification(prev =>
            prev.includes(spec)
                ? prev.filter(s => s !== spec)
                : [...prev, spec]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = {
            name,
            pricePerDay: Number(price),
            specification,
            type
        };

        updateRoom({ formData, id });
    };


    return (
        <Fragment>
            <Meta
                title=""
                description=""
                keywords=""
            />
            {isLoading ? <UpdateRoomLoader /> : !data?.room ? (
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center items-center min-h-[70vh]">
                    <div className="text-center py-16 ">
                        <h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
                        <p className="text-muted-foreground mb-6">The room you're looking for doesn't exist</p>
                        <Button className="cursor-pointer" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 md:items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Update Room</h1>
                            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Modify room information for {data.room.hotel.name}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-3 items-center">
                                <span className="font-semibold text-foreground/75 text-sm">Hotel Name:</span>
                                <Link to={`/hotels/${data.room.hotel._id}`} className="text-primary hover:underline font-medium text-sm">
                                    {data.room.hotel.name}
                                </Link>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="font-semibold text-foreground/75 text-sm">Room ID:</span>
                                <span className="font-mono text-xs">{id}</span>
                            </div>
                        </div>
                    </div>

                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Bed className="w-5 h-5" />
                                Room Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {/* Room Name */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-sm">Room Name</Label>
                                    <div className="relative">
                                        <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Deluxe Suite"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setErrors({ ...errors, name: '' });
                                            }}
                                            className="pl-9 h-9"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                {/* Room Number & Price */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="number" className="text-sm">Room Number</Label>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="number"
                                                type="number"
                                                value={number}
                                                disabled
                                                className="pl-9 h-9 cursor-not-allowed opacity-60"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Room number cannot be changed</p>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="price" className="text-sm">Price Per Day</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="5000"
                                                value={price}
                                                onChange={(e) => {
                                                    setPrice(e.target.value);
                                                    setErrors({ ...errors, price: '' });
                                                }}
                                                className="pl-9 h-9"
                                            />
                                        </div>
                                        {errors.price && (
                                            <p className="text-xs text-destructive">{errors.price}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Room Type */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="type" className="text-sm">Room Type</Label>
                                    <Select value={type} onValueChange={(value) => {
                                        setType(value);
                                        setErrors({ ...errors, type: '' });
                                    }}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select room type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableType.map((t) => (
                                                <SelectItem key={t} value={t}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-xs text-destructive">{errors.type}</p>
                                    )}
                                </div>

                                {/* Specifications */}
                                <div className="space-y-2">
                                    <Label className="text-sm">Specifications</Label>
                                    <div className="p-3 border rounded-lg bg-muted/30">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                                            {availableSpecifications.map((spec) => (
                                                <div key={spec} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={spec}
                                                        checked={specification.includes(spec)}
                                                        onCheckedChange={() => handleSpecificationToggle(spec)}
                                                    />
                                                    <Label
                                                        htmlFor={spec}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {spec}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {errors.specification && (
                                        <p className="text-xs text-destructive">{errors.specification}</p>
                                    )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 cursor-pointer h-9"
                                        onClick={() => navigate(`/admin/hotels/${data.room.hotel._id}/rooms`)}
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        className="flex-1 cursor-pointer h-9"
                                        disabled={isUpdating}
                                        onClick={handleSubmit}
                                    >
                                        {isUpdating ? "Updating..." : "Update Room"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Fragment>
    );
};

export default UpdateRoom;;;
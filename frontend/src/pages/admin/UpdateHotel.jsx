import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Hotel, MapPin, Navigation, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHotelQuery, useUpdateHotelMutation } from '@/redux/api/hotel.api';
import { useDispatch } from 'react-redux';
import { setError } from '@/redux/slices/app.slice';
import UpdateHotelLoader from '@/components/hotel/UpdateHotelLoader';

const availableSpecifications = [
    "Car Parking",
    "Restaurant",
    "Free Wi-fi"
];

const UpdateHotel = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState([]);
    const [featured, setFeatured] = useState(false);
    const [errors, setErrors] = useState({ name: '', location: '', distance: '', description: '' });

    const { isLoading, data } = useHotelQuery(id);
    const [updateHotel, { isLoading: isUpdating, isSuccess, isError, error }] = useUpdateHotelMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.hotel) {
            setName(data.hotel.name);
            setLocation(data.hotel.location);
            setDistance(data.hotel.distance);
            setDescription(data.hotel.description);
            setSpecification(data.hotel.specification || []);
            setFeatured(data.hotel.featured || false);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/hotels');
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            dispatch(setError(error.data?.message));
        }
    }, [isError, error, dispatch]);

    const validateForm = () => {
        const newErrors = { name: '', location: '', distance: '', description: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Hotel name is required';
            isValid = false;
        }

        if (!location.trim()) {
            newErrors.location = 'Location is required';
            isValid = false;
        }

        if (!distance.trim()) {
            newErrors.distance = 'Distance is required';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        } else if (description.trim().length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
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
            location,
            distance,
            description,
            specification,
            featured
        };

        updateHotel({ formData, id });
    };

    if (isLoading) {
        return <UpdateHotelLoader />;
    }

    if (!data?.hotel) {
        return (
            <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold mb-3">Hotel Not Found</h2>
                    <p className="text-foreground/75 mb-6">
                        The hotel you're trying to update for doesn't exist or may have been removed.
                    </p>
                    <Link to="/admin/hotels">
                        <Button>View All Hotels</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Update Hotel</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Modify hotel information</p>
            </div>

            <Card className="shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Hotel className="w-5 h-5" />
                        Hotel Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {/* Hotel Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-sm">Hotel Name</Label>
                            <div className="relative">
                                <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Grand Plaza Hotel"
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

                        {/* Location & Distance */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="location" className="text-sm">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="location"
                                        type="text"
                                        placeholder="Dhaka, Bangladesh"
                                        value={location}
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                            setErrors({ ...errors, location: '' });
                                        }}
                                        className="pl-9 h-9"
                                    />
                                </div>
                                {errors.location && (
                                    <p className="text-xs text-destructive">{errors.location}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="distance" className="text-sm">Distance</Label>
                                <div className="relative">
                                    <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="distance"
                                        type="text"
                                        placeholder="e.g. 2 km from downtown"
                                        value={distance}
                                        onChange={(e) => {
                                            setDistance(e.target.value);
                                            setErrors({ ...errors, distance: '' });
                                        }}
                                        className="pl-9 h-9"
                                    />
                                </div>
                                {errors.distance && (
                                    <p className="text-xs text-destructive">{errors.distance}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="text-sm">Description</Label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Textarea
                                    id="description"
                                    placeholder="Describe the hotel, its amenities, and what makes it special..."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        setErrors({ ...errors, description: '' });
                                    }}
                                    className="pl-9 min-h-24 resize-none text-sm"
                                    rows={4}
                                />
                            </div>
                            {errors.description && (
                                <p className="text-xs text-destructive">{errors.description}</p>
                            )}
                        </div>

                        {/* Specifications */}
                        <div className="space-y-2">
                            <Label className="text-sm">Specifications</Label>
                            <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
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
                            {errors.specification && (
                                <p className="text-xs text-destructive">{errors.specification}</p>
                            )}
                        </div>

                        {/* Featured */}
                        <div className="flex items-start space-x-2 p-3 border rounded-lg bg-muted/30">
                            <Checkbox
                                id="featured"
                                checked={featured}
                                onCheckedChange={setFeatured}
                                className="mt-0.5"
                            />
                            <div className="space-y-0.5">
                                <Label
                                    htmlFor="featured"
                                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Mark as Featured Hotel
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Featured hotels will be highlighted on the homepage
                                </p>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 cursor-pointer h-9"
                                onClick={() => navigate(-1)}
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
                                {isUpdating ? "Updating..." : "Update Hotel"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateHotel;
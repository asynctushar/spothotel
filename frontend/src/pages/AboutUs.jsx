import { Fragment } from 'react';
import { Target, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Meta from '@/components/shared/Meta';

const AboutUs = () => {
    return (
        <Fragment>
            <Meta
                title="About Us"
                description="Learn about SpotHotel - your trusted partner for finding and booking the perfect hotel accommodation."
                keywords="about spothotel, hotel booking platform, accommodation service"
            />
            <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About SpotHotel</h1>
                        <p className="text-lg text-muted-foreground">
                            Your trusted partner in finding the perfect stay
                        </p>
                    </div>

                    <Card className="mb-8 shadow-md border-0">
                        <CardContent className="p-6 sm:p-8">
                            <div className="prose prose-slate max-w-none">
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Welcome to SpotHotel, your premier destination for discovering and booking exceptional hotel accommodations. We are dedicated to making your travel experience seamless, comfortable, and memorable.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Founded with a vision to simplify hotel bookings, SpotHotel connects travelers with a curated selection of quality hotels worldwide. Whether you're planning a business trip, family vacation, or romantic getaway, we're here to help you find your perfect home away from home.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card className="shadow-md border-0">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Target className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                                        <p className="text-sm text-muted-foreground">
                                            To provide travelers with easy access to quality accommodations at competitive prices, ensuring every journey is comfortable and stress-free.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-0">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Award className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Our Vision</h3>
                                        <p className="text-sm text-muted-foreground">
                                            To become the most trusted hotel booking platform globally, known for reliability, transparency, and exceptional customer service.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-md border-0">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">Why Choose Us?</h3>
                                </div>
                            </div>
                            <ul className="space-y-3 ml-16">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span className="text-muted-foreground">Wide selection of verified hotels across multiple destinations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span className="text-muted-foreground">Transparent pricing with no hidden fees</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span className="text-muted-foreground">Secure booking process with instant confirmation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span className="text-muted-foreground">24/7 customer support for your peace of mind</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span className="text-muted-foreground">User-friendly platform for effortless browsing and booking</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default AboutUs;
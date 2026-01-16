import { Link } from 'react-router';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Fragment } from 'react';
import Meta from '@/components/shared/Meta';

const NotFound = () => {
    return (
        <Fragment>
            <Meta
                title=""
                description=""
                keywords=""
            />
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-lg border-0">
                    <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-2">404</h1>

                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                            Page Not Found
                        </h2>

                        <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 px-2">
                            The page you're looking for doesn't exist or has been moved.
                            Let's get you back on track!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                            <Button className="cursor-pointer w-full sm:w-auto" asChild>
                                <Link to="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Go Home
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Fragment>
    );
};

export default NotFound;
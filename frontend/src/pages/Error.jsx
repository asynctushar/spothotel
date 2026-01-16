import { useRouteError, Link } from 'react-router';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Meta from '@/components/shared/Meta';
import { Fragment } from 'react';

const Error = () => {
    const error = useRouteError();
    const is404 = error?.status === 404;

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
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                            {is404 ? '404' : 'Oops!'}
                        </h1>

                        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                            {is404 ? 'Page Not Found' : 'Something Went Wrong'}
                        </h2>

                        <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 px-2">
                            {is404
                                ? "The page you're looking for doesn't exist or has been moved."
                                : error?.message || "An unexpected error occurred. Please try again."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                            <Button
                                variant="outline"
                                className="cursor-pointer w-full sm:w-auto"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh Page
                            </Button>
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

export default Error;
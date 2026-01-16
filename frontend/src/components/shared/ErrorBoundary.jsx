import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Fragment } from 'react';
import Meta from './Meta';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
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
                                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
                                    </div>
                                </div>

                                <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                                    Something Went Wrong
                                </h1>

                                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 px-2">
                                    An unexpected error occurred. This has been logged and we'll look into it.
                                </p>

                                {process.env.NODE_ENV === 'development' && this.state.error && (
                                    <details className="mb-5 sm:mb-6 text-left">
                                        <summary className="cursor-pointer text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-2">
                                            Error Details (Dev Only)
                                        </summary>
                                        <pre className="text-xs bg-muted p-2 sm:p-3 rounded overflow-auto max-h-32 sm:max-h-40">
                                            {this.state.error.toString()}
                                            {this.state.errorInfo?.componentStack}
                                        </pre>
                                    </details>
                                )}

                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer w-full sm:w-auto"
                                        onClick={() => window.location.reload()}
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Refresh Page
                                    </Button>
                                    <Button
                                        className="cursor-pointer w-full sm:w-auto"
                                        onClick={this.handleReset}
                                    >
                                        <Home className="w-4 h-4 mr-2" />
                                        Go Home
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Fragment>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;;
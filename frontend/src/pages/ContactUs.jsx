import { Fragment, useState } from 'react';
import { Mail, User, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateEmail } from '@/lib/validations';
import { sendContactMessage } from '@/services/contact.service';
import Meta from '@/components/shared/Meta';
import { setError, setSuccess } from '@/redux/slices/app.slice';
import { useDispatch } from 'react-redux';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        } else if (message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await sendContactMessage({ name, email, message });
            dispatch(setSuccess('Message sent successfully! We\'ll get back to you soon.'));
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to send message. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Meta
                title="Contact Us"
                description="Get in touch with SpotHotel. We're here to help with your questions, bookings, and inquiries."
                keywords="contact spothotel, customer support, hotel booking help"
            />
            <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Contact Us</h1>
                        <p className="text-lg text-muted-foreground">
                            Have questions? We'd love to hear from you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                        <Card className="shadow-sm border-0">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                                <p className="text-sm text-muted-foreground">tusarbiswas888@gmail.com</p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-0">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                                <p className="text-sm text-muted-foreground">+880 1705520909</p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-0">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Address</h3>
                                <p className="text-sm text-muted-foreground">Barishal, Bangladesh</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-md border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Send Us a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setErrors({ ...errors, name: '' });
                                            }}
                                            className="pl-10"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors({ ...errors, email: '' });
                                            }}
                                            className="pl-10"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us how we can help you..."
                                            value={message}
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                                setErrors({ ...errors, message: '' });
                                            }}
                                            className="pl-10 min-h-32 resize-none"
                                            rows={5}
                                        />
                                    </div>
                                    {errors.message && (
                                        <p className="text-sm text-destructive">{errors.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="button"
                                    className="w-full cursor-pointer"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default ContactUs;
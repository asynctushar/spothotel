import { Fragment } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Meta from '@/components/shared/Meta';

const TermsConditions = () => {
    return (
        <Fragment>
            <Meta
                title="Terms & Conditions"
                description="Read SpotHotel's terms and conditions for using our hotel booking platform."
                keywords="terms, conditions, user agreement, booking terms"
            />
            <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
                        <p className="text-muted-foreground">Last updated: January 2026</p>
                    </div>

                    <Card className="shadow-md border-0">
                        <CardContent className="p-6 sm:p-8 space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    By accessing and using SpotHotel, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">2. Booking Policy</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    All bookings made through SpotHotel are subject to availability and confirmation. We reserve the right to refuse or cancel any booking at our discretion.
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="text-muted-foreground">• Bookings must be made by individuals 18 years or older</li>
                                    <li className="text-muted-foreground">• Payment must be completed at the time of booking</li>
                                    <li className="text-muted-foreground">• Booking confirmation will be sent via email</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">3. Cancellation Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cancellation policies vary by hotel and booking type. Please review the specific cancellation terms before completing your booking. Cancellation fees may apply based on the hotel's policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">4. Payment Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    All prices are displayed in the local currency and include applicable taxes unless otherwise stated. Payment is processed securely through our payment partners. We accept major credit cards and other payment methods as indicated during checkout.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">5. User Responsibilities</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">Users agree to:</p>
                                <ul className="space-y-2 ml-6">
                                    <li className="text-muted-foreground">• Provide accurate and complete information</li>
                                    <li className="text-muted-foreground">• Maintain the confidentiality of account credentials</li>
                                    <li className="text-muted-foreground">• Comply with all applicable laws and regulations</li>
                                    <li className="text-muted-foreground">• Respect hotel property and policies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    SpotHotel acts as an intermediary between users and hotels. We are not liable for the quality, safety, or legality of hotels listed, nor for the ability of hotels to provide services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">7. Modifications to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the modified terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact Information</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    For questions about these Terms & Conditions, please contact us at support@spothotel.com
                                </p>
                            </section>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default TermsConditions;
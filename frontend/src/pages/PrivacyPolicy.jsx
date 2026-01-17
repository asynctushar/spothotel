import { Fragment } from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Meta from '@/components/shared/Meta';

const PrivacyPolicy = () => {
    return (
        <Fragment>
            <Meta
                title="Privacy Policy"
                description="Learn how SpotHotel collects, uses, and protects your personal information."
                keywords="privacy policy, data protection, user privacy, information security"
            />
            <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: January 2026</p>
                    </div>

                    <Card className="shadow-md border-0">
                        <CardContent className="p-6 sm:p-8 space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="text-muted-foreground">• Personal information (name, email, phone number)</li>
                                    <li className="text-muted-foreground">• Payment information (processed securely by our payment partners)</li>
                                    <li className="text-muted-foreground">• Booking history and preferences</li>
                                    <li className="text-muted-foreground">• Communication records with our support team</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    We use the information we collect to:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="text-muted-foreground">• Process your bookings and provide customer support</li>
                                    <li className="text-muted-foreground">• Send booking confirmations and updates</li>
                                    <li className="text-muted-foreground">• Improve our services and user experience</li>
                                    <li className="text-muted-foreground">• Comply with legal obligations</li>
                                    <li className="text-muted-foreground">• Send promotional communications (with your consent)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We share your information only with hotels you book with, payment processors, and service providers who assist in operating our platform. We do not sell your personal information to third parties.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies and Tracking</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    You have the right to:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="text-muted-foreground">• Access your personal information</li>
                                    <li className="text-muted-foreground">• Correct inaccurate data</li>
                                    <li className="text-muted-foreground">• Request deletion of your data</li>
                                    <li className="text-muted-foreground">• Opt-out of marketing communications</li>
                                    <li className="text-muted-foreground">• Data portability</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">7. Children's Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to Privacy Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated revision date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about this Privacy Policy or how we handle your data, please contact us at privacy@spothotel.com
                                </p>
                            </section>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default PrivacyPolicy;
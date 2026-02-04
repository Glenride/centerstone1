import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function WaitlistForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // We split the name into first/last for the UI but combine for the backend if needed
        // Or if the backend expects 'name', we just pass it directly.
        // Given the UI had First/Last, we can concatenate them or just use a single Name field.
        // Let's stick to the UI design (First/Last) but map it to 'name' for standard Laravel auth.
        // Wait, standard Laravel Breeze/Fortify uses 'name'. 
        // Let's simplify and just use 'Name' to match the backend expectation 
        // OR concatenate them before submit. Concatenation is cleaner for the UI.

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex flex-col space-y-2 text-center">
                    <span className="text-4xl font-serif">1.</span>
                    <h3 className="text-2xl font-serif font-semibold leading-none tracking-tight">
                        Let's Get You Started
                    </h3>
                </div>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Enter your full name..."
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="Enter your email..."
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="******"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirm</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="******"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" type="button" onClick={() => window.history.back()}>
                            ← Previous
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Joining...' : 'Join Waitlist →'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

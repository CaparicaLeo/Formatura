import GuestLayout from '@/Layouts/GuestLayout';
import TerminalHeader from '@/Components/TerminalHeader';
import SobreEvento from '@/Components/SobreEvento';
import RsvpForm from '@/Components/RsvpForm';
import Programacao from '@/Components/Programacao';
import Footer from '@/Components/Footer';
import { Head, useForm } from '@inertiajs/react';

export default function Confirmar({ event }) {
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        companions: [],
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('confirmations.store'));
    };

    const addCompanion = () => {
        form.setData('companions', [...form.data.companions, '']);
    };

    const removeCompanion = (index) => {
        form.setData(
            'companions',
            form.data.companions.filter((_, i) => i !== index),
        );
    };

    const updateCompanion = (index, value) => {
        const updated = [...form.data.companions];
        updated[index] = value;
        form.setData('companions', updated);
    };

    return (
        <GuestLayout>
            <Head title="Confirmar Presenca" />

            <TerminalHeader event={event} />

            <div className="px-6 md:px-12">
                <div className="border-t border-border" />
            </div>

            <SobreEvento />

            <div className="px-6 md:px-12">
                <div className="border-t border-border" />
            </div>

            <RsvpForm
                form={form}
                submit={submit}
                addCompanion={addCompanion}
                removeCompanion={removeCompanion}
                updateCompanion={updateCompanion}
            />

            <div className="px-6 md:px-12">
                <div className="border-t border-border" />
            </div>

            <Programacao />

            <div className="px-6 md:px-12">
                <div className="border-t border-border" />
            </div>

            <Footer />
        </GuestLayout>
    );
}

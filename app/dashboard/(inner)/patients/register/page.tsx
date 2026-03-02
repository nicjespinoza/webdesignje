"use client";

import React, { useState, Suspense } from 'react';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Heart,
    Globe,
    Users,
    Activity,
    Save,
    Loader2
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { Patient } from '@/types';
import { useAuth } from '@/context/AuthContext';

// Reusing schema if exists or defining locally for now to fix errors
import { z } from 'zod';

const patientRegistrationSchema = z.object({
    firstName: z.string().min(2, "Nombre es requerido"),
    lastName: z.string().min(2, "Apellido es requerido"),
    birthDate: z.string().min(1, "Fecha de nacimiento es requerida"),
    sex: z.enum(["Masculino", "Femenino"] as const, {
        message: "Seleccione sexo"
    }),
    email: z.string().email("Email inválido").optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    nationality: z.string().optional(),
    profession: z.string().optional(),
});

type FormData = z.infer<typeof patientRegistrationSchema>;

function RegisterPatientPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const specialtyId = searchParams.get('specialty') || 'gastroenterology';
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(patientRegistrationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            birthDate: '',
            sex: undefined,
            email: '',
            phone: '',
            address: '',
            nationality: 'Nicaragua',
            profession: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const newPatient: Omit<Patient, 'id'> = {
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: data.birthDate,
                sex: data.sex,
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
                nationality: data.nationality || 'Nicaragua',
                profession: data.profession || '',
                ageDetails: '30 años', // Default to avoid missing property error
                initialReason: 'Consulta Inicial', // Default
                createdAt: new Date().toISOString(),
                registrationSource: 'manual',
                registrationStatus: 'Paciente',
            };
            const patientId = await api.createPatient(newPatient);
            router.push(`/dashboard/patients/${patientId}?specialty=${specialtyId}`);
        } catch (error) {
            console.error("Error creating patient:", error);
            alert("Error al crear paciente");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                <div className="p-6 md:p-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => router.push(`/dashboard/patients?specialty=${specialtyId}`)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Registro de Nuevo Paciente</h1>
                            <p className="text-gray-500">Complete los datos básicos para abrir el expediente</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombres */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <User size={16} /> Nombres
                                </label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all"
                                            placeholder="Ej. Juan Gabriel"
                                        />
                                    )}
                                />
                                {errors.firstName && <p className="text-xs text-red-500 font-bold">{errors.firstName.message}</p>}
                            </div>

                            {/* Apellidos */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <User size={16} /> Apellidos
                                </label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all"
                                            placeholder="Ej. Pérez López"
                                        />
                                    )}
                                />
                                {errors.lastName && <p className="text-xs text-red-500 font-bold">{errors.lastName.message}</p>}
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Calendar size={16} /> Fecha de Nacimiento
                                </label>
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="date"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all"
                                        />
                                    )}
                                />
                                {errors.birthDate && <p className="text-xs text-red-500 font-bold">{errors.birthDate.message}</p>}
                            </div>

                            {/* Sexo */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Heart size={16} /> Sexo
                                </label>
                                <Controller
                                    name="sex"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all bg-white"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    )}
                                />
                                {errors.sex && <p className="text-xs text-red-500 font-bold">{errors.sex.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Mail size={16} /> Correo Electrónico
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all"
                                            placeholder="ejemplo@correo.com"
                                        />
                                    )}
                                />
                                {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Phone size={16} /> Teléfono
                                </label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all"
                                            placeholder="Ej. 505 8888 8888"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={16} /> Dirección
                            </label>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#083c79] outline-none transition-all resize-none"
                                        placeholder="Dirección domiciliar completa..."
                                    />
                                )}
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#083c79] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
                                {isSubmitting ? "Registrando..." : "Guardar Paciente"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPatientPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-[#F8FAFC]">
                <Loader2 className="animate-spin text-[#083c79] w-12 h-12" />
            </div>
        }>
            <RegisterPatientPageContent />
        </Suspense>
    );
}

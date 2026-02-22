import React from 'react';
import { cn } from '@/lib/utils';

export const ActionButton = ({ icon, label, onClick, color = 'blue', active = false, variant = 'default' }: any) => {
    const colors: any = {
        blue: 'hover:bg_blue-500/10 text-blue-600 dark:text-blue-400',
        indigo: 'hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        amber: 'hover:bg-amber-500/10 text-amber-600 dark:text-amber-400',
        teal: 'hover:bg-teal-500/10 text-teal-600 dark:text-teal-400',
        red: 'hover:bg-red-500/10 text-red-600 dark:text-red-400',
        gray: 'hover:bg-muted text-foreground'
    };

    if (variant === 'ghost') {
        return (
            <button
                onClick={onClick}
                className={cn(
                    "p-3 rounded-2xl transition-all hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    colors[color]
                )}
            >
                {icon}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-6 py-3.5 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-widest",
                active ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105' : cn('text-muted-foreground bg-muted/30 hover:bg-muted/60', colors[color])
            )}
        >
            <div className={cn("shrink-0 transition-transform", active ? 'scale-110' : 'group-hover/btn:scale-110')}>{icon}</div>
            <span className="hidden xl:inline">{label}</span>
        </button>
    );
};

export const ActionButtonSmall = ({ icon, onClick, color }: any) => {
    const colors: any = {
        blue: 'hover:bg-blue-500/10 text-blue-500',
        amber: 'hover:bg-amber-500/10 text-amber-500',
        red: 'hover:bg-destructive/10 text-destructive',
        emerald: 'hover:bg-emerald-500/10 text-emerald-500',
    };
    return (
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={cn("p-2.5 rounded-xl transition-all active:scale-90 border border-transparent hover:border-border/50 bg-muted/20", colors[color])}>
            {icon}
        </button>
    );
};

export const InfoItem = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-5 p-5 rounded-[1.8rem] bg-muted/30 border border-border/40 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md">
        <div className="p-3 rounded-2xl bg-background border border-border/50 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110 shadow-inner">
            {icon}
        </div>
        <div className="overflow-hidden">
            <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.25em] mb-1">{label}</p>
            <p className="text-sm font-black text-foreground truncate tracking-tight">{value || 'N/A'}</p>
        </div>
    </div>
);

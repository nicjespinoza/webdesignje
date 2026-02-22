import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    icon?: React.ReactNode;
    error?: string;
    success?: boolean;
    containerClassName?: string;
    wrapperClassName?: string;
    as?: 'input' | 'textarea';
    rows?: number;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FloatingLabelInputProps>(({
    label,
    icon,
    error,
    success,
    className,
    containerClassName,
    wrapperClassName,
    value,
    as = 'input',
    rows,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== '' && value !== undefined;

    return (
        <div className={cn("relative mb-8", containerClassName)}>
            <motion.div
                animate={isFocused ? "focused" : "idle"}
                variants={{
                    idle: { scale: 1, y: 0 },
                    focused: { scale: 1.01, y: -2 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "relative flex items-center w-full rounded-[1.5rem] border transition-all duration-500 overflow-hidden",
                    isFocused
                        ? "bg-card border-primary ring-4 ring-primary/10 shadow-2xl shadow-primary/5"
                        : "bg-muted/30 border-border/60 hover:border-border hover:bg-muted/50",
                    error ? "border-destructive/50 bg-destructive/5" : "",
                    success ? "border-emerald-500/50 bg-emerald-500/5" : "",
                    wrapperClassName
                )}
            >
                {/* Icon */}
                {icon && (
                    <div className={cn(
                        "pl-6 pr-2 transition-colors duration-300",
                        isFocused ? "text-primary" : "text-muted-foreground/60",
                        error ? "text-destructive" : "",
                        success ? "text-emerald-500" : "",
                        as === 'textarea' ? "self-start mt-6" : ""
                    )}>
                        {icon}
                    </div>
                )}

                <div className={cn("relative flex-1", as === 'textarea' ? "h-auto py-3" : "h-16")}>
                    <motion.label
                        initial={false}
                        animate={{
                            y: isFocused || hasValue ? (as === 'textarea' ? 6 : 10) : (as === 'textarea' ? 14 : 20),
                            scale: isFocused || hasValue ? 0.7 : 1,
                            opacity: isFocused || hasValue ? 1 : 0.4
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={cn(
                            "absolute left-0 pointer-events-none font-black uppercase tracking-[0.25em] text-[9px] origin-top-left",
                            icon ? "pl-0" : "pl-6",
                            error ? "text-destructive" : (isFocused ? "text-primary" : "text-muted-foreground")
                        )}
                    >
                        {label}
                    </motion.label>

                    {as === 'textarea' ? (
                        <textarea
                            {...(props as any)}
                            value={value}
                            rows={rows || 3}
                            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e as any); }}
                            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e as any); }}
                            className={cn(
                                "w-full bg-transparent border-none outline-none px-0 pt-10 pb-4 text-foreground font-bold placeholder-transparent resize-none",
                                icon ? "pl-0" : "pl-6",
                                className
                            )}
                            placeholder={label}
                        />
                    ) : (
                        <input
                            {...(props as any)}
                            value={value}
                            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e as any); }}
                            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e as any); }}
                            className={cn(
                                "w-full h-full bg-transparent border-none outline-none px-0 pt-8 pb-2 text-foreground font-black tracking-tight placeholder-transparent",
                                icon ? "pl-0" : "pl-6",
                                className
                            )}
                            placeholder={label}
                        />
                    )}
                </div>

                {/* Status Icons */}
                <div className={cn("pr-6", as === 'textarea' ? "self-start mt-6" : "")}>
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                key="error-icon"
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="text-destructive"
                            >
                                <AlertCircle size={18} />
                            </motion.div>
                        )}
                        {success && !error && (
                            <motion.div
                                key="success-icon"
                                initial={{ scale: 0, opacity: 0, rotate: 45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="text-emerald-500"
                            >
                                <Check size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-[10px] text-destructive font-black uppercase tracking-widest mt-2 ml-4 flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
});

FloatingLabelInput.displayName = 'FloatingLabelInput';

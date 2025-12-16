'use client';
import React, { useState } from 'react';
import { IoClose, IoCard, IoWallet, IoCopy } from 'react-icons/io5';
import { HiBuildingLibrary } from 'react-icons/hi2';
import Button from '../ui/Button';

interface PaymentModalProps {
    totalAmount: number;
    onClose: () => void;
    onPaymentSelected: (method: 'card' | 'eft') => Promise<void>;
    isProcessing: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ totalAmount, onClose, onPaymentSelected, isProcessing }) => {
    const [method, setMethod] = useState<'card' | 'eft' | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const bankDetails = {
        bank: 'FNB (First National Bank)',
        accountName: 'Dreamhair Crowns',
        accountNumber: '62849102938',
        branchCode: '250655',
        reference: 'Order Number',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                        Choose Payment Method
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="text-center mb-8">
                        <p className="text-sm text-yellow-500 uppercase tracking-widest mb-2">Total Amount</p>
                        <p className="text-4xl font-bold text-white font-mono">
                            R{totalAmount.toFixed(2)}
                        </p>
                    </div>

                    {/* Method Selection */}
                    {!method && (
                        <div className="grid gap-4">
                            <button
                                onClick={() => setMethod('card')}
                                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                        <IoCard size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-white">Credit / Debit Card</p>
                                        <p className="text-xs text-white/50">Instant processing via PayStack/Yoco</p>
                                    </div>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-white/30 group-hover:border-amber-500" />
                            </button>

                            <button
                                onClick={() => setMethod('eft')}
                                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                        <HiBuildingLibrary size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-white">EFT / Bank Transfer</p>
                                        <p className="text-xs text-white/50">Manual verification required</p>
                                    </div>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-white/30 group-hover:border-amber-500" />
                            </button>
                        </div>
                    )}

                    {/* Card Flow (Simulated) */}
                    {method === 'card' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-center">
                                <p className="text-indigo-300 text-sm mb-2">Secure Payment Gateway</p>
                                <div className="animate-pulse bg-white/5 h-48 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-white/30 text-sm">[Simulated Payment Widget]</span>
                                </div>
                                <Button
                                    onClick={() => onPaymentSelected('card')}
                                    disabled={isProcessing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {isProcessing ? 'Processing...' : 'Pay Now'}
                                </Button>
                            </div>
                            <button
                                onClick={() => setMethod(null)}
                                className="w-full text-center text-sm text-white/40 hover:text-white"
                            >
                                Select a different method
                            </button>
                        </div>
                    )}

                    {/* EFT Flow */}
                    {method === 'eft' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 space-y-4">
                                <div className="flex items-center justify-center gap-2 text-amber-500 mb-2">
                                    <HiBuildingLibrary size={20} />
                                    <span className="font-bold uppercase tracking-wider">Banking Details</span>
                                </div>

                                <div className="space-y-3">
                                    {Object.entries(bankDetails).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center text-sm border-b border-dashed border-amber-500/20 pb-2 last:border-0">
                                            <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="text-white font-mono flex items-center gap-2">
                                                {value}
                                                {['accountNumber', 'branchCode'].includes(key) && (
                                                    <button onClick={() => handleCopy(value)} className="hover:text-amber-500">
                                                        <IoCopy size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center pt-2">
                                    {copied && <span className="text-xs text-green-400">Copied to clipboard!</span>}
                                </div>
                            </div>

                            <div className="text-xs text-center text-white/40">
                                Please use your Order Number as the reference.
                                <br />
                                Proof of payment can be sent to payments@dreamhaircrowns.co.za
                            </div>

                            <Button
                                onClick={() => onPaymentSelected('eft')}
                                disabled={isProcessing}
                                className="w-full bg-amber-600 hover:bg-amber-700"
                            >
                                {isProcessing ? 'Placing Order...' : 'I Promise to Pay'}
                            </Button>

                            <button
                                onClick={() => setMethod(null)}
                                className="w-full text-center text-sm text-white/40 hover:text-white"
                            >
                                Select a different method
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;

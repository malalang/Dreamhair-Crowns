'use client';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/context/CartContext';
import { addOrder } from '@/lib/supabase/orders/orders';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoAddCircle, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { TbCancel } from 'react-icons/tb';
import { HiShoppingCart } from 'react-icons/hi2';
import PaymentModal from '@/components/payment/PaymentModal';

const CartFooter = () => {
	const router = useRouter();
	const { cartItems, clearCart, totalPrice, totalQuantity } = useCart();
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	const handlePaymentClick = () => {
		setShowPaymentModal(true);
	};

	const handlePaymentSelected = async (method: 'card' | 'eft') => {
		setIsPlacingOrder(true);
		try {
			const { createClient } = await import('@/lib/supabase/client');
			const supabase = createClient();
			const { data: { user } } = await supabase.auth.getUser();

			if (!user) {
				alert('Please log in to place an order.');
				router.push('/login');
				return;
			}

			// Determine status based on method
			const status = method === 'eft' ? 'waiting_for_payment' : 'processing';

			await addOrder(user.id, cartItems, totalPrice, totalQuantity, status);
			router.push('/orders');
			clearCart();
		} catch (error) {
			console.error('Failed to place order: ', error);
			alert('There was an issue placing your order. Please try again.');
		} finally {
			setIsPlacingOrder(false);
			setShowPaymentModal(false);
		}
	};

	const handleCancelOrder = () => {
		clearCart();
		router.back();
	};

	return (
		<>
			<footer className='fixed bottom-0 left-0 right-0 z-50'>
				{/* Gradient Fade Top - Reduced height */}
				<div className="absolute -top-12 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none" />

				<div className="bg-black/90 backdrop-blur-xl border-t border-white/10 pb-safe">
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
						<div className='flex flex-col gap-4'>

							{/* Receipt Summary - Compact */}
							<div className="flex items-end justify-between border-b border-dashed border-white/20 pb-4">
								<div className="flex flex-col gap-0.5">
									<span className="text-white/50 text-xs uppercase tracking-widest">Total Items</span>
									<span className="text-lg font-mono text-white">{totalQuantity}</span>
								</div>
								<div className="flex flex-col gap-0.5 text-right">
									<span className="text-amber-500 text-xs uppercase tracking-widest font-bold">Total Amount</span>
									<span className="text-3xl font-mono text-white tracking-tighter">
										R{totalPrice.toFixed(2)}
									</span>
								</div>
							</div>

							{/* Action Buttons - Compact */}
							<nav className='grid grid-cols-2 lg:flex gap-3'>
								{/* Cancel */}
								<button
									onClick={handleCancelOrder}
									className='col-span-1 lg:flex-none px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors'
								>
									Cancel
								</button>

								{/* Add More */}
								<button
									onClick={() => router.back()}
									className='col-span-1 lg:flex-none px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors'
								>
									Add More
								</button>

								{/* Make Payment - Massive Button */}
								{cartItems.length > 0 && (
									<button
										onClick={handlePaymentClick}
										disabled={isPlacingOrder}
										className='col-span-2 lg:flex-1 bg-amber-500 text-black text-base md:text-lg font-bold uppercase tracking-[0.2em] py-3 rounded-lg hover:bg-amber-400 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.5)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1'
									>
										<div className="flex items-center justify-center gap-3">
											<span>Make Payment</span>
											<IoCheckmarkCircleSharp size={20} />
										</div>
									</button>
								)}
							</nav>
						</div>
					</div>
				</div>
			</footer>

			{showPaymentModal && (
				<PaymentModal
					totalAmount={totalPrice}
					onClose={() => setShowPaymentModal(false)}
					onPaymentSelected={handlePaymentSelected}
					isProcessing={isPlacingOrder}
				/>
			)}
		</>
	);
};


export default CartFooter;
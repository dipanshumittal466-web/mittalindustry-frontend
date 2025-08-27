/**
 * Razorpay order creation stub (serverless). This file provides a pattern —
 * to fully enable, add your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env vars
 * and use the official Razorpay API to create an order server-side.
 */
export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  // Example response (mock)
  const mockOrder = {
    id: 'order_MITTAL_123456',
    amount: 1249900,
    currency: 'INR',
    status: 'created'
  }
  res.status(200).json({order: mockOrder, message: 'This is a mock order. Replace with real Razorpay order creation in production.'})
}

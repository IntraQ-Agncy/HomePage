# 🚀 **Resume Advisor Setup - Single Payment Link**

## ✨ **What's Ready**

Your Resume Advisor is now configured to use **one single payment link** from your existing payment system, just like your other services!

## 🛠️ **Setup (Just 1 Step!)**

### **Step 1: Add Your ₹20 Payment Link**
Edit `src/config/payments.ts` and replace this line:

```typescript
ResumeAdvisor: 'https://your-resume-advisor-payment-link-here' // Add your ₹20 payment link here
```

With your actual Razorpay payment link:

```typescript
ResumeAdvisor: 'https://rzp.io/rzp/YOUR_ACTUAL_LINK_HERE'
```

## 🔄 **How It Works**

1. **User clicks "Get Feedback for ₹20"** on Resume Advisor page
2. **Payment modal opens** with your single payment link
3. **User clicks payment button** → Opens your Razorpay link in new tab
4. **After payment** → User gets redirected to upload form
5. **AI analysis** → Gemini analyzes resume and sends email feedback

## 💰 **Payment Integration**

- **Uses your existing payment system** (same as Starter/Pro/Enterprise)
- **Single link** - easy to manage and update
- **Consistent with your brand** - same payment flow
- **No additional setup** - just add the link and you're done!

## 🚀 **Deploy**

```bash
# 1. Add your payment link to payments.ts
# 2. Test locally
npm run dev

# 3. Build and deploy
npm run build
git add .
git commit -m "Add Resume Advisor payment link"
git push origin main
```

## 🎯 **You're Done!**

That's it! Your Resume Advisor now:
- ✅ Uses **one payment link** from your existing system
- ✅ **Integrated** with your current payment infrastructure  
- ✅ **Consistent** with your other services
- ✅ **Ready to earn** ₹20 per resume analysis!

**Just add your Razorpay payment link and start earning!** 🚀💰

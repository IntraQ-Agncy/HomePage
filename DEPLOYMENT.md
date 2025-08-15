# Deployment Guide for Resume Advisor Feature

## Quick Start

### 1. Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 2. Build for Production
```bash
npm run build
npm run preview
```

## Deployment to Vercel

### Step 1: Prepare Repository
1. Ensure all changes are committed to GitHub
2. Push to main branch: `git push origin main`

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select the repository containing the Resume Advisor code

### Step 3: Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables
Add these in Vercel dashboard under Project Settings > Environment Variables:

```env
# For production, add these when ready:
# OPENAI_API_KEY=your_openai_key
# BREVO_API_KEY=your_brevo_key
# RAZORPAY_KEY_ID=your_razorpay_key
# RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Testing the Deployment

### 1. Test Main Routes
- [ ] Homepage loads correctly
- [ ] Resume Advisor page accessible at `/resume-advisor`
- [ ] Navigation works between pages
- [ ] Dark/light theme toggle works

### 2. Test Resume Advisor Flow
- [ ] Main page displays correctly
- [ ] Payment button redirects to upload (currently mock)
- [ ] Upload form validates inputs
- [ ] Success page shows after form submission
- [ ] Upsell section displays correctly

### 3. Test Responsiveness
- [ ] Mobile navigation works
- [ ] Forms are mobile-friendly
- [ ] All sections adapt to screen size

## Production Checklist

### Before Going Live
- [ ] Replace mock payment with real Razorpay/PayPal integration
- [ ] Set up OpenAI API key and test AI analysis
- [ ] Configure email service (Brevo/Resend)
- [ ] Set up payment webhooks
- [ ] Test file upload with real PDF/DOCX files
- [ ] Verify email delivery
- [ ] Check payment flow end-to-end

### SEO & Analytics
- [ ] Add Google Analytics
- [ ] Set up Google Search Console
- [ ] Verify meta tags are correct
- [ ] Test social media sharing

### Security
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up rate limiting
- [ ] Validate file uploads
- [ ] Secure payment processing

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues
- Ensure `BrowserRouter` is used (not `HashRouter`)
- Check that all routes are properly defined
- Verify `basename` if deploying to subdirectory

#### Payment Integration
- Test with Razorpay test keys first
- Verify webhook endpoints are accessible
- Check payment confirmation flow

#### File Upload Issues
- Verify file size limits
- Check file type validation
- Test with different file formats

## Monitoring & Maintenance

### Performance Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Track API response times

### Error Tracking
- Set up error logging (Sentry, LogRocket)
- Monitor payment failures
- Track file upload errors

### Regular Updates
- Keep dependencies updated
- Monitor API rate limits
- Review and update content

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

## Rollback Plan

If issues arise:
1. Revert to previous commit: `git revert HEAD`
2. Push changes: `git push origin main`
3. Vercel will automatically redeploy
4. Verify the rollback worked correctly

## Next Steps After Deployment

1. **Set up monitoring** and error tracking
2. **Implement real payment integration**
3. **Add analytics** to track user behavior
4. **Set up automated testing** pipeline
5. **Plan feature enhancements** based on user feedback

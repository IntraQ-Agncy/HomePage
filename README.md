# IntraQ Website with AI Resume Advisor

A modern React-based website featuring an AI-powered Resume Improvement Advisor service.

## Features

### Main Website
- Responsive design with dark/light theme toggle
- Hero section with call-to-action
- Features, Benefits, Reviews, and Pricing sections
- FAQ section
- Mobile-first design using Tailwind CSS

### Resume Advisor Service
- **Main Page** (`/resume-advisor`): Product information, benefits, testimonials, and payment CTA
- **Upload Form** (`/resume-advisor/upload`): Resume upload, target role input, and email collection
- **Success Page** (`/resume-advisor/success`): Thank you message and premium service upsell

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ResumeAdvisor/
│   │   ├── ResumeAdvisor.tsx      # Main product page
│   │   ├── UploadForm.tsx         # Resume upload form
│   │   ├── SuccessPage.tsx        # Success page with upsell
│   │   └── index.ts              # Component exports
│   ├── Header/                    # Navigation header
│   ├── Hero/                      # Hero section
│   ├── Features/                  # Features section
│   ├── Benefits/                  # Benefits section
│   ├── Reviews/                   # Customer reviews
│   ├── Pricing/                   # Pricing plans
│   ├── FAQ/                       # FAQ section
│   └── Footer/                    # Footer
├── api/
│   └── resumeAdvisor.ts          # Mock API service
├── hooks/                         # Custom React hooks
├── types/                         # TypeScript type definitions
└── App.tsx                        # Main app with routing
```

## Resume Advisor Service Flow

1. **User visits** `/resume-advisor` and learns about the service
2. **Payment**: User clicks "Get Feedback for ₹20" (currently mock - redirects to upload)
3. **Upload**: User uploads resume, specifies target role, and provides email
4. **AI Analysis**: Mock API processes the resume (in production: OpenAI integration)
5. **Email Delivery**: Mock email service sends feedback (in production: Brevo/Resend)
6. **Success Page**: User sees confirmation and premium service upsell

## API Integration Points

### Current (Mock)
- `analyzeResume()`: Simulates resume analysis
- `extractTextFromFile()`: Simulates file text extraction
- `sendResumeFeedback()`: Simulates email delivery

### Production Requirements
- **File Processing**: Integrate `pdf-parse` for PDFs and `docx-parser` for DOCX files
- **AI Analysis**: OpenAI API integration with structured prompts
- **Email Service**: Brevo, Resend, or Nodemailer with Gmail API
- **Payment Gateway**: Razorpay (India) or PayPal (global)

## Payment Integration

### Razorpay (Recommended for India)
1. Create Razorpay account and get API keys
2. Implement checkout flow on main page
3. Add webhook verification for payment confirmation
4. Redirect to upload page only after successful payment

### PayPal (Global)
1. Create PayPal Business account
2. Implement PayPal Checkout
3. Handle payment confirmation
4. Secure redirect to upload page

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables for API keys
3. Deploy automatically on push to main branch

### Environment Variables
```env
# OpenAI
OPENAI_API_KEY=your_openai_key

# Email Service
BREVO_API_KEY=your_brevo_key
# or
RESEND_API_KEY=your_resend_key

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## SEO & Meta Tags

### Resume Advisor Page
- **Title**: "AI Resume Advisor – Improve Your CV for ₹20 | IntraQ"
- **Description**: "Upload your resume and get AI-powered improvement tips in under 5 minutes. Only ₹20."
- **Keywords**: "resume advisor, AI resume, CV improvement, ATS optimization, resume feedback"

### Open Graph Tags
```html
<meta property="og:title" content="AI Resume Advisor – Improve Your CV for ₹20 | IntraQ" />
<meta property="og:description" content="Upload your resume and get AI-powered improvement tips in under 5 minutes. Only ₹20." />
<meta property="og:image" content="/og-resume-advisor.jpg" />
<meta property="og:url" content="https://intraq.com/resume-advisor" />
```

## Testing

### Manual Testing
1. Navigate through all Resume Advisor pages
2. Test file upload with PDF/DOCX files
3. Verify form validation
4. Test responsive design on mobile devices
5. Check dark/light theme switching

### Automated Testing (Future)
- Unit tests for components
- Integration tests for API calls
- E2E tests for user flows
- Payment flow testing

## Security Considerations

1. **File Upload**: Validate file types and sizes
2. **Payment**: Implement proper webhook verification
3. **Data Privacy**: Don't store sensitive resume data
4. **Rate Limiting**: Prevent abuse of AI analysis service
5. **Input Validation**: Sanitize all user inputs

## Performance Optimization

1. **Lazy Loading**: Implement route-based code splitting
2. **Image Optimization**: Use WebP format and proper sizing
3. **Caching**: Implement service worker for offline support
4. **Bundle Size**: Monitor and optimize bundle size

## Future Enhancements

1. **Real-time Chat**: AI-powered resume consultation
2. **Resume Templates**: Downloadable ATS-friendly templates
3. **Cover Letter Generator**: AI-powered cover letter creation
4. **Interview Prep**: Mock interview questions and tips
5. **Analytics Dashboard**: Track application success rates

## Support

For questions or issues:
- Create GitHub issue
- Contact development team
- Check documentation

## License

[Your License Here]

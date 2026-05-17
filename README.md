
# Strata Performance AI

This is a premium performance management portal built with Next.js, Genkit, and Shadcn UI.

## Deployment on Vercel

To deploy this application to Vercel:

1. **Push your code** to a Git provider (GitHub, GitLab, or Bitbucket).
2. **Connect to Vercel**: Import the repository into your Vercel dashboard.
3. **Set Environment Variables**: In the Vercel project settings, add:
   - `GOOGLE_GENAI_API_KEY`: Your Google AI SDK key (get it from [Google AI Studio](https://aistudio.google.com/)).
4. **Deploy**: Click the "Deploy" button. Vercel will automatically detect the Next.js framework and use the `vercel.json` configuration.

## Features

- **Role-Based Dashboards**: Tailored views for Employees, Managers, and Admins.
- **AI-Powered Goals**: Uses Google Gemini to refine draft objectives into professional SMART goals.
- **Real-time Validation**: Goal weightage validation ensures performance metrics always sum to 100%.
- **Audit Logging**: Comprehensive tracking of administrative actions for enterprise security.

# Gmail Setup for NodeMailer

## Steps to Enable Gmail App Password:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Factor Authentication**
   - Security → 2-Step Verification → Turn On

3. **Generate App Password**
   - Security → App passwords
   - Select app: Mail
   - Select device: Other (Custom name)
   - Name it: "AdminHub NodeMailer"
   - Copy the 16-character password

4. **Update Controller**
   - Replace `your-app-password` with the generated password
   - Line 8 in admin.controller.js

## Current Email Configuration:
- From: jenishpardava16@gmail.com
- To: User's email from database
- Subject: AdminHub - Password Reset OTP

## Test Steps:
1. Complete Gmail setup above
2. Update app password in controller
3. Try forgot password with jenishpardava16@gmail.com
4. Check email inbox for OTP
# aws-storage-services
Bucket Information
Bucket Name: lms-s3-nova-demo-stanley-2026
Region: eu-north-1 (Europe – Stockholm)

aws s3api create-bucket \
  --bucket lms-s3-nova-demo-stanley-2026 \
  --region eu-north-1 \
  --create-bucket-configuration LocationConstraint=eu-north-1

  Upload Project Files
  aws s3 sync . s3://lms-s3-nova-demo-stanley-2026/

  Configure Public Access
  aws s3api put-public-access-block \
  --bucket lms-s3-nova-demo-stanley-2026 \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

  Apply Bucket Policy
  {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lms-s3-nova-demo-stanley-2026/*"
    }
  ]
}
Enable Static Website Hosting
aws s3 website s3://lms-s3-nova-demo-stanley-2026/ \
  --index-document index.html

  Mentee Project
Mentee Name: Akanimo Ekarika
Project Type: [Frontend Landing Page](https://lms-s3-nova-demo-stanley-2026.s3.eu-north-1.amazonaws.com/nova-landing/index.html)
Files Hosted: HTML, CSS, JavaScript

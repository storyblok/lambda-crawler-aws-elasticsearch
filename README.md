# lambda-crawler

## how to use

1. Create a elasticsearch domain on Amazon AWS
2. Change the host config in client.js to your elasticsearch domain
3. Clone and build this Lambda application and make zip package.
4. Deploy `lambda-crawler.zip` from AWS Management Console.

## how to make zip package

```
git clone https://github.com/storyblok/lambda-crawler-aws-elasticsearch
cd lambda-crawler-aws-elasticsearch
npm install
npm run build
# lambda-crawler.zip
```

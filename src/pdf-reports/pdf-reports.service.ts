import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { chromium } from 'playwright-core';
const playwright = require('playwright-aws-lambda');

@Injectable()
export class PdfGeneratorService {
  async findOne(type: string, id: string) {
    const url = `${process.env.PDF_LAYOUT_URL}/${type}/${id}`;

    if (!url) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const browser = await playwright.launchChromium({});

    // Launch a headless browser using Playwright
    // const browser = await chromium.launch({
    //   headless: true,
    //   timeout: 500000,
    // });
    const page = await browser.newPage();

    try {
      // Navigate to the URL
      await page.goto(url, { waitUntil: 'networkidle' });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
      <style>
      * {
        font-family: 'Helvetica', sans-serif !important;
      }
      html {
        -webkit-print-color-adjust: exact;
      }
      </style>
      <div id="footer-template" 
            style="font-size:16px !important;
                  padding-left:10px; 
                  position:absolute;
                  bottom:30px;
                  right: 10px;
                  font-weight : 500;
                  background:#F6F6F6 !important;
                  padding: 10px 15px;
                  border-radius:3.750rem;
                ">
        <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
      });
      // Close the browser
      await browser.close();
      // Set response headers and send the PDF
      return pdfBuffer;
    } catch (error) {
      // Close the browser in case of an error
      await browser.close();
      throw new HttpException(
        'Failed to generate PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

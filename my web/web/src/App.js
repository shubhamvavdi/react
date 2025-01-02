import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./style.css"; // Correctly import the CSS file

const MyComponent = () => {
  
  useEffect(() => {
    const generatePdf = () => {
      const button = document.getElementById("generate-pdf");
      const content = document.getElementById("pdf-content");

      if (!content) {
        console.error("PDF content element not found");
        return;
      }

      // Temporarily hide the button before generating the PDF
      button.style.display = "none";

      // Use html2canvas to take a screenshot of the content
      html2canvas(content, { scale: 3 })
        .then((canvas) => {
          // Restore the button display
          button.style.display = "block";

          const pdf = new jsPDF("p", "mm", "a4");

          // A4 dimensions in mm
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();

          const imgData = canvas.toDataURL("image/png");

          // Calculate the scaling for the image
          const imgWidth = pageWidth;
          const imgHeight = (canvas.height * pageWidth) / canvas.width;

          // Add the image to the PDF and center it
          const yOffset = (pageHeight - imgHeight) / 2; // Center vertically
          pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);

          // Save the PDF
          pdf.save("Invoice.pdf");
        })
        .catch((error) => {
          // Restore button display on error
          button.style.display = "block";
          console.error("Error generating PDF:", error);
        });
    };

    const button = document.getElementById("generate-pdf");
    if (button) {
      button.addEventListener("click", generatePdf);
    }

    // Cleanup listener on unmount
    return () => {
      if (button) {
        button.removeEventListener("click", generatePdf);
      }
    };
  }, []);
  return (
    <div className="pdf" id="pdf-content">
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle">
          <div className="rectangle-2"></div>
          <div className="text-wrapper">To</div>

          <div className="text-wrapper-2">
            <label htmlFor="transaction-reference" className="label-text">
              Transaction&nbsp;Reference:&nbsp;
            </label>
            <input
              id="transaction-reference"
              type="text"
              value=""
              style={{ border: 'none', background: 'transparent', width: '100%' }}
            />
          </div>
          <div className="bank-reference">
            Bank Reference&nbsp;&nbsp;
            <input
              type="text"
              value=""
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                marginTop: '10px',
              }}
            />
          </div>
    
        </div>
        <div className="text-wrapper-3">
        From:&nbsp;EPROWEB&nbsp;&nbsp;TECHNOLOGIES
          <input
            type="text"
            
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </div>

        <div className="status-sent-to-bank">
          Status&nbsp;&nbsp;
          <input
            type="text"
            value="Sent to Bank"
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              
            }}
          />
        </div>
        <div className="value-date">
          Value Date*&nbsp;&nbsp;
          <input
            type="text"
            value="2024-03-12"
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              marginTop: '10px',
            }}
          />
        </div>
        <div className="payment-amount">Payment Amount &amp; Currency</div>

        <div className="payment-amount-2" >
          <input
            type="text"
            value="Foreign Currency Payment"
            style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 'inherit' }}
          />
        </div>

        <div className="text-wrapper-4" style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <input
            id="file-name"
            type="text"
            value="ANDROPEDIA INFOTECH"
            style={{
              border: 'none',
              background: 'transparent',
           
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}
          />
        </div>
        <div className="text-wrapper-5">
          <input
            type="text"
            value="INR 900,000.00"
            style={{
              
              border: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}
          />
        </div>
      </div>
      <div className="overlap">
        <div className="text-wrapper-6">
        To : ANDROPEDIA INFOTECH
          <input
            type="text"
      
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </div>
      </div>
      <div className="div-wrapper">
        <div className="text-wrapper-6">Payment Details</div>
      </div>
      <div className="overlap-2">
        <div className="text-wrapper-6">Payment Details</div>
      </div>
      <div className="text-wrapper-8">
        <input
          type="text"
          value="1025858696602"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-9">
        <select
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
          }}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="AED">AED</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
      <div className="text-wrapper-10">
        <input
          type="text"
          value="ITS-Computer services"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-11">
        <input
          type="text"
          value="Payment For Software Services"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '10px',
          }}
        />
      </div>
      <div className="text-wrapper-19">
        <select
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
          }}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="AED">AED</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
      <div className="text-wrapper-20">
        <select
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
          }}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
      <div className="text-wrapper-21">
        <input
          type="text"
          value="AED 0.00"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-22">
        <input
          type="text"
          value="USD 3.653"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-23">
        <input
          type="text"
          value="UNITED ARAB EMIRATES"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-24">
        <input
          type="text"
          value="900,000.00"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-25">
        <input
          type="text"
          value="Payment"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-26">
        <input
          type="text"
          value="USD 3.685"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-27">
        <input
          type="text"
          value="CURRENT ACCOUNT FOREIGN CCY"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-28">
        <input
          type="text"
          value="10,756.64"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>
      <div className="text-wrapper-29">
        <input
          type="text"
          value="OUR"
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        />
      </div>

      <div className="text-wrapper-35">Debit Account</div>
      <div className="text-wrapper-36">Debit Currency</div>
      <div className="text-wrapper-37">Sender Purpose Code</div>
      <p className="p">Purpose of Payment to Beneficiary</p>

      <div className="text-wrapper-40">
        <button type="button" id="generate-pdf" className="gradient-button">
          Generate PDF
        </button>
      </div>

      <div className="text-wrapper-41">
        Payment Date
        <input
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>

      <div className="text-wrapper-42">
        Deal Reference
        <input
          id="transaction-reference"
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '90%',
            marginTop: '12px',
          }}
        />
      </div>

      <div className="text-wrapper-43" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <span style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '3px' }}>Nickname</span>
        <input
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '10px',
          }}
        />
      </div>

      <div className="text-wrapper-44">
        <span style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '3px' }}>IBAN</span>
        <input
          type="text"
          value="50200096056303"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '10px',
          }}
        />
      </div>

      <div className="sender-s">
        Sender's Correspondent Bank
        <input
          id="transaction-reference"
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '80%',
            marginTop: '12px',
          }}
        />
      </div>

      <div className="text-wrapper-45">
        Intermediary Bank
        <input
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="text-wrapper-46">
        Intermediary Bank Swift
        <input
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>

      <div className="sender-s-2">
        Sender's Correspondent Bank
        <input
          id="transaction-reference"
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '80%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="text-wrapper-47">
        Address:
        <input
          type="text"
          value="B-145 MHC Building"
          style={{
            border: 'none',
            background: 'transparent',
            marginTop: '8px',
          }}
        />
      </div>
      <div className="text-wrapper-48">
        Bank Swift:
        <input
          type="text"
          value="HDFCINBBXXX"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="text-wrapper-49">
        Bank Name:
        <input
          type="text"
          value="HDFC BANK LIMITED"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="text-wrapper-50">
        Bank Swift:
        <input
          type="text"
          value="INDIA"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="text-wrapper-51">
        Clearing Code:
        <input
          type="text"
          value="IFSC HDFC0001684"
          style={{
            border: 'none',
            background: 'transparent',
            width: '100%',
            marginTop: '12px',
            width: '100%',
          }}
        />
      </div>
      <div className="text-wrapper-52">Currency</div>
      <div className="text-wrapper-53">Payment Currency</div>
      <div className="text-wrapper-54">Charge Amount</div>
      <div className="text-wrapper-55">Buy Rate</div>
      <div className="text-wrapper-56">Country</div>
      <div className="text-wrapper-57">Payment Amount</div>
      <div className="text-wrapper-58">Reference in your statement</div>
      <div className="text-wrapper-59">Sell Rate</div>
      <div className="text-wrapper-60">Account Type</div>
      <div className="text-wrapper-61">Debit Amount</div>
      <div className="text-wrapper-62">Charge Type</div>

      <div className="text-wrapper-63">
        Exchange Rate
        <input
          id="transaction-reference"
          type="text"
          value=""
          style={{
            border: 'none',
            background: 'transparent',
            width: '90%',
            marginTop: '12px',
          }}
        />
      </div>

      <div className="text-wrapper-64">Payment Invoice</div>
    </div>
    </div>
  );
};

export default MyComponent;
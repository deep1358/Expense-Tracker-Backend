const formatMoney = require("../../../utils/formatMoney");

module.exports = (
    totalExpense,
    categoryWiseExpense,
    paymentModeWiseExpense,
    message,
    monthWiseExpense
) => `
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin: 0; padding: 0;">
        <div width="100%" style="text-align: center;">
            <table role="presentation" align="center" style="background-color: #FFFFFF; width:100%; min-width: 650px">
                <tbody>
                    <tr>
                        <td align="center">
                            <center>
                                <div style="margin: 0 auto;">
                                    <table role="presentation" align="center" style="background-color: #FAFAFA; width:650px; margin:0 auto; padding: 10px; border: 1px solid #e1eded">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table 
                                                        role="presentation" 
                                                        cellspacing="0" 
                                                        border="0" 
                                                        cellpadding="0" 
                                                        style="text-align: center; width: 100%;"
                                                        >
                                                        <tr>
                                                            <td>
                                                                <img src="https://res.cloudinary.com/dmetd1shj/image/upload/v1671262824/logo_tbrj8p.png" width="175" alt="logo"/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:0 20px;">
                                                                <p style="text-align:left; font-size:1.3rem;">
                                                                    Dear Expense Tracker User,
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:0 20px;">
                                                                <p style="text-align:left; font-size:1.3rem;">
                                                                    ${message}
                                                                </p>
                                                            </td>
                                                        </tr> 
                                                        ${
                                                            monthWiseExpense
                                                                ? `<tr>
                                                                <td style="padding:20px 0;">
                                                                    <div style="border-radius: 10px; padding:10px 0;">
                                                                        <h3 style="font-size:1.5rem;">
                                                                            Month Wise Expense
                                                                        </h3>
                                                                        <table style="font-size: 1.2rem; width:90%; margin: 0 auto;" 
                                                                            role="presentation"
                                                                            cellspacing="5"
                                                                            cellpadding="5"
                                                                            >
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Month</th>
                                                                                    <th>Amount (in ₹)</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td colspan="2" style="border-bottom: 1px solid #00b89a4d;"></td>
                                                                                </tr>
                                                                                ${monthWiseExpense
                                                                                    ?.map(
                                                                                        (
                                                                                            {
                                                                                                month,
                                                                                                amount,
                                                                                            },
                                                                                            index
                                                                                        ) => `
                                                                                        ${
                                                                                            index !==
                                                                                            0
                                                                                                ? `<tr>
                                                                                                <td colspan="2" style="border-bottom: 1px solid #e7e7e7"></td>
                                                                                            </tr>`
                                                                                                : ""
                                                                                        }
                                                                                            <tr>
                                                                                                <td>${month}</td>
                                                                                                <td>${formatMoney(
                                                                                                    amount
                                                                                                )}</td>
                                                                                            </tr>
                                                                                `
                                                                                    )
                                                                                    .join(
                                                                                        ""
                                                                                    )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>`
                                                                : ""
                                                        }
                                                        <tr>
                                                            <td style="padding:20px 0;">
                                                                <div style="border-radius: 10px; padding:10px 0;">
                                                                    <h3 style="font-size:1.5rem;">
                                                                        Category Wise Expense
                                                                    </h3>
                                                                    <table style="font-size: 1.2rem; width:90%; margin: 0 auto;" 
                                                                        role="presentation"
                                                                        cellspacing="5"
                                                                        cellpadding="5"
                                                                        >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Category</th>
                                                                                <th>Amount (in ₹)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colspan="2" style="border-bottom: 1px solid #00b89a4d;"></td>
                                                                            </tr>
                                                                            ${categoryWiseExpense
                                                                                ?.map(
                                                                                    (
                                                                                        {
                                                                                            category,
                                                                                            amount,
                                                                                        },
                                                                                        index
                                                                                    ) => `
                                                                                    ${
                                                                                        index !==
                                                                                        0
                                                                                            ? `<tr>
                                                                                            <td colspan="2" style="border-bottom: 1px solid #e7e7e7"></td>
                                                                                        </tr>`
                                                                                            : ""
                                                                                    }
                                                                                        <tr>
                                                                                            <td>${category}</td>
                                                                                            <td>${formatMoney(
                                                                                                amount
                                                                                            )}</td>
                                                                                        </tr>
                                                                            `
                                                                                )
                                                                                .join(
                                                                                    ""
                                                                                )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:20px 0;">
                                                                <div style="border-radius: 10px; padding:10px 0;">
                                                                    <h3 style="font-size:1.5rem;">
                                                                        Payment mode Wise Expense
                                                                    </h3>
                                                                    <table 
                                                                        style="font-size: 1.2rem; width:90%; margin: 0 auto;" 
                                                                        role="presentation"
                                                                        cellspacing="5"
                                                                        cellpadding="5"
                                                                        >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Payment mode</th>
                                                                                <th>Amount (in ₹)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colspan="2" style="border-bottom: 1px solid #00b89a4d;"></td>
                                                                            </tr>
                                                                            ${paymentModeWiseExpense
                                                                                ?.map(
                                                                                    (
                                                                                        {
                                                                                            payment_mode,
                                                                                            amount,
                                                                                        },
                                                                                        index
                                                                                    ) => `
                                                                                ${
                                                                                    index !==
                                                                                    0
                                                                                        ? `<tr>
                                                                                    <td colspan="2" style="border-bottom: 1px solid #e7e7e7"></td>
                                                                                </tr>`
                                                                                        : ""
                                                                                }
                                                                                <tr>
                                                                                    <td>${payment_mode}</td>
                                                                                    <td>${formatMoney(
                                                                                        amount
                                                                                    )}</td>
                                                                                </tr>
                                                                            `
                                                                                )
                                                                                .join(
                                                                                    ""
                                                                                )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h2 style="font-size: 2rem">
                                                                    Total expense: ₹${formatMoney(
                                                                        totalExpense
                                                                    )}
                                                                </h2>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="font-size: .9rem;">
                                                                    Click <a>here</a> to unsubscribe
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </center>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>
`;

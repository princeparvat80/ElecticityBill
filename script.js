document.addEventListener('DOMContentLoaded', () => {
    // Field IDs to save and retrieve
    const fields = [
        'current-date', 'current-meter', 'last-date', 'last-meter',
        'prince-last-month', 'prince-this-month',
        'saurabh-last-month', 'saurabh-this-month',
        'manish-last-month', 'manish-this-month'
    ];

    // Load saved data from local storage and populate input fields
    fields.forEach(field => {
        const savedValue = localStorage.getItem(field);
        if (savedValue !== null) {
            document.getElementById(field).value = savedValue;
        }
    });
});

function calculateBill() {
    // Get values from input fields
    const currentDate = document.getElementById('current-date').value;
    const currentMeter = parseFloat(document.getElementById('current-meter').value);
    const lastDate = document.getElementById('last-date').value;
    const lastMeter = parseFloat(document.getElementById('last-meter').value);

    const princeLastMonth = parseFloat(document.getElementById('prince-last-month').value);
    const princeThisMonth = parseFloat(document.getElementById('prince-this-month').value);
    const saurabhLastMonth = parseFloat(document.getElementById('saurabh-last-month').value);
    const saurabhThisMonth = parseFloat(document.getElementById('saurabh-this-month').value);
    const manishLastMonth = parseFloat(document.getElementById('manish-last-month').value);
    const manishThisMonth = parseFloat(document.getElementById('manish-this-month').value);

    const rsPerUnit = 7;
    const fixedCostPerDay = 24;

    // Calculate days and meter rent
    const numberOfDays = Math.ceil((new Date(currentDate) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
    const totalMeterRent = numberOfDays * fixedCostPerDay;
    const perPersonMeterRent = totalMeterRent / 3;

    // Calculate total units
    const totalUnits = currentMeter - lastMeter;

    // Calculate individual units
    const princeUnitsUsed = princeThisMonth - princeLastMonth;
    const saurabhUnitsUsed = saurabhThisMonth - saurabhLastMonth;
    const manishUnitsUsed = manishThisMonth - manishLastMonth;

    const princeBill = princeUnitsUsed * rsPerUnit;
    const saurabhBill = saurabhUnitsUsed * rsPerUnit;
    const manishBill = manishUnitsUsed * rsPerUnit;

    const commonUnits = totalUnits - (princeUnitsUsed + saurabhUnitsUsed + manishUnitsUsed);
    const commonBill = commonUnits * rsPerUnit;
    const commonShare = commonBill / 3;

    const princeTotal = princeBill + commonShare + perPersonMeterRent;
    const saurabhTotal = saurabhBill + commonShare + perPersonMeterRent;
    const manishTotal = manishBill + commonShare + perPersonMeterRent;

    // Display results
    document.getElementById('results').innerHTML = `
        <h2>Detailed Calculation:</h2>
        <p>Total Units: ${totalUnits.toFixed(2)} units</p>
        <p>Days Counted: ${numberOfDays} days</p>
        <p>Total Meter Rent: ₹${totalMeterRent.toFixed(2)}</p>
        <p>Per Person Meter Rent: ₹${perPersonMeterRent.toFixed(2)}</p>
        <p>Common Units: ${commonUnits.toFixed(2)} units</p>
        <p>Common Bill: ₹${commonBill.toFixed(2)}</p>
        <h3>Bills:</h3>
        <p>Prince: ₹${princeBill.toFixed(2)} (Units) + ₹${commonShare.toFixed(2)} (Common) + ₹${perPersonMeterRent.toFixed(2)} (Meter Rent) = <strong>₹${princeTotal.toFixed(2)}</strong></p>
        <p>Saurabh: ₹${saurabhBill.toFixed(2)} (Units) + ₹${commonShare.toFixed(2)} (Common) + ₹${perPersonMeterRent.toFixed(2)} (Meter Rent) = <strong>₹${saurabhTotal.toFixed(2)}</strong></p>
        <p>Manish: ₹${manishBill.toFixed(2)} (Units) + ₹${commonShare.toFixed(2)} (Common) + ₹${perPersonMeterRent.toFixed(2)} (Meter Rent) = <strong>₹${manishTotal.toFixed(2)}</strong></p>
    `;

    // Save values to local storage
    const fieldsToSave = {
        'current-date': currentDate,
        'current-meter': currentMeter,
        'last-date': lastDate,
        'last-meter': lastMeter,
        'prince-last-month': princeLastMonth,
        'prince-this-month': princeThisMonth,
        'saurabh-last-month': saurabhLastMonth,
        'saurabh-this-month': saurabhThisMonth,
        'manish-last-month': manishLastMonth,
        'manish-this-month': manishThisMonth,
    };

    Object.entries(fieldsToSave).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Load last month's used units from local storage
    if (localStorage.getItem('princeThisMonth')) {
        document.getElementById('prince-this-month').value = localStorage.getItem('princeThisMonth');
    }
    if (localStorage.getItem('saurabhThisMonth')) {
        document.getElementById('saurabh-this-month').value = localStorage.getItem('saurabhThisMonth');
    }
    if (localStorage.getItem('manishThisMonth')) {
        document.getElementById('manish-this-month').value = localStorage.getItem('manishThisMonth');
    }
});

function calculateBill() {
    const totalUnits = parseFloat(document.getElementById('total-units').value);
    const princeLastMonth = parseFloat(document.getElementById('prince-last-month').value);
    const princeThisMonth = parseFloat(document.getElementById('prince-this-month').value);
    const saurabhLastMonth = parseFloat(document.getElementById('saurabh-last-month').value);
    const saurabhThisMonth = parseFloat(document.getElementById('saurabh-this-month').value);
    const manishLastMonth = parseFloat(document.getElementById('manish-last-month').value);
    const manishThisMonth = parseFloat(document.getElementById('manish-this-month').value);

    const rsPerUnit = 7;

    const princeUnitsUsed = princeThisMonth - princeLastMonth;
    const saurabhUnitsUsed = saurabhThisMonth - saurabhLastMonth;
    const manishUnitsUsed = manishThisMonth - manishLastMonth;

    const princeBill = princeUnitsUsed * rsPerUnit;
    const saurabhBill = saurabhUnitsUsed * rsPerUnit;
    const manishBill = manishUnitsUsed * rsPerUnit;

    const commonUnits = totalUnits - (princeUnitsUsed + saurabhUnitsUsed + manishUnitsUsed);
    const commonBill = commonUnits * rsPerUnit;
    const commonShare = commonBill / 3;

    const princeTotal = princeBill + commonShare;
    const saurabhTotal = saurabhBill + commonShare;
    const manishTotal = manishBill + commonShare;

    document.getElementById('results').innerHTML = `
        <h2>Detailed Calculation:</h2>
        <p>Total Units: ${totalUnits.toFixed(2)} units</p>
        <p>Common Units: ${commonUnits.toFixed(2)} units</p>
        <p>Common Bill: ${commonBill.toFixed(2)} Rs</p>
        <p>Common Share per Person: ${commonShare.toFixed(2)} Rs</p>
        <h3>Bills:</h3>
        <p>Prince: ${princeBill.toFixed(2)} Rs (Units Used: ${princeUnitsUsed} units) + Common Share: ${commonShare.toFixed(2)} Rs = <strong>${princeTotal.toFixed(2)} Rs</strong></p>
        <p>Saurabh: ${saurabhBill.toFixed(2)} Rs (Units Used: ${saurabhUnitsUsed} units) + Common Share: ${commonShare.toFixed(2)} Rs = <strong>${saurabhTotal.toFixed(2)} Rs</strong></p>
        <p>Manish: ${manishBill.toFixed(2)} Rs (Units Used: ${manishUnitsUsed} units) + Common Share: ${commonShare.toFixed(2)} Rs = <strong>${manishTotal.toFixed(2)} Rs</strong></p>
    `;
}

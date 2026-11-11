export async function downloadInvoice(b) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const id = String(b._id).slice(-8).toUpperCase();
  const line = (label, value, y) => {
    doc.setFont("helvetica", "bold"); doc.text(label, 20, y);
    doc.setFont("helvetica", "normal"); doc.text(String(value), 80, y);
  };
  doc.setFillColor(47, 82, 245); doc.rect(0, 0, 210, 34, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
  doc.text("StudioSpace", 20, 22);
  doc.setFontSize(11); doc.text("Booking Receipt", 160, 22);
  doc.setTextColor(18, 23, 43); doc.setFontSize(12);
  line("Invoice no.", `SS-${id}`, 52);
  line("Status", b.status, 62);
  line("Booked by", `${b.userName || "Guest"} (${b.userEmail})`, 72);
  line("Studio", b.studioTitle, 88);
  line("Location", b.location, 98);
  line("Date", b.date, 108);
  line("Time", `${b.startTime} - ${b.endTime} (${b.hours} hr)`, 118);
  line("Hourly rate", `$${b.hourlyRate}`, 134);
  line("Studio fee", `$${b.totalPrice}`, 144);
  line("Security deposit", `$${b.securityDeposit} (refundable)`, 154);
  doc.setDrawColor(200); doc.line(20, 164, 190, 164);
  doc.setFontSize(15); line("Total due", `$${(Number(b.totalPrice) + Number(b.securityDeposit || 0)).toFixed(2)}`, 176);
  doc.setFontSize(10); doc.setTextColor(110);
  doc.text("Thank you for booking with StudioSpace. This receipt is generated automatically.", 20, 200);
  doc.save(`StudioSpace-Invoice-${id}.pdf`);
}

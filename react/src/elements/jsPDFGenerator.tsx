import jsPDF from 'jspdf';
import { ApiResponse, App } from '../Types';

import format from 'date-fns/format';
import autoTable from 'jspdf-autotable';
import { addDays } from 'date-fns';
import { start } from 'repl';
import 'jspdf-autotable';

const separator = Array.from(Array(72))
.map(() => '_')
.join('')

const jsPdfGenerator = (week: App.ReportEntry[], user: App.User) => {
  const [monday, friday] = [week[0], week[4]]
  
  let doc = new jsPDF('p', 'pt')
  doc.setFont('courier')
  doc.setFontSize(11)
  doc.text(`Name: ${user.firstName} ${user.lastName}`, 200, 70)
  doc.text(separator, 70, 105)

  const mondayString = monday.reportDate.toDateString()
  const fridayString = friday.reportDate.toDateString()
  const header = `Tätigkeitnachweis:        vom: ${mondayString}     bis: ${fridayString}`
  doc.text(header, 70, 130)

  doc.text(separator, 70, 135)
  doc.text('Tag', 70, 155);
  doc.text('Ausgeführte Arbeiten', 145, 155);
  doc.text('Gesamtstd', 480, 155);

  week.forEach((day, i) => {
    doc.text(separator, 70, 160 + (i * 100))
    doc.text(day.reportDate.toLocaleDateString('de-DE', {weekday: 'long'}), 70, 180 + (i * 100));
    doc.text(day.content, 145, 180 + (i * 100));
    doc.text(day.workingHours.toString(), 480, 180 + (i * 100));
  })
  doc.text(separator, 70, 775)
  doc.text('Auszubildender', 70, 800);
  doc.text('Ausbilder', 250, 800);
  doc.text('Gesetzlicher Vertreter', 420, 800);
  doc.save(`Ausbildungsdoku ${monday.reportDate.toDateString()}`);
}

export default jsPdfGenerator;

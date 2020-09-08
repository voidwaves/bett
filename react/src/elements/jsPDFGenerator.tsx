import jsPDF from 'jspdf';
import { ApiResponse, App } from '../Types';

import format from 'date-fns/format';
import autoTable from 'jspdf-autotable';
import { addDays } from 'date-fns';
import { start } from 'repl';
import 'jspdf-autotable';

const jsPdfGenerator = (week: App.ReportEntry[], user: App.User) => {
  const [monday, tuesday, wednesday, thursday, friday] = week

  let doc = new jsPDF('p', 'pt');
  doc.setFont('courier');
  doc.setFontSize(11);

  doc.text(
    `Name: ${user.firstName} ${user.lastName}`,
    200,
    70
  );
  
  doc.text(
    '________________________________________________________________________',
    70,
    105
  );

  doc.text(
    'Tätigkeitnachweis:        vom: ' +
      monday.reportDate.toDateString() +
      '     bis: ' +
      friday.reportDate.toDateString(),
    70,
    130
  );
  doc.text(
    '________________________________________________________________________',
    70,
    135
  );
  doc.text('Tag', 70, 155);
  doc.text('Ausgeführte Arbeiten', 145, 155);
  doc.text('Gesamtstd', 480, 155);

  // week.forEach((day, i) => {
  //   doc.text(
  //     '________________________________________________________________________',
  //     70,
  //     160 + (i * 115)
  //   )

  //   doc.text(day.reportDate.toLocaleDateString('de-DE', {weekday: 'long'}), 70, 180 + (i * 100));
  //   doc.text(day.content, 145, 180 + (i * 100));
  //   doc.text(monday.workingHours.toString(), 480, 180 + (i * 100));
  // })

  doc.text(
    '________________________________________________________________________',
    70,
    160
  );

  doc.text('Montag', 70, 180);
  doc.text(monday.content, 145, 180);
  doc.text('' + monday.workingHours, 480, 180);

  doc.text(
    '________________________________________________________________________',
    70,
    265
  );
  doc.text('Dienstag', 70, 280);
  doc.text(tuesday.content, 145, 280);
  doc.text('' + tuesday.workingHours, 480, 280);

  doc.text(
    '________________________________________________________________________',
    70,
    380
  );
  doc.text('Mittwoch', 70, 395);
  doc.text(wednesday.content, 145, 395);
  doc.text('' + wednesday.workingHours, 480, 395);

  doc.text(
    '________________________________________________________________________',
    70,
    495
  );
  doc.text('Donnerstag', 70, 510);
  doc.text(thursday.content, 145, 510);
  doc.text('' + thursday.workingHours, 480, 510);

  doc.text(
    '________________________________________________________________________',
    70,
    610
  );
  doc.text('Freitag', 70, 625);
  doc.text('' + friday.content, 145, 625);
  doc.text('' + friday.workingHours, 480, 625);

  doc.text(
    '________________________________________________________________________',
    70,
    775
  );
  doc.text('Auszubildender', 70, 800);
  doc.text('Ausbilder', 250, 800);
  doc.text('Gesetzlicher Vertreter', 420, 800);

  doc.save('Ausbildungsdoku' + monday.reportDate.toDateString());
};
export default jsPdfGenerator;

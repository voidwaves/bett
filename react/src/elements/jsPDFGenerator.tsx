import jsPDF from "jspdf";
import { ApiResponse, App } from "../Types";

import format from "date-fns/format";
import autoTable from "jspdf-autotable";
import { addDays } from "date-fns";
import { start } from "repl";
import "jspdf-autotable";

const jsPdfGenerator = (week: App.ReportEntry[]) => {
  console.log("week", week[2].workingHours);

  let doc = new jsPDF("p", "pt");
  doc.setFont("courier");
  doc.setFontSize(11);

  doc.text(
    "Name :" + week[1].user.firstName + " " + week[1].user.lastName,
    200,
    70
  );
  // doc.text("Ausbildungsabteilung :" + week[0].department, 200, 100);
  doc.text(
    "________________________________________________________________________",
    70,
    105
  );

  doc.text(
    "Tätigkeitnachweis:        vom:" +
      week[0].reportDate.toDateString() +
      "     bis:" +
      week[4].reportDate.toDateString(),
    70,
    130
  );
  doc.text(
    "________________________________________________________________________",
    70,
    135
  );
  doc.text("Tag", 70, 155);
  doc.text("Ausgeführte Arbeiten", 145, 155);
  // workingHours
  doc.text("Gesamtstd", 480, 155);

  doc.text(
    "________________________________________________________________________",
    70,
    160
  );

  doc.text("Montag", 70, 180);
  doc.text(week[0].content, 145, 180);
  doc.text("" + week[0].workingHours, 480, 180);

  doc.text(
    "________________________________________________________________________",
    70,
    265
  );
  doc.text("Dienstag", 70, 280);
  doc.text(week[1].content, 145, 280);
  doc.text("" + week[1].workingHours, 480, 280);

  doc.text(
    "________________________________________________________________________",
    70,
    380
  );
  doc.text("Mittwoch", 70, 395);
  doc.text(week[2].content, 145, 395);
  doc.text("" + week[2].workingHours, 480, 395);

  doc.text(
    "________________________________________________________________________",
    70,
    495
  );
  doc.text("Donnerstag", 70, 510);
  doc.text(week[3].content, 145, 510);
  doc.text("" + week[3].workingHours, 480, 510);

  doc.text(
    "________________________________________________________________________",
    70,
    610
  );
  doc.text("Freitag", 70, 625);
  doc.text("" + week[4].content, 145, 625);
  doc.text("" + week[4].workingHours, 480, 625);

  doc.text(
    "________________________________________________________________________",
    70,
    775
  );
  doc.text("Auszubildender", 70, 800);
  doc.text("Ausbilder", 250, 800);
  doc.text("Gesetzlicher Vertreter", 420, 800);

  doc.save("Ausbildungsdoku" + week[0].reportDate.toDateString());
};
export default jsPdfGenerator;

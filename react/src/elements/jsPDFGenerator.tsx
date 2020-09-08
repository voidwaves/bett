import jsPDF from "jspdf";
import { ApiResponse, App } from "../Types";

import format from "date-fns/format";
import autoTable from "jspdf-autotable";
import { addDays } from "date-fns";
const jsPdfGenerator = (week: App.ReportEntry[]) => {
  console.log("week", week);
  const doc = new jsPDF("p", "pt");
  doc.setFont("courier");
  doc.setFontSize(11);
  // doc.setFontType("bold");
  doc.text("Name :" + week[1].user.firstName + week[1].user.lastName, 200, 50);
  doc.text("Ausbildungsabteilung :" + week[0].department, 200, 80);
  doc.text("Tätigkeitnachweis :" + week[0].department, 80, 110);

  //   doc.autoTable({
  //     body: [
  //       ["Name:", "Mohammad Younus Jabari"],
  //       ["Ausbildungsabteilung:", week.team],
  //       [
  //         "Datum",
  //         `${week.dateUrl} bis ${format(addDays(week.date, 4), "dd-MM-yyyy")}`,
  //       ],
  //       ["Tätigkeitsnachweis:"],
  //     ],
  //   });
  //   doc.autoTable({
  //     body: [[""]],
  //     theme: "plain",
  //   });

  //   doc.autoTable({
  //     styles: { fontSize: 11 },
  //     head: [["Tag", "Ausgeführte Arbeiten, Unterricht usw. "]],
  //     body: [
  //       ["Montag", week.days[0].writeReport],
  //       ["Dienstag", week.days[1].writeReport],
  //       ["Mittwoch", week.days[2].writeReport],
  //       ["Donnerstag", week.days[3].writeReport],
  //       ["Freitag", week.days[4].writeReport],
  //     ],
  //     theme: "grid",
  //   });
  //   doc.autoTable({
  //     body: [[""]],
  //     theme: "plain",
  //   });

  //   doc.text(
  //     50,
  //     700,
  //     "__________________________________________________________________________"
  //   );
  //   doc.text(50, 770, "Auszubildender");
  //   doc.text(250, 770, "Ausbilder");
  //   doc.text(380, 770, "Gesetzlicher Vertreter");
  // doc.table(3, 5, week, "sdf");
  doc.save("test");
};
export default jsPdfGenerator;

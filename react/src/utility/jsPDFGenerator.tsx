import jsPDF from 'jspdf'
import { App } from '../Types'
import { weekNumber } from './utils'

// generiere einen Trennstrich, der die Länge 72 hat
const separator = Array.from(Array(72))
.map(() => '_')
.join('')

// konfiguriere das Plugin mit dem das PDF generiert wird
const jsPdfGenerator = (week: App.ReportEntry[], user: App.User) => {
  // erster und letzter Report Entry
  const [firstDay, lastDay] = [week[0], week[week.length - 1]]
  
  // generelle Konfigurationen
  const doc = new jsPDF('p', 'pt')
  doc.setFont('courier')
  doc.setFontSize(11)
  // header mit Vorname und Nachname
  doc.text(`Name: ${user.firstName} ${user.lastName}`, 200, 70)
  doc.text(separator, 70, 105)

  // Zeitraum
  const mondayString = firstDay.reportDate.toDateString()
  const fridayString = lastDay.reportDate.toDateString()
  const header = `Tätigkeitnachweis:        vom: ${mondayString}     bis: ${fridayString}`
  doc.text(header, 70, 130)

  // Spaltenüberschriften
  doc.text(separator, 70, 135)
  doc.text('Tag', 70, 155)
  doc.text('Ausgeführte Arbeiten', 145, 155)
  doc.text('Gesamtstd', 480, 155)

  // das Feld für jeden verfügbaren Tag der Woche
  week.forEach((day, i) => {
    doc.text(separator, 70, 160 + (i * 100))
    doc.text(day.reportDate.toLocaleDateString('de-DE', {weekday: 'long'}), 70, 180 + (i * 100))
    doc.text(day.content, 145, 180 + (i * 100))
    doc.text(day.workingHours.toString(), 480, 180 + (i * 100))
  })

  // Footer mit Feld für Unterschrift
  doc.text(separator, 70, 775)
  doc.text('Auszubildender', 70, 800)
  doc.text('Ausbilder', 250, 800)
  doc.text('Gesetzlicher Vertreter', 420, 800)
  doc.save(`Ausbildungsdoku-Woche-${weekNumber(firstDay.reportDate)}`)
}

export default jsPdfGenerator

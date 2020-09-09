import React, { FunctionComponent, Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { ApiResponse, App } from "../Types";
import { links } from "../Links";
import Button from "react-bootstrap/Button";
import jsPDFGenerator from "../elements/jsPDFGenerator";
import Form from "react-bootstrap/Form";
import {
  dateToString,
  dateRange,
  stringToDate,
  weekDateRange,
  isWeekDay,
} from "../utils";
import EntryListItem from "./EntryListItem";

const ReportEntries: FunctionComponent = () => {
  const [monday, friday] = weekDateRange(new Date());
  const [startDate, setStartDate] = useState(monday);
  const [endDate, setEndDate] = useState(friday);
  const [reportEntries, setReportEntries] = useState<
    ApiResponse.ReportEntry[] | null
  >(null);
  const [fullEntryList, setFullEntryList] = useState<App.ReportEntry[] | null>(
    null
  );
  const [user, setUser] = useState<App.User | null>(null);

  useEffect(() => {
    getUser();
    getReportEntries();
  }, []);

  const getUser = () => {
    axios
      .get<ApiResponse.User>(links.api.profile)
      .then((response) =>
        setUser({
          ...response.data,
          beginOfApprenticeship: stringToDate(
            response.data.beginOfApprenticeship
          ),
        })
      )
      .catch(() => alert("Could not get user data from api!"));
  };

  const getReportEntries = () => {
    axios
      .get<ApiResponse.ReportEntry[]>(links.api.reportEntries)
      .then((reportEntries) => setReportEntries(reportEntries.data))
      .catch(() => alert("Could not get report entries from api!"));
  };

  useEffect(() => {
    if (reportEntries !== null && user !== null) {
      const allDates = dateRange(startDate, endDate);
      setFullEntryList(
        allDates.map((date) => {
          const matchingEntry = reportEntries.find(
            (entry) => entry.reportDate === dateToString(date)
          );
          const emptyEntry: App.ReportEntry = {
            id: -1,
            exists: false,
            user: {
              ...user,
              beginOfApprenticeship: dateToString(user.beginOfApprenticeship),
            },
            reportDate: date,
            content: "",
            workingHours: 0,
            department: "",
          };
          return matchingEntry === undefined
            ? emptyEntry
            : {
                ...matchingEntry,
                exists: true,
                reportDate: stringToDate(matchingEntry.reportDate),
              };
        })
      );
    }
  }, [reportEntries, user, startDate, endDate]);

  const onDateChange = (date: Date) => {
    const [newStartDate, newEndDate] = weekDateRange(date);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // random key prop to force rerender

  return user === null || reportEntries === null ? null : (
    <Fragment>
      <div className="row" style={{marginTop: 30, marginBottom: 30}}>
        <div className="col-md-3 col-sm-6 ">
          <Form.Label>Select a week</Form.Label>
        </div>
        <div className="col-md-8 col-sm-6 ">
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            onWeekSelect={onDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={user.beginOfApprenticeship}
            maxDate={new Date()}
            filterDate={isWeekDay}
            shouldCloseOnSelect={false}
            highlightDates={reportEntries.map((entry) =>
              stringToDate(entry.reportDate)
            )}
            showWeekNumbers
            showMonthDropdown
            showYearDropdown
          />{" "}
        </div>
      </div>
      {fullEntryList === null
        ? null
        : fullEntryList.map((reportEntry) => (
            <EntryListItem
              key={Math.random()}
              reportEntry={reportEntry}
              reload={getReportEntries}
            />
          ))}
      {fullEntryList === null ? null : (
        <Button onClick={() => jsPDFGenerator(fullEntryList, user)}>Download</Button>
      )}{" "}
    </Fragment>
  );
};

export default ReportEntries;

import React from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Profile = () => {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <div className="w-[25%] flex flex-col gap-10 border rounded-3xl overflow-hidden">
      <div className="bg-[#ffffff] flex flex-col justify-start p-4  min-h-screen gap-2">
        <p className=" text-start m-4">statistic</p>
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src="https://picsum.photos/200"
            alt="Profile picture"
          />
          <h3 className="text-center font-semibold mt-3 text-base">
            Good morning John Doe!
          </h3>
          <p className="text-center text-gray-600 mt-1 text-sm">
            Software Engineer
          </p>
        </div>
        <div className="bg-[#3CB371] rounded-lg paddingXShorter3 paddingYShorter3  border-[#000000] border-b-4 font-black translate-y-2 border-r-4">
          <div className="flex flex-col text-[#ffffff] gap-4">
            <p>Total Profit</p>
            <div className="flex justify-between">
              <a>Jan - April 2022</a>
              <a>$ 15 , 892</a>
            </div>
            {/* level bar */}
            <div className="h-1 w-full bg-[#ffffff] dark:bg-[#000000]">
              <div className="h-1 bg-[#ffffff]" style={{ width: "75%" }}></div>
            </div>
            <div className="flex justify-between">
              <a className="text-[#ffffff] rounded-lg bg-[#0A54C0] px-2 py-1">
                172 , 5 %
              </a>
              <div className="flex gap-4 items-center">
                <a>BTC</a>
                <a>USDT</a>
                <a>BNB</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar", "DateCalendar"]}>
              <DemoItem>
                <DateCalendar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>{" "}
      </div>
    </div>
  );
};

export default Profile;

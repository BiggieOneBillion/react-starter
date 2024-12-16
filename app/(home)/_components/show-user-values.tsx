import React from "react";

type UserValues = {
  app_name: string;
  styling: string;
  ui_library: string;
  icon_library: string;
  state_management: string;
  server_state: string;
  data_fetching: string;
  data_validation: string;
  form_management: string;
  toast_library: string;
};

type Props = {
  userValues: UserValues;
};

const data: { label: string; objKey: keyof UserValues }[] = [
  { label: "App Name", objKey: "app_name" },
  { label: "Styling", objKey: "styling" },
  { label: "UI Library", objKey: "ui_library" },
  { label: "Icon Library", objKey: "icon_library" },
  { label: "State Management", objKey: "state_management" },
  { label: "Server State Management tool", objKey: "server_state" },
  { label: "Data Fetching Library", objKey: "data_fetching" },
  { label: "Data Validation Tool", objKey: "data_validation" },
  { label: "Form Management Solution", objKey: "form_management" },
  { label: "Toast Notification Library", objKey: "toast_library" },
];

const ShowUserValues = ({ userValues }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-fit h-fit sticky top-0">
      {data.map((datum, index) => (
        <div key={index} className="space-y-2">
          <p className="font-normal text-sm text-zinc-800 font-sans underline">{datum.label}</p>
          {userValues[datum.objKey] ? (
            <p className="font-medium bg-zinc-800 text-white px-1 py-[2px] font-mono">
              {userValues[datum.objKey]}
            </p>
          ) : <p className="h-4"></p>}
        </div>
      ))}
    </div>
  );
};

export default ShowUserValues;
